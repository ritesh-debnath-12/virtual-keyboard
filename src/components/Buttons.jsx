function KButton(props) {
  return (
    <button id={props.id} tabIndex="-1" className={props.className}>
      {props.text}
    </button>
  );
}

export default KButton;