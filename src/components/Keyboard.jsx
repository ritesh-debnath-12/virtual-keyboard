import {useState, useEffect, useRef} from "react";
import KButton from "./Buttons";
import TextArea from "./TextArea";

function Keyboard(){
  const [text, setText] = useState("");

  // Create a reference to the keyboard div to focus on it when the page loads
  const keyboardRef = useRef(null);

  // Focus on the keyboard div when the page loads
  useEffect(() => {
    keyboardRef.current.focus();
  }, []);

  const changeText = (event) => {
    const badKeys = ["Control", "Alt", "Shift", "Enter", "ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"];
    if(badKeys.includes(event.key)){
      return; // Do nothing if Ctrt, Alt, Shift or Enter key is pressed
    }
    else if(event.key === "Tab"){
      setText(text + "    "); // Add 4 spaces if Tab key is pressed
    }
    else if(event.key === "Backspace"){
      setText(text.slice(0, -1)); // Remove the last character if Backspace key is pressed
    }
    else{
      setText(text + event.key);
    }
    return;
  }

  // Add an event listener to the keyboard div to detect key is pressed down
  const detectKeyDown = (event) => {
    console.log("Key Pressed")
    let btn = document.getElementById(event.code);
    if(btn){
      btn.classList.add("active");
    }
    changeText(event);
  }

  // Add an event listener to the keyboard div to detect key is released
  const detectKeyUp = (event) => {
    let btn = document.getElementById(event.code);
    if(btn){
      btn.classList.remove("active");
    }
  }
return(
  <div id="main" tabIndex="-1" onKeyDown={detectKeyDown} onKeyUp={detectKeyUp} ref={keyboardRef}>
    <div>
      <TextArea id="text-area" className="text-area" placeholder="What you type, will appear here!" value={text} ></TextArea>
    </div>
    <div id="keyboard" tabIndex="-1">
        <div id="number-row" tabIndex="-1">
          <KButton id="Backquote" className="general-btn" text="`"></KButton>
          <KButton id="Digit1" className="general-btn" text="1"></KButton>
          <KButton id="Digit2" className="general-btn" text="2"></KButton>
          <KButton id="Digit3" className="general-btn" text="3"></KButton>
          <KButton id="Digit4" className="general-btn" text="4"></KButton>
          <KButton id="Digit5" className="general-btn" text="5"></KButton>
          <KButton id="Digit6" className="general-btn" text="6"></KButton>
          <KButton id="Digit7" className="general-btn" text="7"></KButton>
          <KButton id="Digit8" className="general-btn" text="8"></KButton>
          <KButton id="Digit9" className="general-btn" text="9"></KButton>
          <KButton id="Digit0" className="general-btn" text="0"></KButton>
          <KButton id="Minus" className="general-btn" text="-"></KButton>
          <KButton id="Equal" className="general-btn" text="="></KButton>
          <KButton id="Backspace" className="general-btn backspace-btn" text="Backspace"></KButton>
        </div>
        <div id="top-row">
          <KButton id="Tab" className="general-btn tab-btn" text="Tab"></KButton>
          <KButton id="KeyQ" className="general-btn" text="q"></KButton>
          <KButton id="KeyW" className="general-btn" text="w"></KButton>
          <KButton id="KeyE" className="general-btn" text="e"></KButton>
          <KButton id="KeyR" className="general-btn" text="r"></KButton>
          <KButton id="KeyT" className="general-btn" text="t"></KButton>
          <KButton id="KeyY" className="general-btn" text="y"></KButton>
          <KButton id="KeyU" className="general-btn" text="u"></KButton>
          <KButton id="KeyI" className="general-btn" text="i"></KButton>
          <KButton id="KeyO" className="general-btn" text="o"></KButton>
          <KButton id="KeyP" className="general-btn" text="p"></KButton>
          <KButton id="BracketLeft" className="general-btn" text="["></KButton>
          <KButton id="BracketRight" className="general-btn" text="]"></KButton>
        </div>
        <div id="middle-row">
          <KButton id="CapsLock" className="general-btn caps-btn" text="Caps Lock"></KButton>
          <KButton id="KeyA" className="general-btn" text="a"></KButton>
          <KButton id="KeyS" className="general-btn" text="s"></KButton>
          <KButton id="KeyD" className="general-btn" text="d"></KButton>
          <KButton id="KeyF" className="general-btn" text="f"></KButton>
          <KButton id="KeyG" className="general-btn" text="g"></KButton>
          <KButton id="KeyH" className="general-btn" text="h"></KButton>
          <KButton id="KeyJ" className="general-btn" text="j"></KButton>
          <KButton id="KeyK" className="general-btn" text="k"></KButton>
          <KButton id="KeyL" className="general-btn" text="l"></KButton>
          <KButton id="Semicolon" className="general-btn" text=";"></KButton>
          <KButton id="Quote" className="general-btn" text="'"></KButton>
          <KButton id="Backslash" className="general-btn" text="\"></KButton>
        </div>
        <div id="bottom-row">
          <KButton id="ShiftLeft" className="general-btn shift-btn" text="Shift"></KButton>
          <KButton id="KeyZ" className="general-btn" text="z"></KButton>
          <KButton id="KeyX" className="general-btn" text="x"></KButton>
          <KButton id="KeyC" className="general-btn" text="c"></KButton>
          <KButton id="KeyV" className="general-btn" text="v"></KButton>
          <KButton id="KeyB" className="general-btn" text="b"></KButton>
          <KButton id="KeyN" className="general-btn" text="n"></KButton>
          <KButton id="KeyM" className="general-btn" text="m"></KButton>
          <KButton id="Comma" className="general-btn" text=","></KButton>
          <KButton id="Period" className="general-btn" text="."></KButton>
          <KButton id="Slash" className="general-btn" text="/"></KButton>
          <KButton id="ShiftRight" className="general-btn shift-btn" text="Shift"></KButton>
        </div>
        <div id="space-row">
          <KButton id="Space" className="general-btn space-btn" text="Garrus Co."></KButton>
        </div>
    </div>
  </div>
    );
}

export default Keyboard;