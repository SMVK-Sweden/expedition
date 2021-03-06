/*
man kan använda idt för att generera ett unikt svg filter
så varje papper kommer se unikt ut.
*/

export interface NoteProps {
  id: string
  author: string
  content: string
}

export default function Note({ id, author, content }: NoteProps) {
  return (
    <div>
      <div className="px-4 mt-6 relative z-10 w-full h-full flex">
        <div className="absolute inset-1 z-1 shadow-xl rounded bg-brown-300"></div>
        <div
          style={{ filter: `url(#oldPaper${id})` }}
          className="bg-[#F3E9DB] absolute inset-0 z-2"
        ></div>
        <div className="relative z-3 justify-center items-center flex mt-10">
          <div className="py-2 px-4">
            <p className="font-serif">{content}</p>
            <div className="h-10">
              <p className="absolute bottom-0 right-0 font-semibold">
                {author}
              </p>
            </div>
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
            seed={uuidToNum(id)}
          ></feTurbulence>
          <feDisplacementMap in="SourceGraphic" scale="15" />
        </filter>
      </svg>
    </div>
  )
}

function uuidToNum(uuid: string): number {
  return parseInt(uuid.replaceAll('-', ''), 16) % 1000 // this might be inefficient?
}
