import { Container, clx } from "@medusajs/ui"
import Image from "next/image"
import React, { useState } from "react"

import PlaceholderImage from "@modules/common/icons/placeholder-image"

type ThumbnailProps = {
  thumbnail?: string | null
  images?: { url: string }[] | null
  size?: "small" | "medium" | "large" | "full" | "square"
  isFeatured?: boolean
  className?: string
  "data-testid"?: string
}

const Thumbnail: React.FC<ThumbnailProps> = ({
  thumbnail,
  images,
  size = "small",
  isFeatured,
  className,
  "data-testid": dataTestid,
}) => {
  // ✅ Determine which image to display
  const mainImage =
    thumbnail ||
    images?.find((img) => !!img?.url)?.url ||
    "/placeholder.png"

  return (
    <Container
      className={clx(
        "relative w-full overflow-hidden bg-ui-bg-subtle shadow-elevation-card-rest rounded-large group-hover:shadow-elevation-card-hover transition-shadow ease-in-out duration-150",
        className,
        {
          "aspect-[11/14]": isFeatured,
          "aspect-[9/16]": !isFeatured && size !== "square",
          "aspect-[1/1]": size === "square",
          "w-[180px]": size === "small",
          "w-[290px]": size === "medium",
          "w-[440px]": size === "large",
          "w-full": size === "full",
        }
      )}
      data-testid={dataTestid}
    >
      <ImageOrPlaceholder image={mainImage} size={size} />
    </Container>
  )
}

const ImageOrPlaceholder = ({
  image,
  size,
}: Pick<ThumbnailProps, "size"> & { image?: string }) => {
  const [error, setError] = useState(false)

  if (!image || error) {
    return (
      <div className="w-full h-full absolute inset-0 flex items-center justify-center">
        <PlaceholderImage size={size === "small" ? 16 : 24} />
      </div>
    )
  }

  return (
    <Image
      src={image}
      alt="Product thumbnail"
      className="absolute inset-0 object-cover object-center rounded-md"
      draggable={false}
      fill
      priority={true}
      onError={() => setError(true)}
      quality={75}
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
    />
  )
}

export default Thumbnail
