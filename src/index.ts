import { buttonFunction } from "./button";
import "./styles/button.css";
import "./styles/text.scss";

const myButton = document.getElementById("my-button");

myButton!.addEventListener("click", () => {
    buttonFunction();
});
