import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import {
  getUserAction,
  adminUpdateUserAction,
  clearErrors,
} from '../../store/actions/users';
import { UPDATE_USER_RESET } from '../../store/constants/users';
import Loader from '../layout/Loader';
import { USER_ROLES } from '../../constants';

const UpdateUser = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState(USER_ROLES[0]);

  const { isUpdated, error } = useSelector((state) => state.user);
  const { user, loading } = useSelector((state) => state.updateUser);

  const { id } = router.query;

  useEffect(() => {
    if (user && user._id !== id) {
      dispatch(getUserAction(id));
    } else {
      setName(user.name);
      setEmail(user.email);
      setRole(user.role);
    }

    if (isUpdated) {
      router.push('/admin/users');
      dispatch({ type: UPDATE_USER_RESET });
    }

    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, id, user, isUpdated, error]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const userData = { name, email, role };
    dispatch(adminUpdateUserAction(user._id, userData));
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className='container container-fluid'>
          <div className='row wrapper'>
            <div className='col-10 col-lg-5'>
              <form className='shadow-lg' onSubmit={handleSubmit}>
                <h1 className='mt-2 mb-5'>Update User</h1>

                <div className='form-group'>
                  <label htmlFor='name_field'>Name</label>
                  <input
                    type='name'
                    id='name_field'
                    className='form-control'
                    name='name'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div className='form-group'>
                  <label htmlFor='email_field'>Email</label>
                  <input
                    type='email'
                    id='email_field'
                    className='form-control'
                    name='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className='form-group'>
                  <label htmlFor='role_field'>Role</label>

                  <select
                    id='role_field'
                    className='form-control'
                    name='role'
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                  >
                    {USER_ROLES.map((role) => (
                      <option key={role} value={role}>
                        {role}
                      </option>
                    ))}
                  </select>
                </div>

                <button
                  type='submit'
                  className='btn update-btn btn-block mt-4 mb-3'
                >
                  Update
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UpdateUser;
