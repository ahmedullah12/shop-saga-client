import { Controller, FieldValues, Path } from 'react-hook-form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

export interface SelectOption {
  value: string;
  label: string;
}

interface SSSelectProps<TFieldValues extends FieldValues> {
  name: Path<TFieldValues>;
  label: string;
  placeholder?: string;
  options: SelectOption[];
  className?: string;
  disabled?: boolean;
  rules?: object;
}

export function SSSelect<TFieldValues extends FieldValues>({
  name,
  label,
  placeholder = "Select an option",
  options,
  className,
  disabled = false,
  rules
}: SSSelectProps<TFieldValues>) {
  return (
    <div className={className}>
      <Label className="text-primary">{label}</Label>
      <Controller
        name={name}
        rules={rules || { required: `${label} is required` }}
        render={({ field, fieldState: { error } }) => (
          <div>
            <Select 
              value={field.value}
              onValueChange={(value) => {
                field.onChange(value);
              }}
              disabled={disabled}
            >
              <SelectTrigger className={error ? "border-red-500" : ""}>
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
              <SelectContent>
                {options.map((option) => (
                  <SelectItem 
                    key={option.value} 
                    value={option.value}
                  >
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {error && (
              <p className="text-red-500 mt-1 text-sm">
                {error.message}
              </p>
            )}
          </div>
        )}
      />
    </div>
  );
}