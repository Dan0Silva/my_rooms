interface SidebarProps {
  activeSection: 'spaces' | 'reservations';
  setActiveSection: (section: 'spaces' | 'reservations') => void;
}

const Sidebar = ({ activeSection, setActiveSection }: SidebarProps) => {
  return (
    <div className="w-52 bg-stone-700 text-white p-4">
      <h2 className="text-lg font-semibold mb-4">Painel Admin</h2>
      <ul>
        <li
          className={`p-2 cursor-pointer ${activeSection === 'spaces' ? 'bg-stone-700' : 'hover:bg-stone-600'
            }`}
          onClick={() => setActiveSection('spaces')}
        >
          Espaços
        </li>
        <li
          className={`p-2 cursor-pointer ${activeSection === 'reservations' ? 'bg-stone-700' : 'hover:bg-stone-600'
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