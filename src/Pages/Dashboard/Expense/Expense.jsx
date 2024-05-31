import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import toast from 'react-hot-toast';
import useExpense from '../../../hooks/useExpense';
const Expense = () => {
    const [expense, refetch] = useExpense();
    const [axiosSecure] = useAxiosSecure()
    const paymentMethod = ['Cash', 'Bank Deposit', 'Bkash']
    console.log(expense);
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const handleAddExpense = (data) => {
    
        const expenseData = {
            expense: data.expense,
            person: data.person,
            payment: data.payment,
            amount: data.cost,
            entryDate: data.date,
        }
        axiosSecure.post('/expense', expenseData)
        .then(res => {
            console.log(res.data);
         
                toast.success(`Expense added successful`);
               refetch();
               reset();
               
        })

    }
    return (
        <div>
             <div className=' w-5/6 mx-auto '>
                
                <div className='lg:grid grid-cols-3 gap-4  items-center'>
                    <div className=' mx-auto  lg:mb-0 mb-5'> 
                    <h1 className='text-2xl text-center font-bold mb-8'>Add Expense</h1>
                     <form onSubmit={handleSubmit(handleAddExpense)}>
                <div className="form-control w-full max-w-xs">
                    <label className="label"> <span className="label-text">Expense For</span></label>
                    <input type="text" {...register("expense", {
                        required: "expense is Required"
                    })} className="input input-bordered w-full max-w-xs" />
                    {/* {errors.name && <p className='text-red-500'>{errors.name.message}</p>} */}
                </div>
                <div className="form-control w-full max-w-xs">
                    <label className="label"> <span className="label-text">Person</span></label>
                    <input type="text" {...register("person", {
                        required: true
                    })} className="input input-bordered w-full max-w-xs" />
                    {/* {errors.email && <p className='text-red-500'>{errors.email.message}</p>} */}
                </div>
                <div className="form-control w-full max-w-xs">
                    <label className="label"> <span className="label-text">Expense from</span></label>
                    {/* <input type="text" {...register("person", {
                        required: true
                    })} className="input input-bordered w-full max-w-xs" /> */}
                    <select
                            className="select select-bordered w-full max-w-xs text-black" {...register("payment", {
                              required: true
                          })}  >
     
                            {
                                paymentMethod.map((payment, i) => <option
                                className='text-black'
                                
                                    key={i}
                                    value={payment}
                                    required
                                >{payment}</option>)
                            }
                            
                        </select>
                </div>
                <div className="form-control w-full max-w-xs">
                    <label className="label"> <span className="label-text">Expense cost in BDT</span></label>
                    <input type="text" {...register("cost", {
                        required: true
                    })} className="input input-bordered w-full max-w-xs" />
                    {/* {errors.email && <p className='text-red-500'>{errors.email.message}</p>} */}
                </div>
                <div className="form-control w-full max-w-xs">
                    <label className="label"> <span className="label-text">Date</span></label>
                    <input type="datetime-local"  {...register("date", {
                        required: true
                    })} className="input input-bordered w-full max-w-xs" />
                    {/* {errors.email && <p className='text-red-500'>{errors.email.message}</p>} */}
                </div>
            
                <input className='btn bg-[#102156] text-[#FFFFFF] w-full mt-4' value="Add Expense" type="submit" />

            </form>
</div>
                    <div className="overflow-x-auto col-span-2">
           
                    <table className="table bg-slate-700">
              {/* head */}
              <thead className='text-white text-[16px]'>
                <tr>
                    <th>#</th>
                  <th>Expense For</th>
                  <th>Person</th>
                  <th>Cost</th>
                  <th>Date</th>
                 

                </tr>
              </thead>
              <tbody className='text-[16px]'>
                {
              
                expense.map((exp, i) => <tr className=' hover:bg-slate-600 text-white'
                  key={exp._id}
                >
                  <th>
                    {i}
                  </th>
                  <td>
                    <div className="flex items-center gap-3">

                      <div>
                        <div className="font-bold">{exp?.expense}</div>

                      </div>
                    </div>
                  </td>
                  <td>{exp?.person}</td>
                  <td>{exp?.amount}</td>
                  <td>{exp?.entryDate}</td>
                 
              
                </tr>)
              
                }
                     <tr>
                    <td></td>
                    <td></td>
                    <td className='text-white text-end' >Total =</td>
                
                    <td className='text-white'> {expense?.reduce((sum, item) => parseFloat(item.amount) + sum, 0)}</td>
                  </tr>

              </tbody>


            </table>
                    </div>

                </div>
             </div>
        </div>
    );
};

export default Expense;