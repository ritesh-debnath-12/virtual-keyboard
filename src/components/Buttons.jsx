function KButton(props) {
  return (
    <button id={props.id} tabIndex="-1" className={props.className} onClick={props.onClick}>
      {props.text}
    </button>
  );
}

export default KButton;