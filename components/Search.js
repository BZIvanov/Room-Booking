import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { MAX_GUESTS, ROOM_TYPES } from '../constants';

const Search = () => {
  const [location, setLocation] = useState('');
  const [guests, setGuests] = useState('1');
  const [category, setCategory] = useState(ROOM_TYPES[0]);
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (location.trim()) {
      router.push(
        `/?location=${location}&guests=${guests}&category=${category}`
      );
    } else {
      router.push('/');
    }
  };

  return (
    <div className='container container-fluid'>
      <div className='row wrapper'>
        <div className='col-10 col-lg-5'>
          <form className='shadow-lg' onSubmit={handleSubmit}>
            <h2 className='mb-3'>Search Rooms</h2>
            <div className='form-group'>
              <label htmlFor='location_field'>Location</label>
              <input
                type='text'
                className='form-control'
                id='location_field'
                placeholder='Provide an address'
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>

            <div className='form-group'>
              <label htmlFor='guest_field'>No. of Guests</label>
              <select
                className='form-control'
                id='guest_field'
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
              >
                {new Array(MAX_GUESTS).fill(0).map((_, idx) => (
                  <option key={idx} value={idx + 1}>
                    {idx + 1}
                  </option>
                ))}
              </select>
            </div>

            <div className='form-group'>
              <label htmlFor='room_type_field'>Room Type</label>
              <select
                className='form-control'
                id='room_type_field'
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                {ROOM_TYPES.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            <button type='submit' className='btn btn-block py-2'>
              Search
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Search;
