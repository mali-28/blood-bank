

const InputField = ({type, onChange, name,placeholder, error, ...props }) =>{
    return <>
    <div className="w-100per mb-2">
      <input type={type || "text"} onChange={onChange} name={name} className="input f-014 f-family-monospace" placeholder={placeholder} value={props.value} disabled={props.disabled || false}/>
      <span className="pl-1 pt-1 f-family-monospace red">{error || ""}</span>
      </div>
    </>
}

export default InputField;