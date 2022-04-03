import Link from 'next/link'

export default function EditorIndex() {
  return (
    <div className="mt-10">
      <h3 className="text-center">Uppdatera sidans innehåll</h3>
      <Link href="/editor/days">Dagar</Link>
      <br />
      <Link href="/editor/diaryentries">Anteckningar</Link>
    </div>
  )
}
