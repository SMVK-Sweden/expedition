import React from 'react'
import clsx from 'clsx'

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>

const Button: React.FC<ButtonProps> = ({ children, className, ...rest }) => {
  const buttonClassName = clsx(
    'my-4 bg-teal-600 font-medium text-white rounded-md p-2 w-full',
    'focus:outline focus:outline-2 focus:outline-offset-2',
    'hover:bg-teal-800 focus:outline-teal-500',
    className
  )

  return (
    <button {...rest} className={buttonClassName}>
      {children}
    </button>
  )
}

export default Button
