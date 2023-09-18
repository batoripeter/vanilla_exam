import "./style.css";
import { chatLoader } from "./getmessages.ts";
import { postMessage } from "./postmessage.ts";

window.onload = function () {
  load();
  chatLoader();
};

export const load = () => {
  let input = document.createElement("input") as HTMLInputElement;
  input.type = "text";
  input.id = "newMessage";
  document.getElementById("app")!.appendChild(input);

  let sendButton = document.createElement("button") as HTMLButtonElement;

  sendButton.textContent = "Send Message";
  sendButton.id = "send-button";
  document.getElementById("app")!.appendChild(sendButton);

  document
    .getElementById("send-button")!
    .addEventListener("click", postMessage);
};

function setRefresh() {
  document.getElementById("app")!.innerHTML = "";
  load();
  chatLoader();
}
setInterval(setRefresh, 20000);
