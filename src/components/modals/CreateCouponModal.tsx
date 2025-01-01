import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useCreateCouponMutation } from "@/redux/features/coupon/couponApi";
import { DialogTitle } from "@radix-ui/react-dialog";
import { useState } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import SSForm from "../form/SSForm";
import SSInput from "../form/SSInput";
import { Calendar } from "../ui/calendar";
import { Label } from "../ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

const CreateCouponModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>();

  const [createCoupon, { isLoading }] = useCreateCouponMutation();

  const handleSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const res = await createCoupon({
        ...data,
        discount: Number(data.discount),
        expiryDate: date,
      }).unwrap();
      if (res.success) {
        toast.success(res.message);
        setIsOpen(false);
        setDate(undefined);
      }
    } catch (err: any) {
      toast.error(err.data.message);
      console.log(err);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button size="sm">Create Coupon</Button>
      </DialogTrigger>
      <DialogContent className="min-h-[300px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-primary">
            Create Coupon
          </DialogTitle>
        </DialogHeader>

        <SSForm onSubmit={handleSubmit}>
          <SSInput
            name="couponNumber"
            type="text"
            label="Coupon"
            width="max-w-[400px]"
          />
          <div className="flex flex-col my-5">
            <Label className="mb-2 text-primary">Select a Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "max-w-[400px] justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon />
                  {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <SSInput
            name="discount"
            type="number"
            label="Discount(%)"
            width="max-w-[400px]"
          />

          <div className="flex justify-start space-x-2 mt-8">
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              Submit
            </Button>
          </div>
        </SSForm>
      </DialogContent>
    </Dialog>
  );
};

export default CreateCouponModal;
