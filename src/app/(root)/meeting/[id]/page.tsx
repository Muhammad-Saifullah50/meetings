'use client'
import MeetingRoom from '@/components/MeetingRoom';
import MeetingSetup from '@/components/MeetingSetup';
import { useUser } from '@clerk/nextjs'
import { StreamCall, StreamTheme } from '@stream-io/video-react-sdk';
import { useState } from 'react';

const MeetingPage = ({ params }: { params: { id: string } }) => {

    const { user, isLoaded } = useUser();

    const [isSetupComplete, setIsSetupComplete] = useState(false);

    return (
        <main className='h-screen w-full'>
            <StreamCall call={}>
                <StreamTheme>
                    {!isSetupComplete ? (
                        <MeetingSetup />
                    ) : (
                        <MeetingRoom />
                    )}
                </StreamTheme>
            </StreamCall>
        </main>
    )
}

export default MeetingPage
