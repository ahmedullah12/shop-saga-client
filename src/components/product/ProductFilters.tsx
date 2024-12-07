import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "../ui/button";
import { ICategory } from "@/types/global";

type FilterParams = {
  priceRange: string;
  setPriceRange: (value: string) => void;
  category: string;
  setCategory: (value: string) => void;
  handleClear: () => void;
  categories: any;
};

const ProductFilters = ({
  priceRange,
  setPriceRange,
  category,
  setCategory,
  handleClear,
  categories,
}: FilterParams) => {
  const handlePriceValueChange = (value: string) => {
    setPriceRange(value);
  };
  const handleCategoryChange = (value: string) => {
    setCategory(value);
  };

  const isFiltersActive = priceRange || category;

  return (
    <div className="bg-accent absolute top-[110%] right-[0%] z-30 py-4 px-6 md:px-10 space-y-3 shadow">
      <div>
        <Label>Select: Price</Label>
        <Select value={priceRange} onValueChange={handlePriceValueChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select price" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="50-100">$50-$100</SelectItem>
              <SelectItem value="100-200">$100-$200</SelectItem>
              <SelectItem value="200-400">$200-$400</SelectItem>
              <SelectItem value="400-">$400-</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label>Select: Category</Label>
        <Select value={category} onValueChange={handleCategoryChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {categories?.map((category: ICategory) => (
                <SelectItem key={category.id} value={category.id}>{category.name}</SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div>
        {isFiltersActive && (
          <Button onClick={handleClear} className="bg-primary">
            Clear
          </Button>
        )}
      </div>
    </div>
  );
};

export default ProductFilters;
