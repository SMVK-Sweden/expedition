import clsx from 'clsx'
import React, { InputHTMLAttributes } from 'react'

type InputProps = InputHTMLAttributes<HTMLInputElement>

const Input: React.FC<InputProps> = ({ className, ...props }) => (
  <input
    {...props}
    className={clsx(
      'focus:outline-none focus:ring focus:border-indigo-500',
      'block w-full border py-2 px-4 border-gray-300 rounded-md',
      className
    )}
  />
)

export default Input
