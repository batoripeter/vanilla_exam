import './style.css'
import { chatLoader } from './getmessages.ts'
import { postMessage } from './postmessage.ts';


window.onload = function() {
  chatLoader()
}

document.getElementById("send-button")!.addEventListener("click",postMessage)