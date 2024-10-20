// @ts-nocheck
'use client'
import { useGetCalls } from "@/hooks/useGetCalls"
import { Call, CallRecording } from "@stream-io/video-react-sdk";
import { useRouter } from "next/navigation";
import { useState } from "react";
import MeetingCard from "./MeetingCard";
import Loader from "./Loader";

const CallList = ({ type }: { type: 'upcoming' | 'ended' | 'recordings' }) => {

    const { endedCalls, loading, upcomingCalls, callRecordings } = useGetCalls();

    const router = useRouter();
    const [recordings, setRecordings] = useState<CallRecording[]>([]);

    const getCalls = () => {
        switch (type) {
            case 'ended':
                return endedCalls
            case 'recordings':
                return recordings;
            case 'upcoming':
                return upcomingCalls;
            default:
                return [];
        }
    }
    const getNoCallsMessage = () => {
        switch (type) {
            case 'ended':
                return 'No Previous Meetings'
            case 'recordings':
                return 'No Recordings';
            case 'upcoming':
                return "No Upcoming Meetings";
            default:
                return '';
        }
    };

    const calls = getCalls();
    const noCallsMessage = getNoCallsMessage();

    if (loading) {
        return <Loader />;
    }
    return (
        <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
            {calls && calls.length > 0 ? calls.map((meeting: CallRecording | Call) => {
                // console.log(meeting)
                return (
                    <MeetingCard
                        key={meeting.id}
                        icon={
                            type === 'ended' ? '/icons/previous.svg' :
                                type === 'upcoming' ? '/icons/upcoming.svg' :
                                    '/icons/recording.svg'
                        }
                        title={(meeting as Call).state.custom.description || 'No Description'}
                        date={(meeting as Call).state.startsAt.toLocaleString() || meeting.start_time.toLocaleString()}
                        isPreviousMeeting={type === 'ended'}
                        link={type === 'recordings' ? meeting.url : `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${meeting.id}`}
                        buttonIcon1={type === 'recordings' ? '/icons/play.svg' : undefined}
                        buttonText={type === 'recordings' ? 'Play' : 'Start'}
                        handleClick={type === 'recordings'
                            ? () => {
                                router.push(meeting.url)
                            } : () => {
                                router.push(`/meeting/${meeting.id}`)
                            }}
                    />)
            })
                : (
                    <h1>{noCallsMessage}</h1>
                )}
        </div>
    )
}

export default CallList
