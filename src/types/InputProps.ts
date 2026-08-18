export interface InputProps {
    value?: string | number;
    onChange: (value: string) => void;
    label?: string;
    placeholder?: string;
    type?: string;
    min?: number;
    max?: number;
    ariaLabel?: string;
    className?: string;
}