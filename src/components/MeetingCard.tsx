import Image from "next/image"
import { Button } from "./ui/button"

const MeetingCard = ({ type }: { type: 'upcoming' | 'ended' | 'recordings' }) => {
    return (
        <div className="bg-dark-1 rounded-[14px] p-6 flex flex-col gap-5 max-w-[533px] max-h-64">
            <Image
                src={type === 'recordings'
                    ? '/icons/recordings.svg'
                    : '/icons/upcoming.svg'}
                width={25}
                height={25}
                alt="schedule"
            />
            <div>
                <h1 className="font-bold text-2xl"> Team Sync: Sprint Planning & Updates</h1>
                {type !== 'recordings' && <p>March 15, 2024 - 10:00 AM</p>}
                {type === 'recordings' &&
                    (<span>
                        <p>Start Time: 123</p>
                        <p>End Time: 123</p>
                    </span>
                    )}
            </div>
            <div className="flex justify-between w-full pt-2">
                <div></div>

                {type === 'upcoming' && (
                    <div className="flex items-center justify-center gap-2">
                        <Button className="bg-blue-1">Start</Button>
                        <Button variant={'ghost'} className="bg-dark-3">
                            <Image
                                src={'/icons/copy.svg'}
                                width={20}
                                height={20}
                                alt="copy"
                            /> Copy Invitation</Button>
                    </div>
                )}

                {type === 'recordings' && (
                    <div className="flex items-center justify-center gap-2">
                        <Button className="bg-blue-1">
                            <Image
                                src={'/icons/play.svg'}
                                width={20}
                                height={20}
                                alt="copy"
                            /> Play </Button>                        <Button variant={'ghost'} className="bg-dark-3">
                            <Image
                                src={'/icons/share.svg'}
                                width={20}
                                height={20}
                                alt="copy"
                            /> Share </Button>
                    </div>
                )}

            </div>
        </div>
    )
}

export default MeetingCard
