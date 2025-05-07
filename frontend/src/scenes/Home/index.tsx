import { useEffect, useMemo, useState } from 'react';
import Header from '../../components/Header';
import SpaceCard from '../../components/SpaceCard';

import { GoChevronRight, GoChevronLeft } from 'react-icons/go';
import { getSpaces } from '../../services/api/spaces';
import { Link } from 'react-router-dom';

export default () => {
  const [page, setPage] = useState(1);
  const [items, setItems] = useState<Space[]>([]);

  const spacesPerPage = 10;

  useEffect(() => {
    getSpaces(setItems);
  }, []);

  const paginatedItems = useMemo(() => {
    const indexOfLastItem = page * spacesPerPage;
    const indexOfFirstItem = indexOfLastItem - spacesPerPage;
    return items.slice(indexOfFirstItem, indexOfLastItem);
  }, [page, items]);

  const handlePageChange = (direction: "next" | "prev") => {
    if (direction === "next" && page * spacesPerPage < items.length) {
      setPage(page + 1);
    } else if (direction === "prev" && page > 1) {
      setPage(page - 1);
    }
  };

  return (
    <div className='bg-stone-100 min-h-screen flex flex-col'>
      <Header />
      <div className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 min-h-[42rem] mt-[-4px] ">
          {paginatedItems.map((item) => (
            <Link to={`/spaces/${item.id}`} key={item.id} className="transform transition-transform duration-200 hover:scale-105 items-center justify-center flex">
              <SpaceCard key={item.id} space={item} />
            </Link>
          ))}
        </div>
        <div className="flex justify-center items-center mt-8">
          <div
            className="cursor-pointer p-2 rounded-full hover:bg-gray-200 transition-colors duration-200"
            onClick={() => handlePageChange("prev")}
          >
            <GoChevronLeft size={32} />
          </div>
          <p className="text-xl font-semibold mx-6">page {page}</p>
          <div
            className="cursor-pointer p-2 rounded-full hover:bg-gray-200 transition-colors duration-200"
            onClick={() => handlePageChange("next")}
          >
            <GoChevronRight size={32} />
          </div>
        </div>
      </div>
    </div>
  );
};
