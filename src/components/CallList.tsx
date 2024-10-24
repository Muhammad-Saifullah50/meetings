'use client'
import { useGetCalls } from "@/hooks/useGetCalls"
import { Call, CallRecording } from "@stream-io/video-react-sdk";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import MeetingCard from "./MeetingCard";
import Loader from "./Loader";
import { useToast } from "@/hooks/use-toast";

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
    const { toast } = useToast();
    useEffect(() => {
        try {
            const fetchRecordings = async () => {
                const callData = await Promise.all(callRecordings.map((meeting) => meeting.queryRecordings()))

                const recordings = callData
                    .filter(call => call.recordings.length > 0)
                    .flatMap(call => call.recordings);

                setRecordings(recordings)
            };

            if (type === 'recordings') fetchRecordings();


        } catch (error) {
            toast({ title: 'Try Again Later' })
        }

    }, [type, callRecordings, toast]);

    const calls = getCalls();

    const noCallsMessage = getNoCallsMessage();

    if (loading) {
        return <Loader />;
    }

    const baseUrl = process.env.NODE_ENV === 'development' ? process.env.NEXT_PUBLIC_LOCALSERVERURL : process.env.NEXT_PUBLIC_SERVERURL;
    return (
        <div className="grid grid-cols-1 gap-5 xl:grid-cols-2 2xl:grid-cols-3">
            {calls && calls.length > 0 ? calls.map((meeting: CallRecording | Call) => {
                return (
                    <MeetingCard
                        key={(meeting as Call).id}
                        icon={
                            type === 'ended' ? '/icons/previous.svg' :
                                type === 'upcoming' ? '/icons/upcoming.svg' :
                                    '/icons/recordings.svg'
                        }
                        title={(meeting as Call)?.state?.custom?.description || (meeting as CallRecording)?.filename?.substring(0, 20) || 'Personal Meeting'}
                        //@ts-expect-error  
                        date={(meeting as Call)?.state?.startsAt.toLocaleString() || (meeting as CallRecording).start_time.toLocaleString()}
                        isPreviousMeeting={type === 'ended'}
                        link={type === 'recordings' ? (meeting as CallRecording).url : `${baseUrl}/meeting/${(meeting as Call).id}`}
                        buttonIcon1={type === 'recordings' ? '/icons/play.svg' : undefined}
                        buttonText={type === 'recordings' ? 'Play' : 'Start'}
                        handleClick={type === 'recordings'
                            ? () => {
                                router.push((meeting as CallRecording).url)
                            } : () => {
                                router.push(`/meeting/${(meeting as Call).id}`)
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
