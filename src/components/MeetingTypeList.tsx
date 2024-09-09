'use client'

import Image from "next/image"
import HomeCard from "./HomeCard"
import { useState } from "react"
import { useRouter } from "next/navigation"
import MeetingModal from "./MeetingModal"

const MeetingTypeList = () => {

    const [meetingState, setMeetingState] = useState<'isScheduleMeeting' | 'isJoiningMeeting' | 'isInstantMeeting' | undefined>();

    const router = useRouter();
    return (
        <section className='grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4'>
            <HomeCard
                img={'/icons/add-meeting.svg'}
                title={'New Meeting'}
                description={'Start an instant meeting'}
                handleClick={() => setMeetingState('isInstantMeeting')}
                className="bg-orange-1"
            />
            <HomeCard
                img={'/icons/join-meeting.svg'}
                title={'Join Meeting'}
                description={'Join a meeting'}
                handleClick={() => setMeetingState('isJoiningMeeting')}
                className="bg-blue-1"

            />
            <HomeCard
                img={'/icons/schedule.svg'}
                title={'Schedule Meeting'}
                description={'Schedule an meeting'}
                handleClick={() => setMeetingState('isScheduleMeeting')}
                className="bg-purple-1"

            />
            <HomeCard
                img={'/icons/recordings.svg'}
                title={'Recordings'}
                description={'View Recordings'}
                handleClick={() => router.push('/recordings')}
                className="bg-yellow-1"

            />

            <MeetingModal
            
            />
        </section>
    )
}

export default MeetingTypeList
