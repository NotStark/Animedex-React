import {
  LazyLoadImage,
  LazyLoadImageProps,
} from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

type ImageProps = Omit<LazyLoadImageProps, "src"> & {
  src: string;
  className?: string;
};

export default function Image({ src, className, ...props }: ImageProps) {
  // TODO add placeholder image
  return (
    <LazyLoadImage
      {...props}
      className={className || ""}
      alt=""
      effect="blur"
      src={src}
      onError={(e) => {
        console.error("Image error", e);
        // e.currentTarget.src = "";  // TODO later
        e.currentTarget.onerror = null; // prevent looping
      }}
    />
  );
}
