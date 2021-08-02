import React, { useEffect } from 'react';
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import Pagination from 'react-js-pagination';
import { toast } from 'react-toastify';
import Room from './rooms/Room';
import { clearErrors } from '../store/actions/rooms';

const Home = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const { rooms, totalCount, filteredCount, perPage, error } = useSelector(
    (state) => state.rooms
  );

  useEffect(() => {
    toast.error(error);
    dispatch(clearErrors);
  }, []);

  let { page = 1, location } = router.query;
  page = +page;

  const handlePagination = (page) => {
    router.push(`?page=${page}`);
  };

  let count = totalCount;
  if (location) {
    count = filteredCount;
  }

  return (
    <>
      <section id='rooms' className='container mt-5'>
        <h2 className='mb-3 ml-2 stays-heading'>
          {location ? `Rooms in ${location}` : 'All rooms'}
        </h2>

        <Link href='/search'>
          <a className='ml-2 back-to-search'>
            <i className='fa fa-arrow-left'></i> Back to Search
          </a>
        </Link>
        <div className='row'>
          {rooms && rooms.length === 0 ? (
            <div className='alert alert-danger mt-5 w-100'>
              <b>No rooms found</b>
            </div>
          ) : (
            rooms && rooms.map((room) => <Room key={room._id} room={room} />)
          )}
        </div>
      </section>

      {count > perPage && (
        <div className='d-flex justify-content-center mt-5'>
          <Pagination
            activePage={page}
            itemsCountPerPage={3}
            totalItemsCount={totalCount}
            onChange={handlePagination}
            nextPageText='Next'
            prevPageText='Previous'
            firstPageText='First'
            lastPageText='Last'
            itemClass='page-item'
            linkClass='page-link'
          />
        </div>
      )}
    </>
  );
};

export default Home;
