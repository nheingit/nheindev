// If you want to use Phoenix channels, run `mix help phx.gen.channel`
// to get started and then uncomment the line below.
// import "./user_socket.js"

// You can include dependencies in two ways.
//
// The simplest option is to put them in assets/vendor and
// import them using relative paths:
//
//     import "../vendor/some-package.js"
//
// Alternatively, you can `npm install some-package --prefix assets` and import
// them using a path starting with the package name:
//
//     import "some-package"
//

// Include phoenix_html to handle method=PUT/DELETE in forms and buttons.
import "phoenix_html";
// Establish Phoenix Socket and LiveView configuration.
import { Socket } from "phoenix";
import { LiveSocket } from "phoenix_live_view";
import topbar from "../vendor/topbar";
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import Paragraph from "@editorjs/paragraph";
import InlineCode from "@editorjs/inline-code";
import RawTool from "@editorjs/raw";
import editorjsCodecup from "@calumk/editorjs-codecup";

// Import other tools as needed

// Editor JS config
let Hooks = {};
Hooks.Editor = {
  mounted() {
    let content = JSON.parse(this.el.dataset.content || "{}")
    this.initializeEditor(content);

    let saveButton = document.querySelector("#save-editor-content");
    saveButton.addEventListener("click", () => {
      this.editor
        .save()
        .then((outputData) => {
          const title = document.querySelector("#blog-title").value;
          const isPublished = document.querySelector("#is-published").checked;
          this.pushEvent("save_content", { title: title, value: outputData, is_published: isPublished });
        })
        .catch((error) => {
          console.log("Saving failed: ", error);
        });
    });
    document.querySelector("#blog-title").addEventListener("keyup", (e) => {
      this.pushEvent("update_title", { value: e.target.value });
    });
  },
  destroyed() {
    if (this.editor) {
      this.editor.destroy();
    }
  },
  initializeEditor: async function (content) {
    try {
      this.editor = new EditorJS({
        holder: "editorjs",
        data: content,
        tools: {
          code: editorjsCodecup,
          raw: RawTool,
          header: {
            class: Header,
            inlineToolbar: true,
          },
          inlineCode: {
            class: InlineCode,
            shortcut: "CMD+SHIFT+M",
          },
          paragraph: {
            class: Paragraph,
            inlineToolbar: true,
          },
        },
        onReady: () => {
          console.log("Editor.js is ready to work!");
        },
        onChange: (api, event) => {
          api.saver.save().then((outputData) => {
            this.pushEvent("update_content", { value: outputData });
          })
        }
      });
    } catch (error) {
      console.log("Error initializing Editor.js:", error);
    }
  },
};

// Initialize Prism
Hooks.Highlight = {
  mounted() {
    Prism.highlightAll()
  },
}

let csrfToken = document
  .querySelector("meta[name='csrf-token']")
  .getAttribute("content");
let liveSocket = new LiveSocket("/live", Socket, {
  hooks: Hooks,
  params: { _csrf_token: csrfToken },
});

// Show progress bar on live navigation and form submits
topbar.config({ barColors: { 0: "#29d" }, shadowColor: "rgba(0, 0, 0, .3)" });
window.addEventListener("phx:page-loading-start", (_info) => topbar.show(300));
window.addEventListener("phx:page-loading-stop", (_info) => topbar.hide());

// connect if there are any LiveViews on the page
liveSocket.connect();

// expose liveSocket on window for web console debug logs and latency simulation:
// >> liveSocket.enableDebug()
// >> liveSocket.enableLatencySim(1000)  // enabled for duration of browser session
// >> liveSocket.disableLatencySim()
window.liveSocket = liveSocket;
