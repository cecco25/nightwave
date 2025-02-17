'use client';
import { Link, usePage } from '@inertiajs/react';

export default function Navbar() {
    const { props } = usePage();
    const user = props.user;

    return (
        <nav className="fixed z-50 hidden w-full border-b border-gray-200 bg-primary-foreground dark:border-gray-800 sm:block">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    <div className="flex items-center">
                        <Link href="/" className="flex-shrink-0">
                            <span className="text-2xl font-bold text-orange-500">
                                Nightwave
                            </span>
                        </Link>
                    </div>
                    <div className="hidden sm:block">
                        <div className="ml-10 flex items-baseline space-x-4">
                            <NavLink href="/">Home</NavLink>
                            <NavLink href="#events">Events</NavLink>
                            <NavLink href="#gallery">Gallery</NavLink>
                            <NavLink href="#contact">Contact</NavLink>
                            <NavLink href="#profile">
                                {user ? `${user.name}` : 'Not logged in'}
                            </NavLink>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}

const NavLink = ({
    href,
    children,
}: {
    href: string;
    children: React.ReactNode;
}) => {
    const { url } = usePage();
    const isActive = url === href;

    return (
        <Link
            href={href}
            className={`rounded-md px-3 py-2 text-sm font-medium text-black hover:bg-secondary dark:text-gray-300 ${isActive ? 'bg-secondary' : ''}`}
        >
            {children}
        </Link>
    );
};
