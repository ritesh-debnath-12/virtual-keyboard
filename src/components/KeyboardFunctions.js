import { useState, useEffect, useRef } from "react";
import axios from "axios";

export const KeyboardFunctions = () => {
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
          if(error.code == "ERR_NETWORK"){
            alert(`${error.code}: ${error.message}\n Backend server is probably not running, please restart the server and try again.`)
            console.error("Backend server is not running, please restart the server and try again.")
          }
          else{
            alert(`${error.code}: ${error.message}\n Unhandled exception occured ;-;`)
            console.error("Unhandled exception occured ;-;")
          }
      }
    }
    return {
        text,
        isShiftHolded,
        isCapsLockOn,
        isDarkMode,
        keyboardRef,
        detectKeyDown,
        detectKeyUp,
        handleThemeChange,
        sendTextDataToServer
    }
}