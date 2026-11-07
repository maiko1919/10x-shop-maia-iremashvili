interface QuantityStepperProps {
  value: number;
  max: number;
  onChange: (value: number) => void;
}

function QuantityStepper({ value, max, onChange }: QuantityStepperProps) {
  return (
    <div className="inline-flex items-center rounded-lg border border-gray-300 bg-white">
      <button
        type="button"
        onClick={() => onChange(value - 1)}
        disabled={value <= 1}
        aria-label="Decrease quantity"
        className="h-11 w-11 rounded-l-lg text-lg text-gray-700 hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 disabled:cursor-not-allowed disabled:text-gray-300"
      >
        −
      </button>
      <span className="w-10 text-center text-sm font-medium">{value}</span>
      <button
        type="button"
        onClick={() => onChange(value + 1)}
        disabled={value >= max}
        aria-label="Increase quantity"
        className="h-11 w-11 rounded-r-lg text-lg text-gray-700 hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 disabled:cursor-not-allowed disabled:text-gray-300"
      >
        +
      </button>
    </div>
  );
}

export default QuantityStepper;