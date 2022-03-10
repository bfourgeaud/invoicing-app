import { FieldError, UseFormRegister } from "react-hook-form"

type Rule = any | { value:any, message:string }

interface InputProps {
  register: CallableFunction,
  name: string,
  label?: string,
  rules?: { [key: string]: Rule },
  errors?: FieldError,
  [x: string]: any
}

interface SelectProps extends InputProps {
  options: Array<string>
}

interface ErrorProps {
  message: string | undefined
}

export function Input({ register, name, label, rules, errors, ...rest }:InputProps) {
  return (
    <>
      {label && <label className="label" htmlFor={name}>{label}</label>}
      <input className="input" {...register(name, rules)} {...rest} aria-invalid={!!errors} />
      {errors && <ErrorMessage message={errors.message} />}
    </>
  )
}

export function InputNumber({ register, name, label, rules, errors, ...rest }:InputProps) {
  return (
    <>
      {label && <label className="label" htmlFor={name}>{label}</label>}
      <input className="input" autoComplete='off' type="number" {...register(name, {...rules, valueAsNumber: true})} {...rest} aria-invalid={!!errors} />
      {errors && <ErrorMessage message={errors.message} />}
    </>
  )
}

export function Select({ register, name, label, rules, errors, options, ...rest }:SelectProps) {
  return (
    <>
      {label && <label className="label" htmlFor={name}>{label}</label>}
      <select {...register(name, rules)} {...rest}>
        {options.map(value => (
          <option key={value} value={value}>
            {value}
          </option>
        ))}
      </select>
      {errors && <ErrorMessage message={errors.message} />}
    </>
  )
}

function ErrorMessage({ message }:ErrorProps) {
  return(<span className="inputError" role="alert">{message}</span>)
}
