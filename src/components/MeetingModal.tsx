import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import MeetingForm from "./MeetingForm"

interface MeetingModalProps {
    open: boolean
    setOpen: (open: boolean) => void
    title: string
    type: 'new' | 'join' | 'schedule' | 'recordings'
}

const MeetingModal = ({ title, open, setOpen, type }: MeetingModalProps) => {
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                </DialogHeader>
                <MeetingForm
                    type={type}
                />
            </DialogContent>
        </Dialog>

    )
}

export default MeetingModal
