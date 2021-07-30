import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import Pagination from 'react-js-pagination';
import { toast } from 'react-toastify';
import Room from './rooms/Room';
import { clearErrors } from '../store/actions/rooms';

const Home = () => {
  const { rooms, roomsCount, error } = useSelector((state) => state.rooms);
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    toast.error(error);
    dispatch(clearErrors);
  }, []);

  let { page = 1 } = router.query;
  page = +page;

  const handlePagination = (page) => {
    router.push(`?page=${page}`);
  };

  return (
    <>
      <section id='rooms' className='container mt-5'>
        <h2 className='mb-3 ml-2 stays-heading'>Stays in New York</h2>

        <a href='#' className='ml-2 back-to-search'>
          <i className='fa fa-arrow-left'></i> Back to Search
        </a>
        <div className='row'>
          {rooms && rooms.length === 0 ? (
            <div className='alert alert-danger'>
              <b>No rooms found</b>
            </div>
          ) : (
            rooms && rooms.map((room) => <Room key={room._id} room={room} />)
          )}
        </div>
      </section>

      {roomsCount > 0 && (
        <div className='d-flex justify-content-center mt-5'>
          <Pagination
            activePage={page}
            itemsCountPerPage={3}
            totalItemsCount={roomsCount}
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
