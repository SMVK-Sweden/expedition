import React, { useState } from 'react'

interface ComponentToggleProps {
  component1: any
  title1: string
  component2: any
  title2: string
}

export default function ComponentToggle({
  component1,
  title1,
  component2,
  title2,
}: ComponentToggleProps) {
  const [component, setComponent] = useState(component1)
  const [title, setTitle] = useState(title1)
  return (
    <div>
      {component}
      <p>{title}</p>
    </div>
  )
}
