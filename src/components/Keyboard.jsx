import {useEffect, useRef} from "react";
import KButton from "./Buttons";
import TextArea from "./TextArea";

function Keyboard(){

  // Create a reference to the keyboard div to focus on it when the page loads
  const keyboardRef = useRef(null);

  // Focus on the keyboard div when the page loads
  useEffect(() => {
    keyboardRef.current.focus();
  }, []);

  // Add an event listener to the keyboard div to detect key is pressed down
  const detectKeyDown = (event) => {
    console.log("Key Pressed")
    let btn = document.getElementById(event.key);
    if(btn){
      btn.classList.add("active");
    }
  }

  // Add an event listener to the keyboard div to detect key is released
  const detectKeyUp = (event) => {
    let btn = document.getElementById(event.key);
    if(btn){
      btn.classList.remove("active");
    }
  }
return(
  <div id="main">
    <div>
      <TextArea id="text-area" className="text-area" placeholder="What you type, will appear here!" value="Test value"></TextArea>
    </div>
    <div id="keyboard" tabIndex="0" onKeyDown={detectKeyDown} onKeyUp={detectKeyUp} ref={keyboardRef}>
        <div id="top-row">
          <KButton id="q" className="general-btn" text="q"></KButton>
          <KButton id="w" className="general-btn" text="w"></KButton>
          <KButton id="e" className="general-btn" text="e"></KButton>
          <KButton id="r" className="general-btn" text="r"></KButton>
          <KButton id="t" className="general-btn" text="t"></KButton>
          <KButton id="y" className="general-btn" text="y"></KButton>
          <KButton id="u" className="general-btn" text="u"></KButton>
          <KButton id="i" className="general-btn" text="i"></KButton>
          <KButton id="o" className="general-btn" text="o"></KButton>
          <KButton id="p" className="general-btn" text="p"></KButton>
        </div>
        <div id="middle-row">
          <KButton id="a" className="general-btn" text="a"></KButton>
          <KButton id="s" className="general-btn" text="s"></KButton>
          <KButton id="d" className="general-btn" text="d"></KButton>
          <KButton id="f" className="general-btn" text="f"></KButton>
          <KButton id="g" className="general-btn" text="g"></KButton>
          <KButton id="h" className="general-btn" text="h"></KButton>
          <KButton id="j" className="general-btn" text="j"></KButton>
          <KButton id="k" className="general-btn" text="k"></KButton>
          <KButton id="l" className="general-btn" text="l"></KButton>
        </div>
        <div id="bottom-row">
          <KButton id="z" className="general-btn" text="z"></KButton>
          <KButton id="x" className="general-btn" text="x"></KButton>
          <KButton id="c" className="general-btn" text="c"></KButton>
          <KButton id="v" className="general-btn" text="v"></KButton>
          <KButton id="b" className="general-btn" text="b"></KButton>
          <KButton id="n" className="general-btn" text="n"></KButton>
          <KButton id="m" className="general-btn" text="m"></KButton>
        </div>
    </div>
  </div>
    );
}

export default Keyboard;