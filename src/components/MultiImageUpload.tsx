import { Input } from "@/components/ui/input";
import { AiOutlineClose } from "react-icons/ai";

interface MultiImageUploadProps {
  images: File[];
  handleImageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleRemoveImage: (fileName: string) => void;
}

const MultiImageUpload = ({
  images,
  handleImageChange,
  handleRemoveImage,
}: MultiImageUploadProps) => (
  <div className="mb-6">
    <label className="block text-sm font-semibold text-gray-700 mb-2">
      Images
    </label>
    <Input
      type="file"
      accept="image/*"
      multiple
      onChange={handleImageChange}
      className="border-2 border-secondary p-2 rounded-md max-w-[400px]"
    />
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-4">
      {images.map((image, index) => (
        <div key={index} className="relative">
          <img
            src={URL.createObjectURL(image)}
            alt={`preview-${index}`}
            className="w-full h-24 object-cover rounded-md shadow-md"
          />
          <AiOutlineClose
            className="absolute top-1 right-1 cursor-pointer bg-white p-1 rounded-full text-red-500"
            onClick={() => handleRemoveImage(image.name)}
          />
        </div>
      ))}
    </div>
  </div>
);

export default MultiImageUpload;
