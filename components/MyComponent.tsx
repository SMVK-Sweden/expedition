interface MyComponentProps {
  title: string
  someText: string
}

export default function MyComponent({ title, someText }: MyComponentProps) {
  return (
    <div className="border-2 rounded-lg">
      <h1>{title}</h1>
      <p>{someText}</p>
      <p>test</p>
    </div>
  )
}
