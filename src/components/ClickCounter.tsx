import type { ClickCounterProps } from "../types/ClickCounterProps";
import useClickCounter from "../hooks/useClickCounter";
import Input from "./Input";
import { useState, useEffect } from "react";
const ClickCounter: React.FC<ClickCounterProps> = ({
  conteoInicial = 0,
  min,
  max,
  paso = 1,
  onChange,
}) => {
    const { conteo, aumentar, disminuir, reiniciar, setValor, isAtMin, isAtMax } =
    useClickCounter({ initial: conteoInicial, min, max, step: paso, persistkey: 'click-counter-v1' });
    const [inputValor, setInputValor] = useState(String(conteoInicial));
    const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    onChange && onChange(conteo);
  }, [conteo, onChange]);

  const aplicarValor = () => {
    const n = Number(inputValor);
    if (Number.isNaN(n)) {
      setError('Ingresa un número válido');
      return;
    }
    if (typeof min === 'number' && n < min) {
      setError(`El valor mínimo es ${min}`);
      return;
    }
    if (typeof max === 'number' && n > max) {
      setError(`El valor máximo es ${max}`);
      return;
    }
    setError(null);
    setValor(n);
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl text-center font-semibold mb-4">CONTADOR DE CLICS</h2>

      <div className="mb-4">
        <div className="text-4xl font-bold text-center">{conteo}</div>
      </div>

      <div className="flex gap-3 justify-center mb-4">
        <button
          onClick={disminuir}
          disabled={isAtMin}
          className="px-4 py-2 bg-indigo-500 rounded disabled:opacity-50 hover:bg-gray-300"
          aria-label="Disminuir"
        >
          -
        </button>
        <button
          onClick={reiniciar}
          className="px-4 py-2 bg-yellow-200 rounded hover:bg-yellow-300"
          aria-label="Reiniciar"
        >
          Reiniciar
        </button>
        <button
          onClick={aumentar}
          disabled={isAtMax}
          className="px-4 py-2 bg-indigo-500 text-white rounded disabled:opacity-50 hover:bg-indigo-600"
          aria-label="Aumentar"
        >
          +
        </button>
      </div>

      <div className="space-y-2">
        <Input
          label="Fijar valor"
          type="number"
          value={inputValor}
          onChange={(v) => setInputValor(v)}
          ariaLabel="Input fijar valor"
          placeholder="Ingresa un número"
        />
        {error && <div className="text-sm text-red-600">{error}</div>}
        <div className="flex gap-2">
          <button
            onClick={aplicarValor}
            className="px-3 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Aplicar
          </button>
          <button
            onClick={() => {
              setInputValor(String(conteo));
              setError(null);
            }}
            className="px-3 py-2 bg-gray-100 rounded hover:bg-gray-200"
          >
            Usar conteo actual
          </button>
        </div>
      </div>

      <div className="mt-4 text-xs text-gray-500">
        {typeof min === 'number' && <div>Mínimo: {min}</div>}
        {typeof max === 'number' && <div>Máximo: {max}</div>}
        <div>Paso: {paso}</div>
      </div>
    </div>
  );
};
export default ClickCounter;