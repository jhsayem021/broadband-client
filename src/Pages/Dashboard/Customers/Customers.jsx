import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { useQuery } from '@tanstack/react-query';
import useCustomers from '../../../hooks/useCustomers';

const Customers = () => {
  // const { user, loading } = useAuth();
// const [customers, refetch] = useCustomers();
const { refetch, data: customers = [] } = useQuery({
  queryKey: ['customers'],
  queryFn: async () => {
      const res = await axiosSecure.get(`/customers`)
      console.log('res from axios', res)
      return res.data;
  },
})
  const [axiosSecure] = useAxiosSecure()
  const [searchItem, setSearchItem] = useState('')
  const [filteredUsers, setFilteredUsers] = useState(customers)
  const handleInputChange = (e) => {
    const searchTerm = e.target.value;
    setSearchItem(searchTerm)

    const filteredItems = customers.filter((customer) =>
      customer?.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFilteredUsers(filteredItems);
  }

  const imageHostKey = import.meta.env.VITE_imgbb_key;
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const handleAddCustomer = (data) => {
    var today = new Date();
        const entryDate = today.toString();
    const formData = new FormData();
    const status = "unpaid"
    console.log(data.image[0])
    const image = data.image[0];
    if(image === undefined){
      const customer = {
        name: data.name,
        email: data.email,
        phone: data.phone,
        address: data.address,
        nid: data.nid,
        status: status,
        image: "",
        regDate: entryDate
      } 
      console.log(customer)
      axiosSecure.post('/customer', customer)
        .then(res => {
          console.log(res.data);

          if (res.data.acknowledged === true) {
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: `Successfully Added New Customer`,
              showConfirmButton: false,
              timer: 1500
            })
           

          } else {
            Swal.fire({
              position: 'center',
              icon: 'warning',
              title: `${res.data}`,
              showConfirmButton: false,
              timer: 1500

            })

          }
          refetch();
        })
    
      }
    else{
      formData.append('image', image);
      const url = `https://api.imgbb.com/1/upload?key=${imageHostKey}`
      fetch(url, {
        method: 'POST',
        body: formData
      })
        .then(res => res.json())
        .then(imageData => {
          if (imageData.success) {
            const customer = {
              name: data.name,
              email: data.email,
              phone: data.phone,
              address: data.address,
              nid: data.nid,
              status: status,
              image: imageData.data.url,
              regDate: entryDate

            }
            console.log(customer)
            axiosSecure.post('/customer', customer)
              .then(res => {
                console.log(res.data);
  
                if (res.data.acknowledged === true) {
                  Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: `Successfully Added New Customer`,
                    showConfirmButton: false,
                    timer: 1500
                  })
                  refetch();
  
                } else {
                  Swal.fire({
                    position: 'center',
                    icon: 'warning',
                    title: `${res.data}`,
                    showConfirmButton: false,
                    timer: 1500
  
                  })
  
                }
               
              
                
              })
          }
        })
    }
   
      
     reset();
  
    }




  return (
    <div>
      {/* <h1 className="3xl">All Customers page</h1>
            <h1 className="xl">Total customer: {customers.length} </h1> */}
        
      <div className=' w-5/6 mx-auto '>

        <div className='lg:grid grid-cols-3 gap-4 '>
          <div className=' mx-auto'>
            <h1 className='text-2xl text-center font-bold '>Add here new customer</h1>
            <form onSubmit={handleSubmit(handleAddCustomer)}>
              <div className="form-control w-full max-w-xs">
                <label className="label"> <span className="label-text">Name</span></label>
                <input type="text" {...register("name", {
                  
                })} className="input input-bordered w-full max-w-xs text-black" />
                {/* {errors.name && <p className='text-red-500'>{errors.name.message}</p>} */}
              </div>
              <div className="form-control w-full max-w-xs">
                <label className="label"> <span className="label-text">Email</span></label>
                <input type="email" {...register("email", {
                  required: false
                })} className="input input-bordered w-full max-w-xs text-black" />
                {/* {errors.email && <p className='text-red-500'>{errors.email.message}</p>} */}
              </div>
              <div className="form-control w-full max-w-xs">
                <label className="label"> <span className="label-text">Phone</span></label>
                <input type="phone" {...register("phone", {
                  required: true
                })} className="input input-bordered w-full max-w-xs text-black" />
                {/* {errors.email && <p className='text-red-500'>{errors.email.message}</p>} */}
              </div>
              <div className="form-control w-full max-w-xs">
                <label className="label"> <span className="label-text">Address</span></label>
                <input type="address" {...register("address", {
                  required: false
                })} className="input input-bordered w-full max-w-xs text-black" />
                {/* {errors.email && <p className='text-red-500'>{errors.email.message}</p>} */}
              </div>
              <div className="form-control w-full max-w-xs">
                <label className="label"> <span className="label-text">Nid number</span></label>
                <input type="nid" {...register("nid", {
                  required: false
                })} className="input input-bordered w-full max-w-xs text-black" />
                {/* {errors.email && <p className='text-red-500'>{errors.email.message}</p>} */}
              </div>


              <div className="form-control w-full max-w-xs">
                <label className="label"> <span className="label-text">Photo</span></label>
                <input type="file" {...register("image", {
                  
                })} className="input input-bordered w-full max-w-xs text-black" />
                {/* {errors.name && <p className='text-red-500'>{errors.name.message}</p>} */}
              </div>


              <input className='btn bg-[#102156] text-[#FFFFFF] w-full mt-4' value="Add Customer" type="submit" />

            </form>
          </div>
          <div className="col-span-2 ">
            <div className="form-control lg:mb-10  my-5">
              <input type="text" value={searchItem}
                onChange={handleInputChange}
                placeholder='Type to search customers'
                className="input input-bordered w-3/5 " />
            </div>

            <div className='overflow-x-auto '>
              <table className="table bg-slate-700">
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

                  </tr>
                </thead>
                <tbody className='text-[16px]'>
                  {
                    (searchItem === "") ? (
                      customers.map((customer, i) => <tr className=' hover:bg-slate-600 text-white'
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

                      </tr>)
                    ) : (filteredUsers.map((customer, i) => <tr className=' hover:bg-slate-600 text-white'
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

                    </tr>))
                  }


                </tbody>


              </table>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Customers;