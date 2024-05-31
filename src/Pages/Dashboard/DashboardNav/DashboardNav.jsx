import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaHome } from "react-icons/fa";
import { IoPersonAddSharp } from "react-icons/io5";
import { GiExpense } from "react-icons/gi";
const DashboardNav = () => {
    return (
        <ul className=" p-4  min-h-screen  text-white bg-[#102156]  ">

                    {
                         <>
                            <li className='text-[16px] flex items-center gap-x-1'> <FaHome /><NavLink to="/dashboard/home">  Home</NavLink></li>
                            <li className='text-[16px] flex items-center gap-x-1'> <IoPersonAddSharp /><NavLink to="/dashboard/customers">Add Customer</NavLink></li>
                            <li className='text-[16px] flex items-center gap-x-1'> <IoPersonAddSharp /><NavLink to="/dashboard/users">All Users</NavLink></li>
                            <li className='text-[16px] flex items-center gap-x-1'> <GiExpense /><NavLink to="/dashboard/expense">Manage Expense</NavLink></li>
                            <li className='text-[16px] flex items-center gap-x-1'> <GiExpense /><NavLink to="/dashboard/income">All Income</NavLink></li>
                            <li className='text-[16px] flex items-center gap-x-1'> <GiExpense /><NavLink to="/dashboard/allexpense">All Expense</NavLink></li>
                                                  
                           
                            
                        </> 
                    }
                </ul>
    );
};

export default DashboardNav;