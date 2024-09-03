import Image from 'next/image';
import React from 'react';
import date from 'date-and-time';

const Hero = () => {
    const now = new Date();

    const hrAndMin = date.format(now, 'hh:mm A').slice(0, 5);
    const amPm = date.format(now, 'hh:mm A').slice(5);

    const pattern = date.compile('dddd, DD MMMM YYYY');
    const finalDate = date.format(now, pattern);

    return (
        <section className='flex'>
            <div className='absolute flex  h-[200px] pr-8'>
                <Image
                    src="/hero.png"
                    alt="hero"
                    width={1000}
                    height={200}
                    className='rounded-xl' />

            </div>

            <div className='absolute p-4 flex flex-col w-full h-[200px] justify-end'>
                <div className='flex gap-2 items-baseline'>
                    <span className='text-7xl font-extrabold text-[#ffffff]'>{hrAndMin}</span>
                    <span className='text-2xl text-[#ffffff]'>{amPm}</span>
                </div>
                <div className='text-2xl font-medium text-[#ffffff]'>
                    {finalDate}
                </div>
            </div>
        </section>
    );
}

export default Hero;
