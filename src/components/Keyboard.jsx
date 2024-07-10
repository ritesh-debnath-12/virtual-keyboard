import { useState, useEffect, useRef } from "react";
import axios from "axios"; //This library is the reason, why backend engineers get no sleep
import KButton from "./Buttons";
import TextArea from "./TextArea";

function Keyboard() {
  const [text, setText] = useState("");
  const [isShiftHolded, setIsShiftHolded] = useState(false);
  const [isCapsLockOn, setIsCapsLockOn] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);

  // Create a reference to the keyboard div to focus on it when the page loads
  const keyboardRef = useRef(null);

  // Focus on the keyboard div when the page loads
  useEffect(() => {
    keyboardRef.current.focus();
  }, []);

  const changeText = (event) => {
    const badKeys = [
      "Control",
      "Alt",
      "Shift",
      "Enter",
      "Escape",
      "ArrowLeft",
      "ArrowRight",
      "ArrowUp",
      "ArrowDown",
      "ContextMenu",
      "Meta",
      "CapsLock",
    ];
    if (badKeys.includes(event.key)) {
      return; // Do nothing if Ctrl, Alt, Shift or Enter key is pressed
    } else if (event.key === "Tab") {
      setText(text + "    "); // Add 4 spaces if Tab key is pressed
    } else if (event.key === "Backspace") {
      setText(text.slice(0, -1)); // Remove the last character if Backspace key is pressed
    } else {
      setText(text + event.key);
    }
    return;
  };

  // Add an event listener to the keyboard div to detect key is pressed down
  const detectKeyDown = async (event) => {
    // console.log("Key Pressed"); DEBUG STATEMENT REMOVED....
    // Handle Shift key press
    if (event.key === "Shift") {
      setIsShiftHolded(true);
    }
    if (event.key === "Enter") {
      console.log(text);
      await sendTextDataToServer(text);
    }
    let btn = document.getElementById(event.code);
    if (btn) {
      if (event.key === "CapsLock") {
        if (btn.classList.contains("active")) {
          btn.classList.remove("active");
        } else {
          btn.classList.add("active");
        }
      } else {
        btn.classList.add("active");
      }
    }
    changeText(event);
  };

  const handleThemeChange = () => {
    // console.log("Theme Changed"); DEBUG STATEMENT REMOVED
    setIsDarkMode(!isDarkMode);
  };

  // Add an event listener to the keyboard div to detect key is released
  const detectKeyUp = (event) => {
    // Handle Shift key release
    if (event.key === "Shift") {
      setIsShiftHolded(false);
    }
    if (event.key === "CapsLock") {
      setIsCapsLockOn(!isCapsLockOn);
    }

    let btn = document.getElementById(event.code);
    if (btn && event.code !== "CapsLock") {
      btn.classList.remove("active");
    }
  };

  const sendTextDataToServer = async (text) => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:3000/save-text",
        new URLSearchParams({ text }),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      ); //wtf lmao

      const fileNames = [
        "epikFile.txt",
        "urWill.txt",
        "wilson.txt",
        "kai-leng.txt",
        "jenkins.txt",
        "117.txt",
        "AllHailTheEmperor.txt",
        "Cadia.txt",
        "CoreyTaylor.txt",
        "DoomGuy.txt",
        "Nokotan.txt",
      ];
      const generateFileName =
        fileNames[Math.floor(Math.random() * fileNames.length)];
      // This part handles the file download, by creating a blob and a link element, and then simulating a click on the link element
      // to download the file
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `${generateFileName}`); //I will go insane, why does this onkly work with a template string!?!?!???
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.log("Critical Error occured: ", error);
    }
  };
  return (
    <div
      div
      id="main"
      tabIndex="-1"
      className={isDarkMode ? "dark-theme" : "light-theme"}
      onKeyDown={detectKeyDown}
      onKeyUp={detectKeyUp}
      ref={keyboardRef}
    >
      <div>
        <TextArea
          id="text-area"
          className="text-area"
          placeholder="What you type, will appear here!"
          value={text}
        ></TextArea>
      </div>
      <div id="keyboard" tabIndex="-1">
        <div id="number-row" tabIndex="-1">
          <KButton
            id="Backquote"
            className="general-btn"
            text={isShiftHolded ? "~" : "`"}
          ></KButton>
          <KButton
            id="Digit1"
            className="general-btn"
            text={isShiftHolded ? "!" : "1"}
          ></KButton>
          <KButton
            id="Digit2"
            className="general-btn"
            text={isShiftHolded ? "@" : "2"}
          ></KButton>
          <KButton
            id="Digit3"
            className="general-btn"
            text={isShiftHolded ? "#" : "3"}
          ></KButton>
          <KButton
            id="Digit4"
            className="general-btn"
            text={isShiftHolded ? "$" : "4"}
          ></KButton>
          <KButton
            id="Digit5"
            className="general-btn"
            text={isShiftHolded ? "%" : "5"}
          ></KButton>
          <KButton
            id="Digit6"
            className="general-btn"
            text={isShiftHolded ? "^" : "6"}
          ></KButton>
          <KButton
            id="Digit7"
            className="general-btn"
            text={isShiftHolded ? "&" : "7"}
          ></KButton>
          <KButton
            id="Digit8"
            className="general-btn"
            text={isShiftHolded ? "*" : "8"}
          ></KButton>
          <KButton
            id="Digit9"
            className="general-btn"
            text={isShiftHolded ? "(" : "9"}
          ></KButton>
          <KButton
            id="Digit0"
            className="general-btn"
            text={isShiftHolded ? ")" : "0"}
          ></KButton>
          <KButton
            id="Minus"
            className="general-btn"
            text={isShiftHolded ? "_" : "-"}
          ></KButton>
          <KButton
            id="Equal"
            className="general-btn"
            text={isShiftHolded ? "+" : "="}
          ></KButton>
          <KButton
            id="Backspace"
            className="general-btn backspace-btn"
            text="<-"
          ></KButton>
        </div>
        <div id="top-row">
          <KButton
            id="Tab"
            className="general-btn tab-btn"
            text="Tab"
          ></KButton>
          <KButton
            id="KeyQ"
            className="general-btn"
            text={isShiftHolded ? "Q" : "q"}
          ></KButton>
          <KButton
            id="KeyW"
            className="general-btn"
            text={isShiftHolded ? "W" : "w"}
          ></KButton>
          <KButton
            id="KeyE"
            className="general-btn"
            text={isShiftHolded ? "E" : "e"}
          ></KButton>
          <KButton
            id="KeyR"
            className="general-btn"
            text={isShiftHolded ? "R" : "r"}
          ></KButton>
          <KButton
            id="KeyT"
            className="general-btn"
            text={isShiftHolded ? "T" : "t"}
          ></KButton>
          <KButton
            id="KeyY"
            className="general-btn"
            text={isShiftHolded ? "Y" : "y"}
          ></KButton>
          <KButton
            id="KeyU"
            className="general-btn"
            text={isShiftHolded ? "U" : "u"}
          ></KButton>
          <KButton
            id="KeyI"
            className="general-btn"
            text={isShiftHolded ? "I" : "i"}
          ></KButton>
          <KButton
            id="KeyO"
            className="general-btn"
            text={isShiftHolded ? "O" : "o"}
          ></KButton>
          <KButton
            id="KeyP"
            className="general-btn"
            text={isShiftHolded ? "P" : "p"}
          ></KButton>
          <KButton
            id="BracketLeft"
            className="general-btn"
            text={isShiftHolded ? "{" : "["}
          ></KButton>
          <KButton id="BracketRight" className="general-btn" text="]"></KButton>
        </div>
        <div id="middle-row">
          <KButton
            id="CapsLock"
            className="general-btn caps-btn"
            text="Caps Lock"
          ></KButton>
          <KButton
            id="KeyA"
            className="general-btn"
            text={isShiftHolded ? "A" : "a"}
          ></KButton>
          <KButton
            id="KeyS"
            className="general-btn"
            text={isShiftHolded ? "S" : "s"}
          ></KButton>
          <KButton
            id="KeyD"
            className="general-btn"
            text={isShiftHolded ? "D" : "d"}
          ></KButton>
          <KButton
            id="KeyF"
            className="general-btn"
            text={isShiftHolded ? "F" : "f"}
          ></KButton>
          <KButton
            id="KeyG"
            className="general-btn"
            text={isShiftHolded ? "G" : "g"}
          ></KButton>
          <KButton
            id="KeyH"
            className="general-btn"
            text={isShiftHolded ? "H" : "h"}
          ></KButton>
          <KButton
            id="KeyJ"
            className="general-btn"
            text={isShiftHolded ? "J" : "j"}
          ></KButton>
          <KButton
            id="KeyK"
            className="general-btn"
            text={isShiftHolded ? "K" : "k"}
          ></KButton>
          <KButton
            id="KeyL"
            className="general-btn"
            text={isShiftHolded ? "L" : "l"}
          ></KButton>
          <KButton
            id="Semicolon"
            className="general-btn"
            text={isShiftHolded ? ":" : ";"}
          ></KButton>
          <KButton
            id="Quote"
            className="general-btn"
            text={isShiftHolded ? `"` : "'"}
          ></KButton>
          <KButton
            id="Backslash"
            className="general-btn"
            text={isShiftHolded ? "|" : "\\"}
          ></KButton>
          <KButton
            id="Enter"
            className="general-btn enter-btn"
            text="Enter">
            </KButton>
        </div>
        <div id="bottom-row">
          <KButton
            id="ShiftLeft"
            className="general-btn shift-btn"
            text="Shift"
          ></KButton>
          <KButton
            id="KeyZ"
            className="general-btn"
            text={isShiftHolded ? "Z" : "z"}
          ></KButton>
          <KButton
            id="KeyX"
            className="general-btn"
            text={isShiftHolded ? "X" : "x"}
          ></KButton>
          <KButton
            id="KeyC"
            className="general-btn"
            text={isShiftHolded ? "C" : "c"}
          ></KButton>
          <KButton
            id="KeyV"
            className="general-btn"
            text={isShiftHolded ? "V" : "v"}
          ></KButton>
          <KButton
            id="KeyB"
            className="general-btn"
            text={isShiftHolded ? "B" : "b"}
          ></KButton>
          <KButton
            id="KeyN"
            className="general-btn"
            text={isShiftHolded ? "N" : "n"}
          ></KButton>
          <KButton
            id="KeyM"
            className="general-btn"
            text={isShiftHolded ? "M" : "m"}
          ></KButton>
          <KButton
            id="Comma"
            className="general-btn"
            text={isShiftHolded ? "<" : ","}
          ></KButton>
          <KButton
            id="Period"
            className="general-btn"
            text={isShiftHolded ? ">" : "."}
          ></KButton>
          <KButton
            id="Slash"
            className="general-btn"
            text={isShiftHolded ? "?" : "/"}
          ></KButton>
          <KButton
            id="ShiftRight"
            className="general-btn shift-btn"
            text="Shift"
          ></KButton>
        </div>
        <div id="space-row">
          <KButton
            id="ThemeControl"
            className="general-btn theme-control-btn"
            text={isDarkMode ? "🌙" : "☀️"}
            onClick={handleThemeChange}
          ></KButton>
          <KButton
            id="ControlLeft"
            className="general-btn"
            text="Ctrl"
          ></KButton>
          <KButton id="MetaLeft" className="general-btn" text=":)"></KButton>
          <KButton id="AltLeft" className="general-btn" text="Alt"></KButton>
          <KButton
            id="Space"
            className="general-btn space-btn"
            text="Garrus Co."
          ></KButton>
          <KButton id="AltRight" className="general-btn" text="Alt"></KButton>
          <KButton id="MetaRight" className="general-btn" text=":("></KButton>
          <KButton
            id="ContextMenu"
            className="general-btn"
            text="Menu"
          ></KButton>
          <KButton
            id="ControlRight"
            className="general-btn"
            text="Ctrl"
          ></KButton>
        </div>
      </div>
    </div>
  );
}

export default Keyboard;
