export default ({toggled, handleAction}: {toggled: boolean, handleAction: () => void}) => {
  return (
    <div>
      <button className={`w-16 h-9 bg-[#cccccc] rounded-full border border-stone-600 cursor-pointer toggle-btn 
        ${toggled ? 'toggled' : ''}`}
        onClick={handleAction}>
        <div className="thumb"/>
      </button>
    </div>
  )
}