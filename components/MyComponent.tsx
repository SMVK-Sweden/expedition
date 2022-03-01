interface MyComponentProps {
  title: string
  someText: string
}

export default function MyComponent({ title, someText }: MyComponentProps) {
  return (
    <div className="border-2">
      <h1>{title}</h1>
      <p>{someText}</p>
    </div>
  )
}
