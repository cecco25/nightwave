import { Label } from './ui/label';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';

interface RadioButtonsProps {
    options: { value: string; label: string }[];
    defaultValue?: string;
    [key: string]: unknown;
}

export default function RadioButtons({
    options,
    defaultValue = 'Defualt',
}: RadioButtonsProps) {
    return (
        <RadioGroup defaultValue={defaultValue}>
            {options.map((option) => (
                <div key={option.value} className="flex items-center space-x-2">
                    <RadioGroupItem value={option.value} id={option.value} />
                    <Label htmlFor={option.value}>{option.label}</Label>
                </div>
            ))}
        </RadioGroup>
    );
}
