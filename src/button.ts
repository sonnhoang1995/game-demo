import { textFunction } from "./text";

const myText = document.getElementById("my-text");

export function buttonFunction() {
    myText!.innerHTML = textFunction();
}
