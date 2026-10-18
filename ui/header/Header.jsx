"use client";

import Link from "next/link";
import Image from "next/image";
import logo from '@/public/assets/Addis Eats.png'

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/menu", label: "Menu" },
  { href: "/cart", label: "Cart" },
];

export default function Header() {
  // const { count, total } = useCart();
  // const hydrated = useHydrated();

    return (
        <header className="sticky top-0 z-50 border-b border-stone-200 bg-white/90 backdrop-blur">
            <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
            <Link href="/" className="flex items-center gap-2">
                <Image
                src={logo}
                alt="Addis Eats logo"
                width={40}
                height={40}
                className="rounded-md"
                priority
                />
                <span className="text-sm font-semibold leading-tight text-stone-900">
                Addis <br />
                Eats
                </span>
            </Link>

            <nav aria-label="Main" className="flex items-center gap-3 sm:gap-6">
                <ul className="flex items-center gap-1">
                {navLinks.map(({ href, label }) => (
                    <li key={href}>
                    <Link
                        href={href}
                        className="rounded-md px-2 py-2 text-sm font-medium text-stone-700 transition hover:bg-stone-100 hover:text-stone-900 sm:px-3"
                    >
                        {label}
                    </Link>
                    </li>
                ))}
                </ul>

                {/* <p className="text-sm">
                {hydrated ? count : 0} items · {hydrated ? total : 0} total
                </p> */}

                <ul className="flex items-center gap-2">
                <li>
                    <Link
                    href="/auth/signin"
                    className="rounded-md px-2 py-2 text-sm font-medium text-stone-700 transition hover:bg-stone-100 sm:px-3"
                    >
                    Login
                    </Link>
                </li>
                <li>
                    <Link
                    href="/auth/signup"
                    className="rounded-md bg-stone-900 px-3 py-2 text-sm font-medium text-white transition hover:bg-amber-600 sm:px-4"
                    >
                    Signup
                    </Link>
                </li>
                </ul>
            </nav>
            </div>
        </header>
    );
}