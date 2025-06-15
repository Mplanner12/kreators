import React from "react";

type ImageRowProps = {
  src: string;
  altPrefix?: string;
};

const ImageDiv = ({ src, altPrefix = "Template" }: ImageRowProps) => (
  <div className="flex gap-6">
    {[1, 2, 3].map((n) => (
      <div
        key={n}
        className="w-60 h-60 rounded-xl bg-white shadow-md overflow-hidden"
      >
        <img
          src={src}
          alt={`${altPrefix} ${n}`}
          className="object-cover w-full h-full"
        />
      </div>
    ))}
  </div>
);

export default ImageDiv;
