'use client'

import { useEffect, useState } from "react";

const TimeDate = () => {
    
    const [currentTime, setCurrentTime] = useState(new Date());

    const now = new Date();

    const time = now.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
    });

    const date = (new Intl.DateTimeFormat('en-US', {
        dateStyle: 'full'
    })).format(currentTime);
    

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => {
            clearInterval(timer);
        };
    }, []);


    return (
        <div className='flex flex-col gap-2'>
            <h1 className='text-4xl font-extrabold lg:text-7xl'>{time}</h1>
            <p className='text-lg font-medium text-sky-1 lg:text-2xl'>{date}</p>
        </div>
    )
}

export default TimeDate

