import { CalendarDays } from 'lucide-react';

interface EventProps {
    id: number;
    title: string;
    date: string;
    image?: string;
}

// Componente per la card dell'evento
export default function EventCard({ id, title, date, image }: EventProps) {
    return (
        <div
            className="overflow-hidden rounded-lg bg-white shadow-md"
            data-id={id}
        >
            <img
                src={
                    image ||
                    'https://kzmphaiikrr71r64e06c.lite.vusercontent.net/placeholder.svg?height=300&width=400'
                }
                alt={title}
                className="h-48 w-full object-cover"
            />
            <div className="p-4">
                <h3 className="mb-2 text-xl font-semibold">{title}</h3>
                <p className="flex items-center text-gray-600">
                    <CalendarDays className="mr-2 h-4 w-4" />
                    {date}
                </p>
            </div>
        </div>
    );
}
