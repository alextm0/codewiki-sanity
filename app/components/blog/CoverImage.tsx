import React from 'react';
import Image from "next/image";

interface CoverImageProps {
  coverImage: any;
  title: string;
}

const CoverImage: React.FC<CoverImageProps> = ({ coverImage, title }) => (
  coverImage?.asset?.url && (
    <div className="relative overflow-hidden mb-4">
      <div className="max-w-7xl mx-auto">
        <Image
          src={coverImage.asset.url}
          alt={coverImage.alt || title}
          width={1920}
          height={1080}
          layout="responsive"
          objectFit="cover"
          className="rounded-md"
          priority
        />
      </div>
    </div>
  )
);

export default CoverImage;