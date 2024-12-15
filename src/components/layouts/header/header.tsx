'use client'
import Link from 'next/link'
import { Icons } from './icons'
import { Button } from '@/components/ui/button'
import { Github } from 'lucide-react'
import { siteConfig } from '../footer'

export const Header = () => {
  return (
    <header className="sticky top-0 z-50 bg-background backdrop-blur supports-[backdrop-filter]:bg-background/60 mx-auto w-full h-fit">
      <div className="container flex h-14 max-w-screen-2xl items-center border-b mx-auto border-x border-x-border px-8">
        <Link
          href="/"
          className="mr-4 flex items-center space-x-2 lg:mr-10"
        >
          <Icons.logo className="h-6 w-6" />
          <span className="hidden font-bold lg:inline-block">duck/pdf</span>
        </Link>
        <nav className="flex items-center gap-4 text-sm lg:gap-6 justify-between w-full">
          <div></div>
          <Link
            href={siteConfig.links.github}
            target="_blank"
          >
            <Button
              size={'icon'}
              variant={'ghost'}
              icon={{ children: Github, className: '!size-[18px]' }}
            ></Button>
          </Link>
        </nav>
      </div>
    </header>
  )
}

// <Link
//   href="/preview"
//   className="mr-4 flex items-center space-x-2 lg:mr-10"
// >
//   Preview
// </Link>
// <Link
//     href="/about-us"
//     className="mr-4 flex items-center space-x-2 lg:mr-10"
// >
//     About us
// </Link>
//
