import { useEffect, useState } from 'react';
import Header from '../../components/Header';
import SpaceCard from '../../components/SpaceCard';

import { GoChevronRight, GoChevronLeft } from 'react-icons/go';
import { getSpaces } from '../../services/api/api';
import { Link } from 'react-router-dom';

export default () => {
  const [page, setPage] = useState(1);
  const [items, setItems] = useState([]);

  const handlePage = (state: number) => {
    if (state == 1) {
      setPage(page + 1);
    } else if (state == 0) {
      setPage(page - 1);
    }
  };

  useEffect(() => {
    getSpaces(setItems);
  }, []);

  return (
    <div className='bg-stone-100 h-screen'>
      <Header />
      <div className="grid h-[42rem] grid-cols-5 gap-y-4 w-full mt-12 px-52 justify-items-center">
        {items.map((item: any) => (
          <Link to={`/spaces/${item.id}`}>
            <SpaceCard key={item.id} space={item} />
          </Link>
        ))}
      </div>
      <div className="w-full h-16 flex justify-center pt-4">
        <div
          className="cursor-pointer"
          onClick={() => {
            handlePage(0);
          }}
        >
          <GoChevronLeft size={32} />
        </div>
        <p className="text-xl font-semibold mx-6">page {page}</p>
        <div
          className="cursor-pointer"
          onClick={() => {
            handlePage(1);
          }}
        >
          <GoChevronRight size={32} />
        </div>
      </div>
    </div>
  );
};
