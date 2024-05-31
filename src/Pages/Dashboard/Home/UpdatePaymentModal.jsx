import React from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const UpdatePaymentModal = ({ setUpdatingCustomer, updatingCustomer, refetch }) => {
    const { name, phone, _id } = updatingCustomer;
    const paymentMethod = ['Cash', 'Bank Deposit', 'Bkash']
    const [axiosSecure] = useAxiosSecure();
    const navigate = useNavigate();
    const handleForm = e => {
        e.preventDefault();
        const form = e.target;
        console.log(form);
        const name = form.name.value;
        const phone = form.phone.value;
        const amount = form.amount.value;
        const payment = form.payment.value;
        const date = form.date.value;
        var today = new Date();
        const entryDate = today.toString();
        const status = null;
        let bankTransferStatus;
        (payment === "Bank Deposit") ? bankTransferStatus = true : bankTransferStatus =false
        const updateCustomerPayment = {
            id: _id,
            name,
            phone,
            amount,
            payment,
            date,
            status: "paid",
         
        }
        const singleCustomerPayment = {
            spid: _id,
            name,
            amount,
            payment,
            date,
            entryDate,
            bankTransferStatus,
        }
        console.log(updateCustomerPayment)

            axiosSecure.put(`/updatepayments`,updateCustomerPayment)
        .then(res => {
            console.log(res.data.acknowledged);
            if (res.data.acknowledged) {              
               
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: `Payment update successful`,
                    showConfirmButton: false,
                    timer: 1500
                  })
                  setUpdatingCustomer(null);
            }
            refetch();
            navigate("/dashboard/home");
        })

            axiosSecure.post(`/updatepaymentsdate`,singleCustomerPayment)
        .then(res => {
            if (res.data.acknowledged) {              
               
                  setUpdatingCustomer(null);
                  refetch(); 
                  navigate("/dashboard/home");
            }
          
        })
       
    }

    return (
        <>
            <input type="checkbox" id="update-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <label htmlFor="update-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h3 className="text-lg font-bold mb-10 text-black"> Please Provide payment data carefully </h3>
                    <form onSubmit={handleForm} className='grid gap-4 grid-cols-1' >
                        <input name="name" value={name} disabled type="text" placeholder="name" className="input input-bordered w-full" />
                        <input name="phone" value={phone} disabled type="text" placeholder="phone" className="input input-bordered w-full" />
                        <input name="amount" required type="text" placeholder="Amount" className="input input-bordered w-full" />
                        <label className="label"> <span className="label-text">Payment Method</span></label>
                        <select
                            className="select select-bordered w-full max-w-xs text-black" name="payment" >
     
                            {
                                paymentMethod.map((payment, i) => <option
                                className='text-black'
                                
                                    key={i}
                                    value={payment}
                                    required
                                >{payment}</option>)
                            }
                            
                        </select>
                        <label className='text-black ms-1'>Last billing date</label>
                        <input required type="datetime-local" name="date" placeholder="date" min={new Date().toISOString().split('T')[0]} className="input input-bordered w-full text-black" />
                        <input type="submit" value="Submit"  className="btn bg-[#102156] text-white w-full" />
                    </form>
                </div>
            </div>
        </>
    );
};

export default UpdatePaymentModal;