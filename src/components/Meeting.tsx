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

import '@stream-io/video-react-sdk/dist/css/styles.css';
import Loader from './Loader';
import {randomId } from 'stream-chat/dist/types/utils';

const callId = randomId();

interface MeetingProps {
    meetingUser: User;
    token: string;
}

export default function Meeting({ token, meetingUser }: MeetingProps) {

    const apiKey = process.env.STREAM_API_KEY!;

    const user = {
        id: meetingUser.userId,
        name: meetingUser.username,
        image: meetingUser.image,
    };

    const client = new StreamVideoClient({ apiKey, user, token });
    const call = client.call('default', callId);
    call.join({ create: true });

    // todo:haver to update the meeting in the databse

    return (
        <StreamVideo client={client}>
            <StreamCall call={call}>
                <MeetingUILayout />
            </StreamCall>
        </StreamVideo>
    );
}

const MeetingUILayout = () => {
    const {
        useCallCallingState,
        useLocalParticipant,
        useRemoteParticipants,
    } = useCallStateHooks();
    const callingState = useCallCallingState();
    const localParticipant = useLocalParticipant();
    const remoteParticipants = useRemoteParticipants();



    if (callingState !== CallingState.JOINED) {
        return (
            <section className='flex flex-col gap-8 w-full h-screen items-center justify-center'>
                <Loader />
                <p>Joining your call</p>
            </section>
        );
    }

    return (
        <StreamTheme>
            <MyParticipantList participants={remoteParticipants} />
            <MyFloatingLocalParticipant participant={localParticipant} />
            <SpeakerLayout participantsBarPosition='bottom' />
            <CallControls />
        </StreamTheme>
    );
};


export const MyParticipantList = (props: { participants: StreamVideoParticipant[] }) => {
    const { participants } = props;
    return (
        <div className='flex flex-row gap-2'>
            {participants.map((participant) => (
                <ParticipantView participant={participant} key={participant.sessionId} />
            ))}
        </div>
    );
};

export const MyFloatingLocalParticipant = (props: { participant?: StreamVideoParticipant }) => {
    const { participant } = props;
    return (
        <div
            style={{
                position: 'absolute',
                top: '15px',
                left: '15px',
                width: '240px',
                height: '135px',
                boxShadow: 'rgba(0, 0, 0, 0.1) 0px 0px 10px 3px',
                borderRadius: '12px',
            }}
        >

            {participant && <ParticipantView participant={participant} />}
        </div>
    );
};