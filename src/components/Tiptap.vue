<!-- eslint-disable vue/multi-word-component-names -->
<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<template>
  <div class="editor" v-if="editor">
    <menu-bar class="editor__header" :editor="editor" />
    <editor-content class="editor__content" v-if="editor" :editor="editor" />
  </div>
  <bubble-menu
    class="bubble-menu"
    v-if="editor"
    :editor="editor"
    :tippy-options="{ placement: 'bottom', animation: 'fade' }"
    :should-show="({ editor }) => shouldShow({ editor })"
  >
    <section class="bubble-menu-section-container">
      <section class="message-section">
        {{ matchMessage }}

        <button class="ignore-suggestion-button" @click="ignoreSuggestion">
          X
        </button>
      </section>
      <section class="suggestions-section">
        <article
          v-for="(replacement, i) in replacements"
          @click="() => acceptSuggestion(replacement)"
          :key="i + replacement.value"
          class="suggestion"
        >
          {{ replacement.value }}
        </article>
      </section>
    </section>
  </bubble-menu>
  <FormKit type="button" label="Save" @click="onClickedSave"></FormKit>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, defineProps } from "vue";
import { useEditor, EditorContent, Editor, Content } from "@tiptap/vue-3";
import StarterKit from "@tiptap/starter-kit";
import MenuBar from "./MenuBar.vue";
import {
  LanguageTool,
  LanguageToolHelpingWords,
  BubbleMenu,
} from "./extensions";
import { content } from "./text";
import { Match } from "@/types";
import { currentTextField, currentEnding } from "@/store.js";

const shouldShow = ({ editor }) => {
  const match = editor.storage.languagetool.match;
  const matchRange = editor.storage.languagetool.matchRange;

  const { from, to } = editor.state.selection;

  return (
    !!match && !!matchRange && matchRange.from <= from && to <= matchRange.to
  );
};

const props = defineProps({
  itemCurrentIndex: {
    type: Number,
    default: 0,
  },
  isTextFieldEditModal: {
    type: Boolean,
    default: false,
  },
  isEndingEditModal: {
    type: Boolean,
    default: false,
  },
});

const match = ref<Match>();

const matchRange = ref<{ from: number; to: number }>();

const loading = ref(false);

const updateMatch = (editor: Editor) => {
  match.value = editor.storage.languagetool.match;
  matchRange.value = editor.storage.languagetool.matchRange;
};

const editor = useEditor({
  content,
  extensions: [
    StarterKit,
    LanguageTool.configure({
      automaticMode: true,
      documentId: "1",
      apiUrl: process.env.VUE_APP_LANGUAGE_TOOL_URL + "check",
    }),
  ],
  onUpdate({ editor }) {
    setTimeout(() => updateMatch(editor as any));
  },
  onSelectionUpdate({ editor }) {
    setTimeout(() => updateMatch(editor as any));
  },
  onTransaction({ transaction: tr }) {
    if (tr.getMeta(LanguageToolHelpingWords.LoadingTransactionName))
      loading.value = true;
    else loading.value = false;
  },
});
const replacements = computed(() => match.value?.replacements || []);

const matchMessage = computed(() => match.value?.message || "No Message");

const updateHtml = () => navigator.clipboard.writeText(editor.value.getHTML());

const acceptSuggestion = (sug: { value: Content }) => {
  editor.value.commands.insertContentAt(matchRange.value, sug.value);
};

const proofread = () => editor.value.commands.proofread();

const ignoreSuggestion = () =>
  editor.value.commands.ignoreLanguageToolSuggestion();

const onClickedSave = () => {
  const comment_text = editor.value.getJSON().content[0].content[0].text
    ? editor.value.getJSON().content[0].content[0].text
    : "";
  console.log(comment_text);
  if (props.isEndingEditModal) {
    currentEnding.value = comment_text;
  }
  if (props.isTextFieldEditModal) {
    currentTextField.value = comment_text;
  }
};
onMounted(() => {
  const motivations = ref(JSON.parse(localStorage.getItem("motivations")));
  let lastIndex = getLastIndex();
  let indexCal = props.itemCurrentIndex;
  if (indexCal >= 0) {
    if (props.isTextFieldEditModal) {
      editor.value.commands.setContent({
        type: "text",
        text: motivations.value[indexCal][0].textfield,
      });
    }
    if (props.isEndingEditModal) {
      editor.value.commands.setContent({
        type: "text",
        text: motivations.value[indexCal][0].ending,
      });
    }
  } else {
    console.log("Error! Slide index is negative!");
  }
});

const getLastIndex = () => {
  const tempMotivations = JSON.parse(localStorage.getItem("motivations"));
  let lastIndex = tempMotivations.length - 1;
  console.log("lastIndex:", lastIndex);
  if (lastIndex < 0) {
    lastIndex = 0;
  }
  return lastIndex;
};
</script>

<style lang="scss">
.ProseMirror {
  .lt {
    border-bottom: 2px solid #e86a69;
    transition: background 0.25s ease-in-out;

    &:hover {
      background: rgba($color: #e86a69, $alpha: 0.2);
    }

    &-style {
      border-bottom: 2px solid #9d8eff;

      &:hover {
        background: rgba($color: #9d8eff, $alpha: 0.2) !important;
      }
    }

    &-typographical,
    &-grammar {
      border-bottom: 2px solid #eeb55c;

      &:hover {
        background: rgba($color: #eeb55c, $alpha: 0.2) !important;
      }
    }

    &-misspelling {
      border-bottom: 2px solid #e86a69;

      &:hover {
        background: rgba($color: #e86a69, $alpha: 0.2) !important;
      }
    }
  }

  &-focused {
    outline: none !important;
  }
}

.bubble-menu > .bubble-menu-section-container {
  display: flex;
  flex-direction: column;
  background-color: white;
  padding: 8px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba($color: black, $alpha: 0.25);
  max-width: 400px;

  .suggestions-section {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 4px;
    margin-top: 1em;

    .suggestion {
      background-color: #229afe;
      border-radius: 4px;
      color: white;
      cursor: pointer;
      font-weight: 500;
      padding: 4px;
      display: flex;
      align-items: center;
      font-size: 1.1em;
      max-width: fit-content;
    }
  }
}

.editor {
  display: flex;
  flex-direction: column;
  max-height: 26rem;
  color: #0d0d0d;
  background-color: #fff;
  border: 3px solid #0d0d0d;
  border-radius: 0.75rem;

  &__header {
    display: flex;
    align-items: center;
    flex: 0 0 auto;
    flex-wrap: wrap;
    padding: 0.25rem;
    border-bottom: 3px solid #0d0d0d;
  }

  &__content {
    padding: 1.25rem 1rem;
    flex: 1 1 auto;
    overflow-x: hidden;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
  }

  &__footer {
    display: flex;
    flex: 0 0 auto;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    white-space: nowrap;
    border-top: 3px solid #0d0d0d;
    font-size: 12px;
    font-weight: 600;
    color: #0d0d0d;
    white-space: nowrap;
    padding: 0.25rem 0.75rem;
  }

  /* Some information about the status */
  &__status {
    display: flex;
    align-items: center;
    border-radius: 5px;

    &::before {
      content: " ";
      flex: 0 0 auto;
      display: inline-block;
      width: 0.5rem;
      height: 0.5rem;
      background: rgba(#0d0d0d, 0.5);
      border-radius: 50%;
      margin-right: 0.5rem;
    }

    &--connecting::before {
      background: #616161;
    }

    &--connected::before {
      background: #b9f18d;
    }
  }

  &__name {
    button {
      background: none;
      border: none;
      font: inherit;
      font-size: 12px;
      font-weight: 600;
      color: #0d0d0d;
      border-radius: 0.4rem;
      padding: 0.25rem 0.5rem;

      &:hover {
        color: #fff;
        background-color: #0d0d0d;
      }
    }
  }
}
</style>
