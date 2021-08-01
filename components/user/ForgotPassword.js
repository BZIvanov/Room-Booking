import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { forgotPasswordAction, clearErrors } from '../../store/actions/users';
import ButtonLoader from '../layout/ButtonLoader';

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');

  const { error, loading, message } = useSelector(
    (state) => state.forgotPassword
  );

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors);
    }

    if (message) {
      toast.success(message);
    }
  }, [message, error, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = { email };
    dispatch(forgotPasswordAction(userData));
  };

  return (
    <div className='row wrapper'>
      <div className='col-10 col-lg-5'>
        <form className='shadow-lg' onSubmit={handleSubmit}>
          <h1 className='mb-3'>Forgot Password</h1>
          <div className='form-group'>
            <label htmlFor='email_field'>Email</label>
            <input
              type='email'
              id='email_field'
              className='form-control'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <button
            id='forgot_password_button'
            type='submit'
            className='btn btn-block py-3'
            disabled={loading}
          >
            {loading ? <ButtonLoader /> : 'Send Email'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
