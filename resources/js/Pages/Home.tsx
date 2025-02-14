import { Button } from '@/Components/ui/button';
import { Head } from '@inertiajs/react';

// Componente principale Home
export default function Home() {
    return (
        <>
            <Head title="Home"></Head>
            <Button onClick={() => (window.location.href = '/logout')}>
                Logout
            </Button>
        </>
    );
}
