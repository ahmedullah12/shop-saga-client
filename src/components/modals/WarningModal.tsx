import { Button } from "@/components/ui/button";
import SSModal from "./SSModal";

const WarningModal = ({
  isOpen,
  onReplace,
  onCancel,
  message,
}: {
  isOpen: boolean;
  onReplace: () => void;
  onCancel: () => void;
  message: string;
}) => {
  return (
    <SSModal isOpen={isOpen} onClose={onCancel}>
    <div className="p-6">
      <h2 className="text-lg font-semibold mb-4">Warning</h2>
      <p className="text-sm text-muted-foreground mb-6">{message}</p>
      <div className="flex justify-around">
        <Button variant="destructive" onClick={onReplace}>
          Replace Cart
        </Button>
        <Button variant="outline" onClick={onCancel}>
          Retain Current Cart
        </Button>
      </div>
    </div>
  </SSModal>
  );
};

export default WarningModal;