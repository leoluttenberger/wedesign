// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { BubbleMenuPlugin } from "./bubble-menu-plugin";
import { defineComponent, h, onBeforeUnmount, onMounted, ref } from "vue";
export const BubbleMenu = defineComponent({
  name: "BubbleMenu",
  props: {
    pluginKey: {
      // TODO: TypeScript breaks :(
      // type: [String, Object as PropType<Exclude<BubbleMenuPluginProps['pluginKey'], string>>],
      type: null,
      default: "bubbleMenu",
    },
    editor: {
      type: Object,
      required: true,
    },
    tippyOptions: {
      type: Object,
      default: () => ({}),
    },
    shouldShow: {
      type: Function,
      default: null,
    },
  },
  setup(props, { slots }) {
    const root = ref(null);
    onMounted(() => {
      const { pluginKey, editor, tippyOptions, shouldShow } = props;
      editor.registerPlugin(
        BubbleMenuPlugin({
          pluginKey,
          editor,
          element: root.value,
          tippyOptions,
          shouldShow,
        })
      );
    });
    onBeforeUnmount(() => {
      const { pluginKey, editor } = props;
      editor.unregisterPlugin(pluginKey);
    });
    return () => h("div", { ref: root }, slots.default?.());
  },
});
//# sourceMappingURL=BubbleMenu.js.map
