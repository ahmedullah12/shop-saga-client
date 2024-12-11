import { Controller } from "react-hook-form";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";

type TTextareaProps = {
  width: string;
  name: string;
  label?: string;
  rows: number;
  disabled?: boolean;
};

const SSTextarea = ({ width, name, label, rows, disabled }: TTextareaProps) => {
  return (
    <div style={{ marginBottom: "20px" }}>
      <Label className="text-primary">{label}</Label>
      <Controller
        name={name}
        rules={{ required: `${label} is required` }}
        render={({ field, fieldState: { error } }) => (
          <>
            <Textarea
              className={`${width} focus:outline-none resize-none`}
              {...field}
              id={name}
              rows={rows}
              disabled={disabled}
              value={field.value || ""}
            />
            {error && <small style={{ color: "red" }}>{error.message}</small>}
          </>
        )}
      />
    </div>
  );
};

export default SSTextarea;
