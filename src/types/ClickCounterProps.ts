export interface ClickCounterProps {
    conteoInicial?: number;
    min?: number;
    max?: number;
    paso?: number;
    onChange?: (valor : number) => void;
}
