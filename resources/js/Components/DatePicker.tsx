'use client';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';

import { Button } from '@/Components/ui/button';
import { Calendar } from '@/Components/ui/calendar';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/Components/ui/popover';
import { cn } from '@/lib/utils';
import { it } from 'date-fns/locale';
import { useEffect, useState } from 'react';

interface DatePickerProps {
    text?: string;
    value?: Date;
    onChange?: (date?: Date) => void;
    [key: string]: unknown;
}

export default function DatePicker({
    text,
    value,
    onChange,
    ...props
}: DatePickerProps) {
    const [date, setDate] = useState<Date | undefined>(value);

    useEffect(() => {
        setDate(value);
    }, [value]);

    const handleSelect = (selectedDate?: Date) => {
        setDate(selectedDate);
        if (onChange) onChange(selectedDate);
    };
    return (
        <Popover {...props}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    className={cn(
                        'justify-start text-left font-normal',
                        !date && 'text-muted-foreground',
                    )}
                >
                    <CalendarIcon />
                    {date ? (
                        format(date, 'PPP', { locale: it })
                    ) : (
                        <span>{text || 'Seleziona una data'}</span>
                    )}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
                <Calendar
                    mode="single"
                    selected={date}
                    onSelect={handleSelect}
                    initialFocus
                    captionLayout="dropdown"
                    fromYear={new Date().getFullYear() - 100}
                    toYear={new Date().getFullYear()}
                    disabled={(date) =>
                        date > new Date() || date < new Date('1900-01-01')
                    }
                />
            </PopoverContent>
        </Popover>
    );
}
