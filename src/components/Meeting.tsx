'use client'
import {
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


const callId = uuidv4();

interface MeetingProps {
    meetingUser: User;
    token: string;
    meetingId: string
}

export default function Meeting({ token, meetingUser, meetingId }: MeetingProps) {
    const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY!;
    const user = {
        id: meetingUser.userId,
        name: meetingUser.username,
        image: meetingUser.image,
    };

    const client = new StreamVideoClient({ apiKey, user, token });
    const call = client.call('default', callId);
    call.join({ create: true });

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
                <MeetingUILayout meetingId={meetingId} />
            </StreamCall>
        </StreamVideo>
    );
}

const MeetingUILayout = ({ meetingId }: { meetingId: string }) => {
    const { useCallCallingState } = useCallStateHooks();
    const callingState = useCallCallingState();

    const router = useRouter();

    const onCallEnd = async () => {
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