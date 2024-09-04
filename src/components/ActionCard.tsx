'use client'
import Image from "next/image"
import { useRouter } from "next/navigation"
import MeetingModal from "./MeetingModal"
import { useState } from "react"

interface ActionCardProps {
    title: string
    subTitle: string
    iconPath: string
    color: string
    type: 'new' | 'join' | 'schedule' | 'recordings'
    userId?: string
    email?: string
}
const ActionCard = ({ title, subTitle, iconPath, color, type, userId, email }: ActionCardProps) => {

    const router = useRouter();
    const [modalOpen, setModalOpen] = useState(false)
    return (<>

        <MeetingModal
            open={modalOpen}
            setOpen={setModalOpen}
            title={title}
            type={type}
            userId={userId}
            email={email}
        />
        <div
            onClick={() => {
                if (type === 'recordings') {
                    router.push('/recordings')
                } else {
                    setModalOpen(true)
                }
            }}
            className={`${color} hover:opacity-95 w-52 h-52 rounded-xl p-4 flex flex-col justify-between`}>
            <div className="p-2 bg-white/40 w-fit rounded-xl">
                <Image
                    src={iconPath}
                    width={24}
                    height={24}
                    alt={title}
                />
            </div>
            <div className="flex flex-col gap-2 text-white">
                <h2 className="text-2xl font-semibold">{title}</h2>
                <p className="text-sm">{subTitle}</p>
            </div>
        </div>
    </>)
}

export default ActionCard
