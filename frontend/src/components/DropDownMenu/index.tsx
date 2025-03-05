export default () => {
  return (
    <div className="absolute right-0 mt-50 mr-8 w-52 bg-stone-500 border border-stone-700 rounded-md shadow-lg">
      <ul className="py-2">
        <li>
          <button className="w-full text-left px-4 py-3 text-white hover:bg-stone-600 transition-colors duration-300">
            Settings
          </button>
        </li>
        <li>
          <button className="w-full text-left px-4 py-3 text-white hover:bg-stone-600 transition-colors duration-300">
            Logout
          </button>
        </li>
      </ul>
    </div>
  )
}