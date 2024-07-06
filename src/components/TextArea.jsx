function TextArea(props){
    return <input type="text" className={props.className} id={props.id} value={props.value}  placeholder={props.placeholder} onChange={props.onChange} readOnly/>
}

export default TextArea;