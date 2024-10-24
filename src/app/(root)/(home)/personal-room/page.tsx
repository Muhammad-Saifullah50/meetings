'use client'
import { Button } from '@/components/ui/button'
import { useToast } from '@/hooks/use-toast'
import { useGetCallById } from '@/hooks/useGetCallById'
import { useUser } from '@clerk/nextjs'
import { useStreamVideoClient } from '@stream-io/video-react-sdk'
import { useRouter } from 'next/navigation'
import React from 'react'

const Table = ({ title, description, styles }: { title: string, description: string, styles?: string }) => {
  return (
    <div className='flex flex-col items-start xl:justify-start xl:items-center gap-2 xl:flex-row'>
      <h1 className='text-base font-medium text-sky-1 lg:text-xl xl:min-w-32'>{title}</h1>
      <h1 className={`${styles} truncate text-sm font-bold max-sm:max-w-[320px]`}>{description}</h1>
    </div>
  )
}
const PersonalRoomPage = () => {
  const { user } = useUser();
  const { toast } = useToast();
  const client = useStreamVideoClient();
  const router = useRouter();

  const baseUrl = process.env.NODE_ENV === 'development' ? process.env.NEXT_PUBLIC_LOCALSERVERURL : process.env.NEXT_PUBLIC_SERVERURL;

  const meetingId = user?.id!
  const meetingLink = `${baseUrl}/meeting/${meetingId}?personal=true`;

  const { call } = useGetCallById(meetingId!);

  const startRoom = async () => {

    if (!client || !user) return;


    if (!call) {

      const newCall = client.call('default', meetingId);
      await newCall.getOrCreate({
        data: {
          starts_at: new Date().toISOString(),
        }
      });
    }

    router.push(`/meeting/${meetingId}?personal=true`);
  }
  return (
    <section className='flex size-full flex-col gap-10 text-white'>
      <h1 className='text-3xl font-bold '>
        Personal Room
      </h1>

      <div className='flex w-full flex-col gap-8 xl:max-w-[900px]'>
        <Table
          title='Topic'
          description={`${user?.username}'s Meeting Room`}
          styles='capitalize' />
        <Table title='Meeting ID' description={meetingId} />
        <Table title='Invite Link' description={meetingLink} styles='bg-blue-1'/>
      </div>

      <div className='flex gap-5'>
        <Button className='bg-blue-1' onClick={startRoom}>
          Start Meeting
        </Button>
        <Button className='bg-dark-3' onClick={() => {
          navigator.clipboard.writeText(meetingLink);
          toast({ title: 'Link Copied' })
        }}>
          Copy Invite Link
        </Button>
      </div>
    </section>
  )
}

export default PersonalRoomPage
