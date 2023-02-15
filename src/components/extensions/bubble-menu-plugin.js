import { isNodeSelection, isTextSelection, posToDOMRect } from "@tiptap/core";
import { Plugin, PluginKey } from "prosemirror-state";
import tippy from "tippy.js";
export class BubbleMenuView {
  editor;
  element;
  view;
  preventHide = false;
  tippy;
  tippyOptions;
  shouldShow = ({ view, state, from, to }) => {
    const { doc, selection } = state;
    const { empty } = selection;
    // Sometime check for `empty` is not enough.
    // Doubleclick an empty paragraph returns a node size of 2.
    // So we check also for an empty text size.
    const isEmptyTextBlock =
      !doc.textBetween(from, to).length && isTextSelection(state.selection);
    if (!view.hasFocus() || empty || isEmptyTextBlock) {
      return false;
    }
    return true;
  };
  constructor({ editor, element, view, tippyOptions = {}, shouldShow }) {
    this.editor = editor;
    this.element = element;
    this.view = view;
    if (shouldShow) {
      this.shouldShow = shouldShow;
    }
    this.element.addEventListener("mousedown", this.mousedownHandler, {
      capture: true,
    });
    this.view.dom.addEventListener("dragstart", this.dragstartHandler);
    this.editor.on("focus", this.focusHandler);
    this.editor.on("blur", this.blurHandler);
    this.tippyOptions = tippyOptions;
    // Detaches menu content from its current parent
    this.element.remove();
    this.element.style.visibility = "visible";
  }
  mousedownHandler = () => {
    this.preventHide = true;
  };
  dragstartHandler = () => {
    this.hide();
  };
  focusHandler = () => {
    // we use `setTimeout` to make sure `selection` is already updated
    setTimeout(() => this.update(this.editor.view));
  };
  blurHandler = ({ event }) => {
    if (this.preventHide) {
      this.preventHide = false;
      return;
    }
    if (
      event?.relatedTarget &&
      this.element.parentNode?.contains(event.relatedTarget)
    ) {
      return;
    }
    this.hide();
  };
  updateHandler = (view, oldState) => {
    const { state, composing } = view;
    const { selection } = state;
    console.log("updated");
    if (composing) return;
    this.createTooltip();
    // support for CellSelections
    const { ranges } = selection;
    const from = Math.min(...ranges.map((range) => range.$from.pos));
    const to = Math.max(...ranges.map((range) => range.$to.pos));
    const shouldShow = this.shouldShow?.({
      editor: this.editor,
      view,
      state,
      oldState,
      from,
      to,
    });
    if (!shouldShow) {
      this.hide();
      return;
    }
    this.tippy?.setProps({
      getReferenceClientRect:
        this.tippyOptions?.getReferenceClientRect ||
        (() => {
          if (isNodeSelection(state.selection)) {
            const node = view.nodeDOM(from);
            if (node) {
              return node.getBoundingClientRect();
            }
          }
          return posToDOMRect(view, from, to);
        }),
    });
    this.show();
  };
  createTooltip() {
    const { element: editorElement } = this.editor.options;
    const editorIsAttached = !!editorElement.parentElement;
    if (this.tippy || !editorIsAttached) {
      return;
    }
    this.tippy = tippy(editorElement, {
      duration: 0,
      getReferenceClientRect: null,
      content: this.element,
      interactive: true,
      trigger: "manual",
      placement: "top",
      hideOnClick: "toggle",
      ...this.tippyOptions,
    });
    // maybe we have to hide tippy on its own blur event as well
    if (this.tippy.popper.firstChild) {
      this.tippy.popper.firstChild.addEventListener("blur", (event) => {
        this.blurHandler({ event });
      });
    }
  }
  update(view, oldState) {
    setTimeout(() => {
      this.updateHandler(view, oldState);
    }, 100);
  }
  show() {
    this.tippy?.show();
  }
  hide() {
    this.tippy?.hide();
  }
  destroy() {
    this.tippy?.destroy();
    this.element.removeEventListener("mousedown", this.mousedownHandler, {
      capture: true,
    });
    this.view.dom.removeEventListener("dragstart", this.dragstartHandler);
    this.editor.off("focus", this.focusHandler);
    this.editor.off("blur", this.blurHandler);
  }
}
export const BubbleMenuPlugin = (options) => {
  return new Plugin({
    key:
      typeof options.pluginKey === "string"
        ? new PluginKey(options.pluginKey)
        : options.pluginKey,
    view: (view) => new BubbleMenuView({ view, ...options }),
  });
};
//# sourceMappingURL=bubble-menu-plugin.js.map
