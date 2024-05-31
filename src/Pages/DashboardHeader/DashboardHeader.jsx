import React, { useContext } from 'react';
import { AuthContext } from '../../providers/AuthProvider';
import { Link, useNavigate } from 'react-router-dom';

const DashboardHeader = () => {
        const {user, logOut} =  useContext(AuthContext);
        const navigate = useNavigate();
        console.log(user);
        const handleLogOut = () => {
            logOut()
                .then(() => {
                    navigate("/");
                 })
                .catch(error => console.log(error));
        }

    return (
        <div className="navbar bg-base-100">
            <div className="flex-1">
                <h1 className='text-xl font-bold text-[#102156]' >BroadBand Ltd</h1>
            </div>
            <div className="flex-none gap-2">
                <div className="form-control">
                    <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto" />
                </div>
                {
                   user && <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                            <img alt="Tailwind CSS Navbar component" src={user?.photoURL} />
                        </div>
                    </div>
                    <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                        <li>
                            <a className="justify-between">
                                Profile
                                <span className="badge">New</span>
                            </a>
                        </li>
                        <li><a>Settings</a></li>
                        <li><button onClick={handleLogOut} className="btn  btn-ghost text-[14px]  inline">Log Out</button></li>
                    </ul>
                </div>
                }

            </div>
        </div>
    );
};

export default DashboardHeader;