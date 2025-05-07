type Props = {
  label: string
  type: string
  value: string
  setValue: (e: string) => void
  disabled?: boolean
  placeholder?: string
}

export default ({ label, type, value, setValue, disabled, placeholder }: Props) => {
  return (
    <div className="mb-4 flex flex-col items-baseline">
      <label htmlFor={type} className="block font-semibold text-sm text-stone-700">{label}</label>
      <input
        id={type}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => setValue(e.target.value)}
        className={`w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-1 focus:ring-stone-400
          ${disabled ? 'cursor-not-allowed bg-zinc-300 border-zinc-500' : 'bg-zinc-50 border-zinc-800'}`}
        disabled={disabled}
      />
    </div>
  )
}