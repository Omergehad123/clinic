import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import LinkBtn from '../ui/LinkBtn'

function Header() {
    return (
        <div className='flex items-center justify-evenly h-16 bg-(--bg-color)'>
            <div className='flex items-center gap-10'>
                <Image src="/logo.png" alt="Logo" width={50} height={50} />
                <ul className='flex gap-10'>
                    <li><Link className='font-semibold text-sm text-black hover:text-(--second-color) transition-all duration-200' href="/">Home</Link></li>
                    <li><Link className='font-semibold text-sm text-black hover:text-(--second-color) transition-all duration-200' href="/about">About</Link></li>
                    <li><Link className='font-semibold text-sm text-black hover:text-(--second-color) transition-all duration-200' href="/pricing">Pricing</Link></li>
                    <li><Link className='font-semibold text-sm text-black hover:text-(--second-color) transition-all duration-200' href="/contact">Contact</Link></li>
                </ul>
            </div>
            <div className='flex items-center gap-2'>
                <LinkBtn link="/login" text="Login" bgColor="transparent" textColor="second-color" />
                <LinkBtn link="/signup" text="Signup" bgColor="second-color" textColor="main-color" />
            </div>
        </div >
    )
}

export default Header