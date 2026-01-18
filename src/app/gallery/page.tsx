'use client';

import { useState } from 'react';
import Image from 'next/image';

const images = [
  'mdp-BULLDOG-1034.jpg',
  'mdp-BULLDOG-1084.jpg',
  'mdp-BULLDOG-1287.jpg',
  'mdp-BULLDOG-383.jpg',
  'mdp-BULLDOG-461.jpg',
  'mdp-BULLDOG2017-1.jpg',
  'mdp-BULLDOG2017-10.jpg',
  'mdp-BULLDOG2017-11.jpg',
  'mdp-BULLDOG2017-12.jpg',
  'mdp-BULLDOG2017-13-2.jpg',
  'mdp-BULLDOG2017-13.jpg',
  'mdp-BULLDOG2017-15.jpg',
  'mdp-BULLDOG2017-16.jpg',
  'mdp-BULLDOG2017-17.jpg',
  'mdp-BULLDOG2017-18.jpg',
  'mdp-BULLDOG2017-19.jpg',
  'mdp-BULLDOG2017-2.jpg',
  'mdp-BULLDOG2017-20.jpg',
  'mdp-BULLDOG2017-21.jpg',
  'mdp-BULLDOG2017-22.jpg',
  'mdp-BULLDOG2017-23-2.jpg',
  'mdp-BULLDOG2017-23.jpg',
  'mdp-BULLDOG2017-24.jpg',
  'mdp-BULLDOG2017-25.jpg',
  'mdp-BULLDOG2017-26.jpg',
  'mdp-BULLDOG2017-27.jpg',
  'mdp-BULLDOG2017-28.jpg',
  'mdp-BULLDOG2017-29.jpg',
  'mdp-BULLDOG2017-3.jpg',
  'mdp-BULLDOG2017-30.jpg',
  'mdp-BULLDOG2017-31.jpg',
  'mdp-BULLDOG2017-32.jpg',
  'mdp-BULLDOG2017-33.jpg',
  'mdp-BULLDOG2017-34.jpg',
  'mdp-BULLDOG2017-35.jpg',
  'mdp-BULLDOG2017-36.jpg',
  'mdp-BULLDOG2017-37.jpg',
  'mdp-BULLDOG2017-38.jpg',
  'mdp-BULLDOG2017-39.jpg',
  'mdp-BULLDOG2017-4.jpg',
  'mdp-BULLDOG2017-40.jpg',
  'mdp-BULLDOG2017-41.jpg',
  'mdp-BULLDOG2017-42.jpg',
  'mdp-BULLDOG2017-43.jpg',
  'mdp-BULLDOG2017-44.jpg',
  'mdp-BULLDOG2017-45.jpg',
  'mdp-BULLDOG2017-46.jpg',
  'mdp-BULLDOG2017-47.jpg',
  'mdp-BULLDOG2017-48.jpg',
  'mdp-BULLDOG2017-49.jpg',
  'mdp-BULLDOG2017-5.jpg',
  'mdp-BULLDOG2017-50.jpg',
  'mdp-BULLDOG2017-51.jpg',
  'mdp-BULLDOG2017-52.jpg',
  'mdp-BULLDOG2017-53.jpg',
  'mdp-BULLDOG2017-54.jpg',
  'mdp-BULLDOG2017-55.jpg',
  'mdp-BULLDOG2017-56.jpg',
  'mdp-BULLDOG2017-57.jpg',
  'mdp-BULLDOG2017-58.jpg',
  'mdp-BULLDOG2017-59.jpg',
  'mdp-BULLDOG2017-6.jpg',
  'mdp-BULLDOG2017-7.jpg',
  'mdp-BULLDOG2017-8.jpg',
  'mdp-BULLDOG2017-9.jpg',
];

export default function GalleryPage() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#00356b] to-[#286dc0] text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Photo Gallery</h1>
          <p className="text-xl text-gray-200">Memories from Bulldog Lacrosse Camps</p>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {images.map((image, index) => (
              <div
                key={image}
                className="relative aspect-square cursor-pointer overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow"
                onClick={() => setSelectedImage(image)}
              >
                <Image
                  src={`/images/gallery/${image}`}
                  alt={`Camp photo ${index + 1}`}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />
              </div>
            ))}
          </div>

          {/* Photographer Credit */}
          <div className="mt-8 text-center text-gray-600">
            <p>
              Photos by{' '}
              <a
                href="https://www.magsdepetrisphotography.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#00356b] hover:underline"
              >
                Mags DePetris Photography
              </a>
            </p>
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-4 right-4 text-white text-4xl hover:text-gray-300 transition"
            onClick={() => setSelectedImage(null)}
          >
            &times;
          </button>
          <div className="relative w-full h-full max-w-5xl max-h-[90vh]">
            <Image
              src={`/images/gallery/${selectedImage}`}
              alt="Selected camp photo"
              fill
              className="object-contain"
              sizes="100vw"
              priority
            />
          </div>
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-sm">
            Click anywhere to close
          </div>
        </div>
      )}
    </div>
  );
}
