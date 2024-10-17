import {ReactElement} from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
} from "@/components/ui/dialog";
import {X} from "lucide-react";
interface ModalProps {
    isOpen?: boolean;
    onClose?: () => void;
    title?: string;
    body?: ReactElement;
    footer?: ReactElement;
    step?: number;
    totalStep?: number;
}

export default function Modal({isOpen, onClose, body, footer, step, totalStep}: ModalProps) {
    return(
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className={"bg-black p-1"}>
                <DialogHeader>
                    <div className={"flex items-center gap-6"}>
                        <button onClick={onClose}
                                className={"p-1 border-0 text-white hover:opacity-70 transition w-fit"}>
                            <X size={28}/>
                        </button>
                        {step && totalStep && (
                            <div className={"text-xl font-bold"}>Step {step} of {totalStep}</div>
                        )}
                    </div>
                    <div className={"mt-4"}>{body}</div>
                    {footer && <div>{footer}</div>}
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}