import style from './StyledInput.module.css'
const StyledInput = ({ onChange, value, placeholder, type = "text", name }) => {

    return (
        <div>
        <input
            className={style.StyledInput}
            type={type}
            name={name}
            onChange={onChange}
            value={value}
            placeholder={placeholder}
        />
        </div>
    )
}

export default StyledInput

//