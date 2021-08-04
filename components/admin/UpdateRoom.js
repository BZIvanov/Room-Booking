import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import {
  updateRoomAction,
  getRoom,
  clearErrors,
} from '../../store/actions/rooms';
import { UPDATE_ROOM_RESET } from '../../store/constants/rooms';
import ButtonLoader from '../layout/ButtonLoader';
import Loader from '../layout/Loader';
import { MAX_GUESTS, ROOM_TYPES } from '../../constants';

const UpdateRoom = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState('');
  const [address, setAddress] = useState('');
  const [category, setCategory] = useState(ROOM_TYPES[2]);
  const [guestsCapacity, setGuestsCapacity] = useState(2);
  const [bedsNumber, setBedsNumber] = useState(2);
  const [internet, setInternet] = useState(false);
  const [breakfast, setBreakfast] = useState(false);
  const [airConditioner, setAirConditioner] = useState(false);
  const [petsAllowed, setPetsAllowed] = useState(false);
  const [roomCleaning, setRoomCleaning] = useState(false);
  const [images, setImages] = useState([]);
  const [prevImages, setPrevImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  const {
    loading: roomDetailsLoading,
    room,
    error: roomDetailsError,
  } = useSelector((state) => state.roomDetails);
  const { loading, isUpdated, error } = useSelector(
    (state) => state.updateRoom
  );

  const { id } = router.query;

  useEffect(() => {
    if (room && room._id !== id) {
      dispatch(getRoom('', id));
    } else {
      setName(room.name);
      setPrice(room.pricePerNight);
      setDescription(room.description);
      setAddress(room.address);
      setCategory(room.category);
      setGuestsCapacity(room.guestsCapacity);
      setBedsNumber(room.bedsNumber);
      setInternet(room.internet);
      setBreakfast(room.breakfast);
      setAirConditioner(room.airConditioner);
      setPetsAllowed(room.petsAllowed);
      setRoomCleaning(room.roomCleaning);
      setBreakfast(room.breakfast);
      setPrevImages(room.images);
    }
    if (isUpdated) {
      router.push('/admin/rooms');
      dispatch({ type: UPDATE_ROOM_RESET });
    }
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    if (roomDetailsError) {
      toast.error(roomDetailsError);
      dispatch(clearErrors());
    }
  }, [dispatch, isUpdated, error, roomDetailsError, room, id]);

  const handleChange = ({ target }) => {
    const files = Array.from(target.files);

    setPrevImages([]);
    setImages([]);
    setImagesPreview([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImages((prev) => [...prev, reader.result]);
          setImagesPreview((prev) => [...prev, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const roomData = {
      name,
      pricePerNight: price,
      description,
      address,
      category,
      guestsCapacity,
      bedsNumber,
      internet,
      breakfast,
      airConditioner,
      petsAllowed,
      roomCleaning,
    };

    if (images.length !== 0) {
      roomData.images = images;
    }

    console.log(roomData);

    dispatch(updateRoomAction(room._id, roomData));
  };

  return (
    <>
      {roomDetailsLoading ? (
        <Loader />
      ) : (
        <div className='container container-fluid'>
          <div className='row wrapper'>
            <div className='col-10 col-lg-8'>
              <form
                onSubmit={handleSubmit}
                className='shadow-lg'
                encType='multipart/form-data'
              >
                <h1 className='mb-4'>Update Room</h1>
                <div className='form-group'>
                  <label htmlFor='name_field'>Name</label>
                  <input
                    type='text'
                    id='name_field'
                    className='form-control'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div className='form-group'>
                  <label htmlFor='price_field'>Price</label>
                  <input
                    type='text'
                    id='price_field'
                    className='form-control'
                    value={price}
                    onChange={(e) => setPrice(+e.target.value)}
                    required
                  />
                </div>
                <div className='form-group'>
                  <label htmlFor='description_field'>Description</label>
                  <textarea
                    className='form-control'
                    id='description_field'
                    rows='8'
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                  ></textarea>
                </div>
                <div className='form-group'>
                  <label htmlFor='address_field'>Address</label>
                  <input
                    type='text'
                    id='address_field'
                    className='form-control'
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                  />
                </div>
                <div className='form-group'>
                  <label htmlFor='category_field'>Category</label>
                  <select
                    className='form-control'
                    id='category_field'
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
                <div className='form-group'>
                  <label htmlFor='category_field'>Guest Capacity</label>
                  <select
                    className='form-control'
                    id='guestCapacity_field'
                    value={guestsCapacity}
                    onChange={(e) => setGuestsCapacity(+e.target.value)}
                  >
                    {new Array(MAX_GUESTS).fill(0).map((_, idx) => (
                      <option key={idx} value={idx + 1}>
                        {idx + 1}
                      </option>
                    ))}
                  </select>
                </div>
                <div className='form-group'>
                  <label htmlFor='category_field'>Number of Beds</label>
                  <select
                    className='form-control'
                    id='numOfBeds_field'
                    value={bedsNumber}
                    onChange={(e) => setBedsNumber(+e.target.value)}
                  >
                    {new Array(MAX_GUESTS).fill(0).map((_, idx) => (
                      <option key={idx} value={idx + 1}>
                        {idx + 1}
                      </option>
                    ))}
                  </select>
                </div>
                <label className='mb-3'>Room Features</label>
                <div className='form-check'>
                  <input
                    className='form-check-input'
                    type='checkbox'
                    id='internet_checkbox'
                    checked={internet}
                    value={internet}
                    onChange={(e) => setInternet(e.target.checked)}
                  />
                  <label
                    className='form-check-label'
                    htmlFor='internet_checkbox'
                  >
                    Internet
                  </label>
                </div>
                <div className='form-check'>
                  <input
                    className='form-check-input'
                    type='checkbox'
                    id='breakfast_checkbox'
                    checked={breakfast}
                    value={breakfast}
                    onChange={(e) => setBreakfast(e.target.checked)}
                  />
                  <label
                    className='form-check-label'
                    htmlFor='breakfast_checkbox'
                  >
                    Breakfast
                  </label>
                </div>
                <div className='form-check'>
                  <input
                    className='form-check-input'
                    type='checkbox'
                    id='airConditioned_checkbox'
                    checked={airConditioner}
                    value={airConditioner}
                    onChange={(e) => setAirConditioner(e.target.checked)}
                  />
                  <label
                    className='form-check-label'
                    htmlFor='airConditioned_checkbox'
                  >
                    Air Conditioner
                  </label>
                </div>
                <div className='form-check'>
                  <input
                    className='form-check-input'
                    type='checkbox'
                    id='petsAllowed_checkbox'
                    checked={petsAllowed}
                    value={petsAllowed}
                    onChange={(e) => setPetsAllowed(e.target.checked)}
                  />
                  <label
                    className='form-check-label'
                    htmlFor='petsAllowed_checkbox'
                  >
                    Pets Allowed
                  </label>
                </div>
                <div className='form-check'>
                  <input
                    className='form-check-input'
                    type='checkbox'
                    id='roomCleaning_checkbox'
                    checked={roomCleaning}
                    value={roomCleaning}
                    onChange={(e) => setRoomCleaning(e.target.checked)}
                  />
                  <label
                    className='form-check-label'
                    htmlFor='roomCleaning_checkbox'
                  >
                    Room Cleaning
                  </label>
                </div>
                <div className='form-group mt-4'>
                  <label>Images</label>
                  <div className='custom-file'>
                    <input
                      type='file'
                      name='room_images'
                      className='custom-file-input'
                      id='customFile'
                      multiple
                      onChange={handleChange}
                    />
                    <label className='custom-file-label' htmlFor='customFile'>
                      Choose Images
                    </label>
                  </div>
                  {imagesPreview.map((img) => (
                    <img
                      src={img}
                      key={img}
                      alt='Images Preview'
                      className='mt-3 mr-2'
                      width='55'
                      height='52'
                    />
                  ))}
                  {prevImages &&
                    prevImages.map((img) => (
                      <img
                        src={img.url}
                        key={img.publicId}
                        alt='Images Preview'
                        className='mt-3 mr-2'
                        width='55'
                        height='52'
                      />
                    ))}
                </div>
                <button
                  type='submit'
                  className='btn btn-block new-room-btn py-3'
                  disabled={loading}
                >
                  {loading ? <ButtonLoader /> : 'UPDATE'}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UpdateRoom;
