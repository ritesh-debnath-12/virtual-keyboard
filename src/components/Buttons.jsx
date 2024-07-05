function KButton(props) {
  return (
    <button id={props.id} className={props.className}>
      {props.text}
    </button>
  );
}

export default KButton;