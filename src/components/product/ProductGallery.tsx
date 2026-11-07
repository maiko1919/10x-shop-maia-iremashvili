import { useState } from "react";

interface ProductGalleryProps {
  images: string[];
  title: string;
}

function ProductGallery({ images, title }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div>
      <div className="aspect-square overflow-hidden rounded-2xl border border-gray-200 bg-white">
        <img
          src={images[activeIndex]}
          alt={title}
          className="h-full w-full object-contain p-6"
        />
      </div>

      {images.length > 1 && (
        <div className="mt-4 flex gap-3 overflow-x-auto">
          {images.map((image, index) => (
            <button
              key={image}
              type="button"
              onClick={() => setActiveIndex(index)}
              className={`h-20 w-20 shrink-0 overflow-hidden rounded-xl border-2 bg-white transition ${
                index === activeIndex
                  ? "border-emerald-600"
                  : "border-gray-200 hover:border-gray-400"
              }`}
            >
              <img
                src={image}
                alt={`${title} ${index + 1}`}
                loading="lazy"
                className="h-full w-full object-contain p-1"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProductGallery;