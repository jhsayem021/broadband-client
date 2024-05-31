import React, { useState } from 'react';
import UpdatePaymentModal from '../../Pages/Dashboard/Home/UpdatePaymentModal';

const DataTable = ({ customers, refetch }) => {
    const [updatingCustomer, setUpdatingCustomer] = useState(null);
    console.log(customers);

    return (
        <div className='md:w-5/6 w-full mx-auto bg-gray-800 text-white rounded-2xl '>

            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead className='text-white text-[16px]'>
                        <tr>
                            <th>
                                #
                            </th>
                            <th>Name</th>
                            <th>NID number</th>
                            <th>Address</th>
                            <th>Email</th>
                            <th>Mobile</th>
                            <th>Last Billing Date</th>
                            <th>Payment</th>
                            <th>bill status</th>
                            <th></th>

                        </tr>
                    </thead>
                    <tbody className='text-[16px]'>
                        {
                            customers.map((customer, i) => <tr className=' hover:bg-slate-600'
                                key={customer._id}
                            >
                                <th>
                                    {i}
                                </th>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img src={customer?.image} alt="" />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold">{customer?.name}</div>

                                        </div>
                                    </div>
                                </td>
                                <td>{customer?.nid}</td>
                                <td>{customer?.address}</td>
                                <td>{customer?.email}</td>
                                <td>{customer?.phone}</td>
                                <td>{customer?.date ? (customer?.date) : <p className='text-primary' >New customer</p>}</td>
                                <td>{customer?.amount ? ((customer.status === 'Paid') ? customer?.amount : <p  >Please pay {customer?.amount} Taka</p>) : <p className='text-primary' >New customer</p>}</td>
                                <td  >{customer?.status
                                    ? ((customer.status === 'Paid') ? <p className='text-green-500'>{customer?.status}</p> :
                                        <p className='text-rose-500'>{customer?.status}</p>)
                                    : <p className='text-rose-500' >Unpaid</p>
                                }</td>

<td>
                                        {
                                            !(customer?.status === 'Paid') && <label onClick={() => setUpdatingCustomer(customer)} htmlFor="update-modal" className="btn btn-xs btn-error ">update Payment</label>
                                        }
                                    </td>

                            </tr>)
                        }

                    </tbody>


                </table>
                {
                    updatingCustomer && <UpdatePaymentModal
                        setUpdatingCustomer={setUpdatingCustomer}
                        updatingCustomer={updatingCustomer}
                        refetch={refetch}
                    ></UpdatePaymentModal>
                }
            </div>
        </div>
    );
};

export default DataTable;