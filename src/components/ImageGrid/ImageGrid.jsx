import React, { useState } from 'react';
import { FaCopy } from 'react-icons/fa';
import Galery from '../Galery/Galery';

function ImageGrid({ images, onCopy }) {
  const [copiedIndex, setCopiedIndex] = useState(null);

  const handleCopy = async (url, index) => {
    const success = await onCopy(url);

    if (success) {
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    }
  };

  if (images.length === 0) {
    return (
      <div className="flex items-center justify-center h-96">
        <p className="text-gray-400 text-xl">
          Nenhuma imagem carregada. Clique em buscar!
        </p>
      </div>
    );
  }

  return (
    <Galery>
      {images.map((url, index) => (
        <div
          key={`${url}-${index}`}
          className="break-inside-avoid rounded-2xl overflow-visible relative group cursor-pointer"
          onClick={() => handleCopy(url, index)}
        >
          <div className="relative transition-all duration-300 hover:scale-150 hover:rotate-1 hover:z-14 hover:shadow-2xl">
            <img
              src={url}
              alt={`Image ${index + 1}`}
              loading={index < 6 ? "eager" : "lazy"}
              decoding="async"
              className="w-full h-auto rounded-2xl object-cover shadow-lg"
            />

            <div className="absolute top-2 right-2 bg-black/60 text-white p-2 rounded-full md:opacity-0 md:group-hover:opacity-100 opacity-70 transition-opacity duration-200 pointer-events-none z-10">
              <FaCopy size={16} />
            </div>

            {copiedIndex === index && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/70 z-10">
                <div className="bg-green-500 text-white px-6 py-3 rounded-xl text-lg font-bold shadow-lg">
                  ✓ URL Copiada!
                </div>
              </div>
            )}
          </div>
        </div>
      ))}
    </Galery>
  );
}

export default ImageGrid;
