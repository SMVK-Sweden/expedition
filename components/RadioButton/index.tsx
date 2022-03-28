import { useState } from 'react'

interface RadioButtonProps {
  options: string[]
  value: string
  onChange: (e: any) => void
}

export default function RadioButton({
  options,
  value,
  onChange,
}: RadioButtonProps) {
  const [marked, setMarked] = useState(value)

  const choices = options.map((name) => {
    return (
      <div key={name} className="form-check form-check-inline">
        <input
          className="form-check-input form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
          type="radio"
          name="inlineRadioOptions"
          id={name}
          value={name}
          checked={marked == name}
          onChange={(e) => {
            setMarked(name)
            onChange(e)
          }}
        />
        <label
          className="form-check-label inline-block text-gray-800"
          htmlFor={name}
        >
          {name}
        </label>
      </div>
    )
  })

  return <div className="flex justify-center">{choices}</div>
}
