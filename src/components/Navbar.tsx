import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import MobileNav from './MobileNav'
import { SignedIn, UserButton } from '@clerk/nextjs'

const Navbar = () => {
  return (
    <nav className='flex flex-between fixed z-50 w-full px-6 py-4 lg:px-10' >
      <Link href='/' className='flex items-center justify-between gap-2'>
        <Image
          src={'/icons/logo.svg'}
          width={32}
          height={32}
          alt='logo'
          className='max-sm:size-10 sm:size-14 lg:size-12'
        />
        <p className='text-[26px] font-extrabold text-white max-lg:hidden'>Meetings</p>
      </Link>

      <div className='flex-between gap-5'>
        <SignedIn>
          <UserButton />
        </SignedIn>
        <MobileNav />
      </div>
    </nav>
  )
}

export default Navbar
