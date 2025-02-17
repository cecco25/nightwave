import BottomNav from '@/Components/BottomNav';
import Navbar from '@/Components/Navbar';
import { Head } from '@inertiajs/react';

export default function Home() {
    return (
        <>
            <Head title="Home"></Head>
            <Navbar />
            <BottomNav />
        </>
    );
}
