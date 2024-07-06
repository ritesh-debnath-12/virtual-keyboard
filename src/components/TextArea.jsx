function TextArea(props){
    return <input type="text" className={props.className} id={props.id} value={props.value}  placeholder={props.placeholder} readOnly/>
}

export default TextArea;