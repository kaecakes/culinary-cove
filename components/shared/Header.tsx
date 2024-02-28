import Image from "next/image"
import Link from "next/link"
import MobileNav from "./MobileNav"
import NavItems from "./NavItems"
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs"
import { Button } from "../ui/button"

const Header = () => {
  return (
    <header className="w-full">
        <div className="wrapper flex items-center justify-between px-10">
            <Link href="/" className="w-36">
                <Image
                    src="/assets/logo.svg"
                    width="0"
                    height="0"
                    alt="Culinary Cove logo"
                    className="w-full h-auto"
                    priority
                /> 
            </Link>
            <SignedIn>
                <nav className="md:flex-between hidden w-full max-w-xs">
                    <NavItems />
                </nav>
            </SignedIn>
            <nav className="flex w-32 justify-end gap-3">
                <SignedIn>
                    <UserButton afterSignOutUrl="/"></UserButton>
                    <MobileNav />
                </SignedIn>
                <SignedOut>
                    <Button asChild className="rounded-full" size="lg">
                        <Link href="/sign-in">
                            Login
                        </Link>
                    </Button>
                </SignedOut>
            </nav>
        </div>
    </header>
  )
}

export default Header