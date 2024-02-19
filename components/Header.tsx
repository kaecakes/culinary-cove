import Image from "next/image"
import Link from "next/link"
import MobileNav from "./MobileNav"
import NavItems from "./NavItems"

const Header = () => {
  return (
    <header className="w-full border-b">
        <div className="wrapper flex items-center justify-between">
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
            <nav className="md:flex-between hidden w-full max-w-xs">
                <NavItems />
            </nav>
            <div className="flex w-32 justify-end">
                <MobileNav />
            </div>
        </div>
    </header>
  )
}

export default Header