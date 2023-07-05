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
      <section class="message-section justify-end">
        {{ matchMessage }}

        <button class="ignore-suggestion-button" @click="ignoreSuggestion">
          <CloseIcon class="h-6 w-6 stroke-1 stroke-wd-error"></CloseIcon>
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
  <div class="flex justify-center py-4">
    <div class="column gap-10">
      <FormKit type="button" label="Speichern" @click="onClickedSave"></FormKit>
      <div class="flex justify-center">
        <button type="button" class="p-4">
          <SwipeRightIcon
            class="animate-pulse h-10 w-10 dark:stroke-wd-white stroke-black stroke-1"
          ></SwipeRightIcon>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, defineProps } from "vue";
import CloseIcon from "@/assets/icons/CloseIcon.vue";
import MenuBar from "@/components/MenuModals/MenuBar.vue";
import SwipeRightIcon from "@/assets/icons/SwipeRight.vue";

import { useEditor, EditorContent, Editor, Content } from "@tiptap/vue-3";
import StarterKit from "@tiptap/starter-kit";
import { EditorView } from "prosemirror-view";
import {
  LanguageTool,
  LanguageToolHelpingWords,
  BubbleMenu,
} from "@/components/extensions";
import { content } from "./text";
import { Match } from "@/types";
import {
  currentSubject,
  currentSalutationBeginning,
  currentTextBegining,
  currentTextExperience,
  currentTextCompetence,
  currentTextContribution,
  currentEnding,
  currentSalutationEnding,
  sideBackBack,
} from "@/store/store.js";

// Prosemirror-view hack to prevent editor TypeError: Cannot read property 'matchesNode'
EditorView.prototype.updateState = function updateState(state) {
  if (!this.docView) return; // This prevents the matchesNode error on hot reloads
  this.updateStateInner(state, this.state.plugins != state.plugins);
};
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
  textEditIndex: {
    type: Number,
    default: 0,
  },
  indexOfMVid: {
    type: Number,
    default: 0,
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
      apiUrl: process.env.VUE_APP_LANGUAGE_TOOL_URL,
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
const replacements = computed(() => {
  let rps = match.value?.replacements || [];
  while (rps.length > 4) {
    rps.pop();
  }
  return rps;
});

const matchMessage = computed(() => match.value?.message || "No Message");

const updateHtml = () => navigator.clipboard.writeText(editor.value.getHTML());

const acceptSuggestion = (sug: { value: Content }) => {
  editor.value.commands.insertContentAt(matchRange.value, sug.value);
};

const proofread = () => editor.value.commands.proofread();

const ignoreSuggestion = () => {
  editor.value.commands.resetLanguageToolMatch();
};

const onClickedSave = () => {
  let comment_text = "";
  const len = editor.value.getJSON().content.length;
  for (let i = 0; i < len; i++) {
    if (editor.value.getJSON().content[i].content) {
      comment_text += editor.value.getJSON().content[i].content[0].text + "\n";
    } else {
      comment_text += "\n";
    }
  }
  switch (props.textEditIndex) {
    case 0:
      currentSubject.value = comment_text;
      break;
    case 1:
      currentSalutationBeginning.value = comment_text;
      break;
    case 2:
      currentTextBegining.value = comment_text;
      break;
    case 3:
      currentTextExperience.value = comment_text;
      break;
    case 4:
      currentTextCompetence.value = comment_text;
      break;
    case 5:
      currentTextContribution.value = comment_text;
      break;
    case 6:
      currentEnding.value = comment_text;
      break;
    case 7:
      currentSalutationEnding.value = comment_text;
      break;
    default:
      currentSalutationBeginning.value = comment_text;
      break;
  }
  sideBackBack.value = false;
};
onMounted(() => {
  sideBackBack.value = true;
  let editText = "";
  let mvIndexToDisplay = 0;
  const motivations = ref(
    JSON.parse(localStorage.getItem("motivations")) || []
  );
  const lastIndex = motivations.value.length;
  if (props.itemCurrentIndex >= 0) {
    if (props.itemCurrentIndex == 0) {
      switch (props.textEditIndex) {
        case 0:
          editText = currentSubject.value;
          break;
        case 1:
          editText = currentSalutationBeginning.value;
          break;
        case 2:
          editText = currentTextBegining.value;
          break;
        case 3:
          editText = currentTextExperience.value;
          break;
        case 4:
          editText = currentTextCompetence.value;
          break;
        case 5:
          editText = currentTextContribution.value;
          break;
        case 6:
          editText = currentEnding.value;
          break;
        case 7:
          editText = currentSalutationEnding.value;
          break;
        default:
          editText = currentSalutationBeginning.value;
          break;
      }
    } else {
      mvIndexToDisplay = lastIndex - props.itemCurrentIndex;
      if (mvIndexToDisplay >= 0) {
        switch (props.textEditIndex) {
          case 0:
            editText = motivations.value[mvIndexToDisplay][0].subject;
            break;
          case 1:
            editText =
              motivations.value[mvIndexToDisplay][0].salutationBeginning;
            break;
          case 2:
            editText = motivations.value[mvIndexToDisplay][0].textBegining;
            break;
          case 3:
            editText = motivations.value[mvIndexToDisplay][0].textExperience;
            break;
          case 4:
            editText = motivations.value[mvIndexToDisplay][0].textCompetence;
            break;
          case 5:
            editText = motivations.value[mvIndexToDisplay][0].textContribution;
            break;
          case 6:
            editText = motivations.value[mvIndexToDisplay][0].ending;
            break;
          case 7:
            editText = motivations.value[mvIndexToDisplay][0].salutationEnding;
            break;
          default:
            editText = motivations.value[mvIndexToDisplay][0].subject;
            break;
        }
      } else {
        console.log("Error Caclulated index negative!");
      }
    }
  } else {
    console.log("Error! Slide index is negative!");
  }
  if (editText != "") {
    editor.value.commands.setContent({
      type: "text",
      text: editText,
    });
  } else {
    editor.value.commands.setContent({
      type: "text",
      text: "Neuer Text",
    });
    console.log("Empty text is not allowed!");
  }
});
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
