'use client';

import { Link, usePage } from '@inertiajs/react';
import { Calendar, Home, Image, User } from 'lucide-react';

const BottomNav = () => {
    return (
        <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-gray-200 bg-primary-foreground dark:border-gray-800 sm:hidden">
            <div className="flex h-16 items-center justify-around">
                <NavItem href="/" icon={<Home />} label="Home" />
                <NavItem href="#events" icon={<Calendar />} label="Events" />
                <NavItem href="#gallery" icon={<Image />} label="Gallery" />
                <NavItem href="#contact" icon={<User />} label="Profile" />
            </div>
        </nav>
    );
};

const NavItem = ({
    href,
    icon,
    label,
}: {
    href: string;
    icon: React.ReactNode;
    label: string;
}) => {
    const { url } = usePage();
    const isActive = url === href;

    return (
        <Link
            href={href}
            className={`flex h-full w-full flex-col items-center justify-center ${isActive ? 'text-primary' : ''}`}
        >
            {icon}
            <span className="mt-1 text-xs">{label}</span>
        </Link>
    );
};

export default BottomNav;
