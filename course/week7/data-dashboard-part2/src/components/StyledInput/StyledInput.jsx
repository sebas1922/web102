import style from './StyledInput.module.css'

const StyledInput = ({ name, onChange, value, placeholder, type = "text", maxLength }) => {
  return (
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={style.input}
      maxLength={maxLength}
    />
  )
}

export default StyledInput