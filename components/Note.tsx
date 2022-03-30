/*
man kan använda idt för att generera ett unikt svg filter
så varje papper kommer se unikt ut.
*/

interface NoteProps {
  id: string
  author: string
  content: string
}

export default function Note({ id, author, content }: NoteProps) {
  return (
    <div>
      <div className="mt-6 relative z-10 w-full h-full flex">
        <div className="absolute inset-1 z-1 shadow-xl bg-transparent"></div>
        <div
          style={{ filter: `url(#oldPaper${id})` }}
          className="bg-[#F3E9DB] absolute inset-0 z-2"
        ></div>
        <div className="relative z-3 justify-center items-center flex">
          <div className="w-11/12 h-11/12 my-1">
            <p>{content}</p>
            <p>{author}</p>
          </div>
        </div>
      </div>
      <svg className="hidden">
        <filter id={`oldPaper${id}`}>
          <feTurbulence
            x="0"
            y="0"
            baseFrequency="0.02"
            numOctaves="5"
            seed={uuidToNum(id) % 1000}
          ></feTurbulence>
          <feDisplacementMap in="SourceGraphic" scale="10" />
        </filter>
      </svg>
    </div>
  )
}

function uuidToNum(uuid: string): number {
  return parseInt(uuid.replaceAll('-', ''), 16)
}
