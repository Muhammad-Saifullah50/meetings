import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import React from 'react'

const Navbar = () => {
  return (
    <nav className='bg-dark-secondary flex justify-between items-center p-3'>
      <div className='flex gap-2 items-center justify-start'>
        <Image
          src={'/logo.svg'}
          width={40}
          height={40}
          alt='Meetings logo'
        />
        <h1 className='font-bold text-2xl'>MEETINGS</h1>
      </div>

      <div>
        <UserButton />
      </div>
    </nav>
  )
}

export default Navbar
