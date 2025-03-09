import { useState } from 'react';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import SpaceList from '../../components/SpaceList';
import ReservationList from '../../components/ReservationList';

export default () => {
  const [activeSection, setActiveSection] = useState<'spaces' | 'reservations'>('spaces');

  return (
    <div className="min-h-screen bg-stone-100 flex flex-col">
      <Header title='Dashboard' />
      <div className="flex flex-grow ">
        <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} />
        <div className="flex-grow p-8">
          {activeSection === 'spaces' ? <SpaceList /> : <ReservationList />}
        </div>
      </div>
    </div>
  );
};
