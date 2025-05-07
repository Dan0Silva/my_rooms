interface SidebarProps {
  activeSection: 'spaces' | 'reservations';
  setActiveSection: (section: 'spaces' | 'reservations') => void;
}

const Sidebar = ({ activeSection, setActiveSection }: SidebarProps) => {
  return (
    <div className="w-52 bg-stone-700 text-white py-4">
      <h2 className="text-lg font-semibold mb-4 pl-4">Painel Admin</h2>
      <ul>
        <li
          className={`p-2 pl-6 cursor-pointer ${activeSection === 'spaces' ? 'bg-stone-600' : 'hover:bg-stone-600'
            }`}
          onClick={() => setActiveSection('spaces')}
        >
          Espaços
        </li>
        <li
          className={`p-2 pl-6 cursor-pointer ${activeSection === 'reservations' ? 'bg-stone-600' : 'hover:bg-stone-600'
            }`}
          onClick={() => setActiveSection('reservations')}
        >
          Reservas
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;