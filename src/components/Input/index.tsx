import { FC } from 'react'

interface IInputProps {
    value: string,
    placeholder: string,
    onUserInput: (input: string) => void
}

const Input: FC<IInputProps> = ({ value, placeholder, onUserInput }) => {
  return (
    <>
      <input
        type="text"
        name={value}
        placeholder={placeholder}
        className='w-full bg-neutral-900 text-neutral-300 placeholder-neutral-600 rounded indent-1 p-3 focus:outline-none focus:outline-neutral-700'
        value={value}
        onChange={(e) => onUserInput(e.target.value)}
      />
    </>
  )
}

export default Input