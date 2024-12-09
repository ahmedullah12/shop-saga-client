import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";

type ProductImagesCarouselProps = {
  images: string[];
};

const ProductDetailsImages = ({ images }: ProductImagesCarouselProps) => {
  const [selectedImage, setSelectedImage] = React.useState(0);

  const handleImageClick = (index: number) => {
    setSelectedImage(index);
  };

  return (
    <div className="mx-auto">
      {/* Display the selected image in a larger size */}
      <Card>
        <CardContent className="p-0">
          <img
            src={images[selectedImage]}
            alt={`Product Image ${selectedImage + 1}`}
            className="w-full h-[350px] object-cover rounded-lg shadow-md"
          />
        </CardContent>
      </Card>

      {/* Display the rest of the images in smaller sizes */}
      <div className="flex justify-center gap-6 mt-4">
        {images.map((image, index) => (
          <Card
            key={index}
            onClick={() => handleImageClick(index)}
            className={`${
              selectedImage === index ? "opacity-50" : ""
            } cursor-pointer`}
          >
            <CardContent className="p-0 w-20 md:w-40 h-[100px]">
              <img
                src={image}
                alt={`Room Image ${index + 1}`}
                className="w-full h-full object-cover rounded-lg shadow-md"
              />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ProductDetailsImages;