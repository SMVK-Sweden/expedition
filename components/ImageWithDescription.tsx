import { KsamsokImage } from '@prisma/client'

interface ImageWithDescriptionProps {
  src: string
  description?: string
}

export default function ImageWithDescription({
  src,
  description,
}: ImageWithDescriptionProps) {
  return (
    <div className="w-full max-w-6xl mt-6 content-center">
      <img src={src} className="shadow-md" />
      {description ? <p>{description}</p> : null}
    </div>
  )
}
