import { cn } from '@/lib/utils';
import { CallControls, CallParticipantsList, CallStatsButton, CallingState, PaginatedGridLayout, SpeakerLayout, useCallStateHooks } from '@stream-io/video-react-sdk';
import React, { useState } from 'react'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { LayoutList, UsersIcon } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import EndCallButton from './EndCallButton';
import Loader from './Loader';


type CallLayoutType = 'speaker-left' | 'speaker-right' | 'grid';

const MeetingRoom = () => {
  const searchParams = useSearchParams();
  const [layout, setLayout] = useState<CallLayoutType>('speaker-left');
  const isPersonalRoom = !!searchParams.get('personal')

  const [showParticipants, setShowParticipants] = useState(false);
  const {useCallCallingState} = useCallStateHooks();
  const callingState = useCallCallingState();
  const router = useRouter();

  if (callingState === CallingState.JOINING) return <Loader/>

  const CallLayout = () => {
    switch (layout) {
      case 'grid':
        return <PaginatedGridLayout />
      case 'speaker-right':
        return <SpeakerLayout participantsBarPosition={'left'} />
      default:
        return <SpeakerLayout participantsBarPosition={'right'} />
    }
  }
  return (
    <section className='relative h-screen w-full overflow-hidden   pt-4 text-white'>
      <div className='relative flex size-full items-center justify-center '>
        <div className='flex size-full max-w-[1000px] items-center'>
          <CallLayout />
        </div>
        <div className={cn('h-[calc(100vh-86px)] hidden ml-2', {
          'show-block': showParticipants
        })}>
          <CallParticipantsList onClose={() => setShowParticipants(false)} />
        </div>
      </div>

      <div className='flex bottom-0 fixed w-full items-center justify-center gap-5 flex-wrap'>
        <CallControls onLeave={() => router.push('/')}/>

        <DropdownMenu>
          <div className='flex items-center'>
            <DropdownMenuTrigger
              className='cursor-pointer rounded-2xl bg-[#19232d] px-4 py-2 hover:bg-[#4c535b]'>
              <LayoutList size={20} className='text-white' />
            </DropdownMenuTrigger>
          </div>
          <DropdownMenuContent className='border-dark-1 bg-dark-1 text-white'>
            {['Grid', 'Speaker Left', 'Speaker Right'].map((item, index) => (
              <div key={index}>
                <DropdownMenuItem
                  className='cursor-pointer hover:bg-dark-2'
                  onClick={() => {
                    setLayout(item.toLowerCase() as CallLayoutType);
                  }}
                >
                  {item}
                </DropdownMenuItem>
                <DropdownMenuSeparator className='border-dark-1' />
              </div>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <CallStatsButton />
        <button onClick={() => setShowParticipants((prev) => !prev)}>
          <div className='cursor-pointer rounded-2xl bg-[#19232d] px-4 py-2 hover:bg-[#4c535b]'>
            <UsersIcon size={20} className='text-white' />
          </div>
        </button>
        {!isPersonalRoom && <EndCallButton />}
      </div>
    </section>
  )
}

export default MeetingRoom
