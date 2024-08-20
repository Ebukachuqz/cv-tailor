import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Loader2 } from "lucide-react";

interface LoadingModalProps {
  message?: string;
  isOpen: boolean;
}

export default function LoadingModal({
  message = "Loading...",
  isOpen,
}: LoadingModalProps) {
  return (
    <Dialog open={isOpen}>
      <DialogContent className="flex flex-col justify-center items-center">
        <Loader2 className="h-10 w-10 animate-spin" />
        <DialogDescription>{message}</DialogDescription>
      </DialogContent>
    </Dialog>
  );
}
