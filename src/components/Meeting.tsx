'use client'
import {
    Call,
    CallControls,
    CallingState,
    ParticipantView,
    SpeakerLayout,
    StreamCall,
    StreamTheme,
    StreamVideo,
    StreamVideoClient,
    StreamVideoParticipant,
    useCallStateHooks,
} from '@stream-io/video-react-sdk';
import { User } from '@prisma/client'
import { v4 as uuidv4 } from 'uuid';

import '@stream-io/video-react-sdk/dist/css/styles.css';
import Image from 'next/image';
import { useEffect } from 'react';
import { toggleMeetingState, updateMeeting } from '@/actions/meeting.actions';
import { useRouter } from 'next/navigation';

interface MeetingProps {
    meetingUser: User;
    token: string;
    meetingId: string;
    callType: string
    callId: string
}

export default function Meeting({ token, meetingUser, meetingId, callId, callType }: MeetingProps) {
    const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY!;
    const user = {
        id: meetingUser.userId,
        name: meetingUser.username,
        image: meetingUser.image,
    };

    if (!callId) callId = uuidv4();

    const client = new StreamVideoClient({ apiKey, user, token });
    const call = client.call(callType || 'default', callId);


    if (callType) {
        call.join({ create: false })
    }
    else {
        call.join({ create: true })
    }


    useEffect(() => {
        const updateHandler = async () => {
            await updateMeeting(
                {
                    meetingId: meetingId,
                    callId: callId,
                    status: 'active',
                }
            );
        };
        updateHandler();
    }, []);
    return (
        <StreamVideo client={client}>
            <StreamCall call={call}>
                <MeetingUILayout meetingId={meetingId} call={call} />
            </StreamCall>
        </StreamVideo>
    );
}

const MeetingUILayout = ({ meetingId, call }: { meetingId: string, call: Call }) => {
    const { useCallCallingState, useParticipants } = useCallStateHooks();
    const callingState = useCallCallingState();
    const participants = useParticipants();

    const router = useRouter();

    const onCallEnd = async () => {
        // todo: have to end call for all if user is host
        // call.endCall();
        router.push('/');

        await toggleMeetingState(meetingId);
    }

    if (callingState === CallingState.JOINING) {
        return (
            <section className='flex flex-col gap-2 w-full h-screen items-center justify-center'>
                <Image
                    src='/loader.svg'
                    width={80}
                    height={80}
                    alt='loading'
                />
                <p className='text-light'>Joining your call</p>
            </section>
        );
    }

    return (
        <StreamTheme className='px-5'>
            <SpeakerLayout participantsBarPosition={'right'} />
            <CallControls onLeave={onCallEnd} />
        </StreamTheme>
    );
};