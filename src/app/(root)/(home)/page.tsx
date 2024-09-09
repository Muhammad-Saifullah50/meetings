import MeetingTypeList from '@/components/MeetingTypeList';
import TimeDate from '@/components/TimeDate';
import React from 'react'

const HomePage = () => {

  return (
    <section className='flex flex-col gap-10 text-white size-full'>
      <div className='h-[300px] w-full rounded-[20px] bg-hero bg-cover'>
        <div className='flex flex-col justify-between h-full p-6 max-md:px-5 max-md:py-8 lg:p-11'>
          <h2 className='glassmorphism max-w-[270px] rounded py-2 text-center text-base font-normal'>Upcoming Meeting at 12:30 PM</h2>

          <TimeDate />
        </div>
      </div>

      <MeetingTypeList />
    </section>
  )
}

export default HomePage
