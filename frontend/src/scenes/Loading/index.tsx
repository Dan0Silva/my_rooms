export default () => {
  return (
    <div className="flex items-center justify-center h-screen bg-stone-100">
      <div className="flex space-x-2">

        <div className="w-2 h-8 bg-stone-600 opacity-50 animate-pulse-bar"></div>
        <div className="w-2 h-8 bg-stone-600 opacity-50 animate-pulse-bar animation-delay-150"></div>
        <div className="w-2 h-8 bg-stone-600 opacity-50 animate-pulse-bar animation-delay-300"></div>
      </div>
    </div>
  )
}