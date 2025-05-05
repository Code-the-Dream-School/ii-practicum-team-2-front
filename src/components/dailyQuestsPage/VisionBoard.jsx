import React, { useState, useCallback, useEffect } from "react";

const Card = ({ children, className }) => (
  <div className={`border rounded-lg overflow-hidden shadow-lg ${className}`}>
    {children}
  </div>
);

const VisionBoard = ({ maxImages = 12, allowRemove = true }) => {
  const defaultImages = [
    "https://images.unsplash.com/photo-1509233725247-49e657c54213?q=80&w=1049&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",

    "https://images.unsplash.com/photo-1619794578892-cbdd3ff81c95?q=80&w=1035&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",

    "https://plus.unsplash.com/premium_photo-1679938885972-180ed418f466?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",

    "https://images.unsplash.com/photo-1540420773420-3366772f4999?q=80&w=1284&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",

    "https://images.unsplash.com/photo-1591160690555-5debfba289f0?q=80&w=1064&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",

    "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=1220&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",

    "https://images.unsplash.com/photo-1615531880032-4abafe570346?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",

    "https://plus.unsplash.com/premium_photo-1661962495669-d72424626bdc?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  ];

  const [images, setImages] = useState([]);

  useEffect(() => {
    // add default images if no images are present
    if (images.length === 0) {
      setImages(
        defaultImages.map((url, index) => ({
          id: `default-${index}`,
          url,
        }))
      );
    }
  }, [images]);

  const handleImageUpload = useCallback(
    (event) => {
      const files = event.target.files;
      if (!files || images.length >= maxImages) return;

      Array.from(files).forEach((file) => {
        if (file.type.startsWith("image/")) {
          const imageUrl = URL.createObjectURL(file);
          setImages((prev) => [
            ...prev,
            { id: Math.random().toString(), url: imageUrl },
          ]);
        }
      });
    },
    [maxImages, images.length]
  );

  const removeImage = useCallback((id) => {
    setImages((prev) => prev.filter((img) => img.id !== id));
  }, []);

  React.useEffect(() => {
    return () => {
      images.forEach((image) => URL.revokeObjectURL(image.url));
    };
  }, [images]);

  return (
    <div className="w-auto max-w-7xl mx-auto p-6 rounded-lg shadow-md">
      <h3 className="text-2xl font-bold text-gray-800 mb-4">
        Resolution Board
      </h3>
      <p className="text-gray-600 mb-4">
        Add images that inspire your goals—whether it's a place you want to
        visit, a skill you want to learn, or a lifestyle you’re working toward.
      </p>
      <input
        type="file"
        accept="image/*"
        multiple
        onChange={handleImageUpload}
        className="mb-8 w-auto px-4 py-2 border rounded-md border-gray-300 bg-gray-50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <div
        className="grid gap-4"
        style={{
          gridTemplateColumns: "repeat(4, 143px)", // 4 columns with 143px width
          gridTemplateRows: "repeat(2, 102px)", // 2 rows with 102px height
        }}
      >
        {images.map(({ id, url }) => (
          <Card
            key={id}
            className="relative overflow-hidden group cursor-pointer transition-transform duration-200 hover:scale-105"
            style={{
              width: "143px", // Fixed width for each cell
              height: "102px", // Fixed height for each cell
            }}
          >
            <img
              src={url}
              alt="Vision board item"
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            />
            {allowRemove && (
              <button
                onClick={() => removeImage(id)}
                className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity bg-black/60 p-1.5 rounded-full flex items-center justify-center"
              >
                {/* <span className="text-white text-base font-extrabold leading-none">×</span> */}
                {/* <XMarkIcon className="h-4 w-4 text-white font-bold" />  */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth={3} // Thicker stroke
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4"
                >
                  <path d="M6 6l12 12M6 18L18 6" />
                </svg>
              </button>
            )}
          </Card>
        ))}
      </div>

      {images.length === 0 && (
        <p className="text-center text-gray-800 mt-8">
          Upload your vision board images here!
        </p>
      )}

      {images.length >= maxImages && (
        <p className="text-center text-red-500 mt-4">
          Maximum number of images reached ({maxImages})
        </p>
      )}
    </div>
  );
};

export default VisionBoard;
