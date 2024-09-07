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
    userId?: string
    email?: string
}

const MeetingModal = ({ title, open, setOpen, type,userId,email }: MeetingModalProps) => {
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="bg-dark-secondary border-dark-secondary">
                <DialogTitle></DialogTitle>
                <MeetingForm
                    type={type}
                    userId={userId}
                    title={title}
                    email={email}
                />
            </DialogContent>
        </Dialog>

    )
}

export default MeetingModal
