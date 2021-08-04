import React, { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import { MDBDataTable } from 'mdbreact';
import { toast } from 'react-toastify';
import { getAllUsersAction, clearErrors } from '../../store/actions/users';
import Loader from '../layout/Loader';

const AllUsers = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const { loading, users, error } = useSelector((state) => state.allUsers);

  useEffect(() => {
    dispatch(getAllUsersAction());

    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, error]);

  const setUsers = () => {
    const data = {
      columns: [
        {
          label: 'User ID',
          field: 'id',
          sort: 'asc',
        },
        {
          label: 'Name',
          field: 'name',
          sort: 'asc',
        },
        {
          label: 'Email',
          field: 'email',
          sort: 'asc',
        },
        {
          label: 'Role',
          field: 'role',
          sort: 'asc',
        },
        {
          label: 'Actions',
          field: 'actions',
          sort: 'asc',
        },
      ],
      rows: [],
    };

    users &&
      users.forEach((user) => {
        data.rows.push({
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          actions: (
            <>
              <Link href={`/admin/users/${user._id}`}>
                <a className='btn btn-primary'>
                  <i className='fa fa-pencil'></i>
                </a>
              </Link>
              <button
                className='btn btn-danger mx-2'
                onClick={() => handleDelete(user._id)}
              >
                <i className='fa fa-trash'></i>
              </button>
            </>
          ),
        });
      });

    return data;
  };

  const handleDelete = (id) => {
    // dispatch(deleteRoomAction(id));
  };

  return (
    <div className='container container-fluid'>
      {loading ? (
        <Loader />
      ) : (
        <>
          <h1 className='my-5'>{`${users && users.length} Users`}</h1>

          <MDBDataTable
            data={setUsers()}
            className='px-3'
            bordered
            striped
            hover
          />
        </>
      )}
    </div>
  );
};

export default AllUsers;
