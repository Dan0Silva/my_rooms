import { use, useEffect, useState } from 'react';
import Header from '../../components/Header';
import SpaceCard from '../../components/SpaceCard';

import { GoChevronRight, GoChevronLeft } from 'react-icons/go';
import { getSpaces } from '../../services/api/spaces';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

export default () => {
  const [page, setPage] = useState(1);

  const [items, setItems] = useState<Space[]>([]);
  const [paginatedItems, setPaginatedItems] = useState<Space[]>([]);

  const spacesPerPage = 10;

  useEffect(() => {
    getSpaces(setItems);
  }, []);

  useEffect(() => {
    const indexOfLastItem = page * spacesPerPage;
    const indexOfFirstItem = indexOfLastItem - spacesPerPage;
    setPaginatedItems(items.slice(indexOfFirstItem, indexOfLastItem));
  }, [page, items]);

  const handlePageChange = (direction: "next" | "prev") => {
    if (direction === "next" && page * spacesPerPage < items.length) {
      setPage(page + 1);
    } else if (direction === "prev" && page > 1) {
      setPage(page - 1);
    }
  };

  return (
    <div className='bg-stone-100 h-screen'>
      <Header />
      <div className="grid h-[42rem] grid-cols-5 gap-y-4 w-full mt-12 px-52 justify-items-center">
        {paginatedItems.map((item: any) => (
          <Link to={`/spaces/${item.id}`}>
            <SpaceCard key={item.id} space={item} />
          </Link>
        ))}
      </div>
      <div className="w-full h-16 flex justify-center pt-4">
        <div
          className="cursor-pointer"
          onClick={() => {
            handlePageChange("prev");
          }}
        >
          <GoChevronLeft size={32} />
        </div>
        <p className="text-xl font-semibold mx-6">page {page}</p>
        <div
          className="cursor-pointer"
          onClick={() => {
            handlePageChange("next");
          }}
        >
          <GoChevronRight size={32} />
        </div>
      </div>
    </div>
  );
};
