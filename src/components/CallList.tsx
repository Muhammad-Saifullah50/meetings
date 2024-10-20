'use client'

import { useGetCalls } from "@/hooks/useGetCalls"
import { Call, CallRecording } from "@stream-io/video-react-sdk";
import { useRouter } from "next/navigation";
import { useState } from "react";
import MeetingCard from "./MeetingCard";

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
    return (
        <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
            {calls && calls.length > 0 ? calls.map((meeting: CallRecording | Call) => (
                <MeetingCard />
            ))
                : (
                    <h1>{noCallsMessage}</h1>
                )}
        </div>
    )
}

export default CallList
