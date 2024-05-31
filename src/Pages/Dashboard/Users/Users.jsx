import React from 'react';
import useAllUsers from '../../../hooks/useAllUsers';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const Users = () => {
    const [users, refetch] = useAllUsers();
    const [axiosSecure] = useAxiosSecure();
    console.log(users)

    const handleMakeAdmin = user =>{
        console.log(user)
        axiosSecure.put(`/users/admin/${user._id}`)
        .then(res => {
            // console.log('deleted res', res.data);
            // console.log('deleted res', res.data.deletedCount);

            if (res.data.modifiedCount) {
                
                refetch();
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: `${user.name} is an Admin Now!`,
                    showConfirmButton: false,
                    timer: 1500
                  })
            }
            
        })
        // fetch(`http://localhost:5000/users/admin/${user._id}`, {
        //     method: 'PUT'
        // })
        // .then(res => res.json())
        // .then(data => {
        //     console.log(data)
        //     if(data.modifiedCount){
        //         refetch();
        //         Swal.fire({
        //             position: 'top-end',
        //             icon: 'success',
        //             title: `${user.name} is an Admin Now!`,
        //             showConfirmButton: false,
        //             timer: 1500
        //           })
        //     }
        // })
    }

    

    return (
        <div>
            <h1 className="text-2xl text-center mb-5 font-bold">Website User</h1>
            <div className='md:w-5/6 w-full mx-auto bg-gray-800 text-white rounded-2xl '>
                <div className="overflow-x-auto">
                    <table className="table">

                        <thead className='text-white text-[16px]'>
                            <tr>
                                <th>
                                    #
                                </th>
                                <th></th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Action</th>


                            </tr>
                        </thead>
                        <tbody className='text-[16px]'>
                            {
                                users.map((user, i) => <tr className=' hover:bg-slate-600'
                                    key={user._id}
                                >
                                    <th>{i}</th>
                                    <th>
                                    <div className="avatar">
                          <div className="mask mask-squircle w-12 h-12">
                            <img src={user.photoUrl} alt="" />
                          </div>
                        </div>
                                    </th>
                                    <td className="font-bold">{user?.name}</td>
                                    <td>{user?.email}</td>
                                    <td>{(user?.role) === "admin" ? user?.role : 'Manager'}</td>
                                    <td>
                                        {(user?.role) === "admin" ? '' : <button onClick={() => handleMakeAdmin(user)} className='px-3 py-2 bg-slate-900 rounded-lg'>Make Admin</button>}
                                    </td>


                                </tr>)
                            }

                        </tbody>


                    </table>
                </div>
            </div>
        </div>
    );
};

export default Users;