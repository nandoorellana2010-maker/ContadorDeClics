import {useState, useCallback, useEffect} from "react";
interface UseClickCounterOptions {
    initial?: number;
    min?: number;
    max?: number;
    step?: number;
    persistkey?: string | null;
}

    export function useClickCounter(options: UseClickCounterOptions = {}) {
    const {
        initial = 0,
        min = undefined,
        max = undefined,
        step = 1,
        persistkey = null,} = options;

    const readInitial = () => {
        if (persistkey) {
            try {
                const raw = localStorage.getItem(persistkey);
                if (raw !== null) {
                    const parsed = Number(raw);
                    if (!Number.isNaN(parsed)) return parsed;
                    }
                    } catch {
                    }
                }
        return initial;
    };
    const [conteo, setConteo] = useState<number>(readInitial());

    useEffect(() => {
        if (persistkey) {
            try {
                localStorage.setItem(persistkey, String(conteo));
            } catch {
            }
        }
    }, [conteo, persistkey]);

    const clamp = useCallback(
        (v: number) => {
            let val = v;
            if (typeof min === 'number' && val < min) val = min;
            if (typeof max === 'number' && val > max) val = max;
            return val;
        },
        [min, max]
    );

    const aumentar = useCallback(() => {
        setConteo((c) => clamp(c + step));
    }, [clamp, step]);

    const disminuir = useCallback(() => {
        setConteo ((c) => clamp(c - step));
        }, [clamp, step]);

        const reiniciar = useCallback(() => {
        setConteo(clamp(initial));
    }, [clamp, initial]);
    const setValor = useCallback(
        (v: number) => {
            setConteo(clamp(v));
        },
        [clamp]
    );
    const isAtMin = typeof min === 'number' ? conteo <= min : false;
    const isAtMax = typeof max === 'number' ? conteo >= max : false;

    return {
    conteo,
    aumentar,
    disminuir,
    reiniciar,
    setValor,
    isAtMin,
    isAtMax,
    };
}
export default useClickCounter;