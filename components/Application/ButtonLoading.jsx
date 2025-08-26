import { Loader2Icon } from "lucide-react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

const ButtonLoading = ({
  type,
  text,
  loading,
  loadingText = "Loading...",
  className,
  onClick,
  ...props
}) => {
  return (
    <Button
      type={type}
      disabled={loading}
      onClick={onClick}
      className={cn("flex items-center justify-center gap-2", className)}
      {...props}
    >
      {loading && <Loader2Icon className="animate-spin h-4 w-4" />}
      {loading ? loadingText : text}
    </Button>
  );
};

export default ButtonLoading;