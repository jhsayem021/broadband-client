import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const WelcomePage = () => {
    return (
        <div className='w-4/5 mx-auto text-center my-32'>
            <h1 className="text-4xl text-indigo-400">Welcome to the BroadBand Network</h1>
            <div className='mt-44'>
            <NavLink to="/dashboard/home" className="p-3 bg-slate-200 text-black rounded-lg"> Dashboard </NavLink>
            </div>
        </div>
    );
};

export default WelcomePage;