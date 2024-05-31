import React, { useState } from 'react';
import useCustomersPayment from '../../../hooks/useCustomersPayment';
import useExpense from '../../../hooks/useExpense';
import UpdatePaymentModal from './UpdatePaymentModal';
// import Stats from './Stats/Stats';
import useCustomers from '../../../hooks/useCustomers';
import Swal from 'sweetalert2';
import { GrVmMaintenance } from "react-icons/gr";
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [CustomersPayment, refetch] = useCustomersPayment();
  const [updatingCustomer, setUpdatingCustomer] = useState(null);
  const [expense,] = useExpense();
  const [customers,] = useCustomers();
  // const [dueRevenue,setDueRevenue] = useState(true)
  const navigate = useNavigate();
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December",
  ];
  const [searchItem, setSearchItem] = useState('')
  const [filteredUsers, setFilteredUsers] = useState(customers)
  var today = new Date();
  let todayDate = new Date(today);
  const handleInputChange = (e) => {
    const searchTerm = e.target.value;
    setSearchItem(searchTerm)
    // console.log(searchItem);
    const filteredItems = customers.sort((a, b) => ((new Date(a.date)) - (new Date(b.date)))).filter((customer) =>
      ((customer?.name.toLowerCase().includes(searchTerm.toLowerCase())) || (customer?.phone.toLowerCase().includes(searchTerm.toLowerCase())) || (customer?.status.toLowerCase().includes(searchTerm.toLowerCase())))
    );

    setFilteredUsers(filteredItems);

  }
  // console.log(filteredUsers);
  const differanceTotalToday = (todayAmount, d, y, m, d1, y1, m1, data, totalbank, isSetTotalBank) => {
    let amnt = 0;
    data?.amount === "" ? amnt = 0 : amnt = data?.amount;

    if ((y1 === y) && (d1 === d) && (m1 === m)) {
      todayAmount = (parseFloat(amnt) + todayAmount);
      if (data?.bankTransferStatus === false) {
        totalbank.push(data)
      } else if (data?.bankTransferStatus === true) {
        isSetTotalBank = (parseFloat(amnt) + isSetTotalBank);
        // console.log("check")
        // console.log(isSetTotalBank)
      }
    }
    return [todayAmount, totalbank, isSetTotalBank];
  }
  const differanceTotalMonthly = (monthlyAmount, dueBankTransfer, d, y, m, d1, y1, m1, data) => {
    let amnt = 0;
    data?.amount === "" ? amnt = 0 : amnt = data?.amount;

    if (y1 === y) {

      if (m === m1) {

        monthlyAmount = (parseFloat(amnt) + monthlyAmount);
        if ((data?.bankTransferStatus === false) && (d !== d1)) {
          dueBankTransfer.push(data);
          // console.log(data)
        }

      }
    }

    return [monthlyAmount, dueBankTransfer];
  }

  const totalFunction = (array) => {
    let todayAmount = 0;
    let monthlyAmount = 0;
    let grandTotalToday = 0;
    let grandTotalMonthly = 0;
    let grandTotalBank = [];
    let setTotalBank = [];
    let dueBankTransfer = [];
    let dueBank = [];
    let isSetTotalBank = 0;
    let todayBankAmount = 0;

    array.map(data => {

      var date = new Date();
      let dateNow = new Date(date);
      var d1 = new Date(dateNow).getDate();
      var m1 = (new Date(dateNow).getMonth()) + 1;
      var y1 = new Date(dateNow).getFullYear();
      var d = new Date(data.entryDate).getDate();
      var m = (new Date(data.entryDate).getMonth()) + 1;
      var y = new Date(data.entryDate).getFullYear();
      if (y1 === y) {

        if ((m === m1)) {

          if (d === d1) {
            const [today, totalBank, bankAmount] = differanceTotalToday(todayAmount, d, y, m, d1, y1, m1, data, setTotalBank, isSetTotalBank);

            grandTotalToday = grandTotalToday + today;

            grandTotalBank = totalBank;
            todayBankAmount = todayBankAmount + bankAmount;
            // setDueRevenue(false)
          }
          const [monthly, dueTransferAmount] = differanceTotalMonthly(monthlyAmount, dueBankTransfer, d, y, m, d1, y1, m1, data);
          grandTotalMonthly = grandTotalMonthly + monthly;
          dueBank = dueTransferAmount;
          // console.log(dueBank);
        }

      }
    })
    // console.log(todayBankAmount)
    return [grandTotalToday, grandTotalMonthly, grandTotalBank, todayBankAmount, dueBank];
  }


  customers.map(customer => {
    var date1 = new Date();
    let dateNow = new Date(date1);
    var d1 = new Date(dateNow).getDate();
    var m1 = (new Date(dateNow).getMonth()) + 1;
    var y1 = new Date(dateNow).getFullYear();
    var d = new Date(customer.date).getDate();
    var m = (new Date(customer.date).getMonth()) + 1;
    var y = new Date(customer.date).getFullYear();
    if (customer.date === 'undefined') {
      customer.date = 'New Customer';

    }
    if (y === y1) {
      if (m === m1) {
        if (d >= 1 && d < d1) {
          customer.status = "unpaid"
        }
      } else if (m >= 1 && m <= m1) {
        customer.status = "unpaid"
      }
    } else if (y < y1) {
      customer.status = "unpaid"
    }

  })
  const [todayIncome, monthlyIncome, grandTotalBank, todayBankAmount, dueBank] = totalFunction(CustomersPayment);
  const [todayExpense, monthlyExpense,] = totalFunction(expense);
  console.log(dueBank);

  let bank = []
  let bkash = []
  let cash = []
  let dueBkash = []
  let dueCash = []
  const [axiosSecure] = useAxiosSecure();


  grandTotalBank.map(single => {
    if (single?.payment === "Bank Deposit")
      bank.push(single)
    else if (single?.payment === "Bkash")
      bkash.push(single)
    else if (single?.payment === "Cash")
      cash.push(single)
  })

  dueBank.map(single => {
    if (single?.payment === "Bkash")
      dueBkash.push(single)
    else if (single?.payment === "Cash")
      dueCash.push(single)
  })
  const totalDueBank = dueBank?.reduce((sum, item) => parseFloat(item.amount) + sum, 0);

  console.log(bkash)
  const netbank = bank?.reduce((sum, item) => parseFloat(item.amount) + sum, 0);
  const netcash = cash?.reduce((sum, item) => parseFloat(item.amount) + sum, 0);
  const netbkash = bkash?.reduce((sum, item) => parseFloat(item.amount) + sum, 0);
  const dueCashTransfer = dueCash?.reduce((sum, item) => parseFloat(item.amount) + sum, 0);
  const dueBkashTransfer = dueBkash?.reduce((sum, item) => parseFloat(item.amount) + sum, 0);


  const handleTransfer = (data) => {

    Swal.fire({
      title: 'Are you sure?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.isConfirmed) {

        console.log(data)
        axiosSecure.put(`/banktransfer`, data)
          .then(res => {
            console.log(res.data.acknowledged);
            if (res.data.acknowledged) {
              console.log("transferred")
            }
            else {
              console.log(res);
            }
          })
      }
      refetch();

    })

    navigate("/dashboard/home");
  }

  return (
    <div className=''>
      <div className='flex justify-center '>
        <div className=" grid md:grid-cols-4 grid-cols-1 md:gap-5  gap-1">
          <div className="stat shadow bg-slate-50 rounded-xl">
            <div className=" ms-3 stat-figure text-primary text-2xl">
              <GrVmMaintenance />
              {/* <button onClick={handleTransfer} className='text-sm bg-slate-300 p-1 rounded'>transfer to bank</button> */}
              <div className='dropdown dropdown-end'>
                <div tabIndex={0} className="text-sm p-1 bg-slate-100  rounded ">
                  <h1>Transfer</h1>
                </div>
                <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-64">
                  <li className='flex'>
                    <button className="justify-between">
                      Bkash Total
                      <span className="badge">{netbkash}</span>
                      {(netbkash === 0) ? "" : <span className='btn btn-xs text-secondary' onClick={() => handleTransfer(bkash)} > transfer</span>
                      }

                    </button>

                  </li>
                  <li>
                    <button className="justify-between">
                      Cash Total
                      <span className="badge">{netcash}</span>
                      {(netcash === 0) ? "" : <span className='btn btn-xs text-secondary' onClick={() => handleTransfer(cash)} > transfer</span>
                      }
                    </button>
                  </li>
                  {/* <li >
          <h1 className="justify-between "  >
            Bank Total
            <span className="badge">{bank}</span>
            <span   > transferred</span>
          </h1>
        </li> */}

                </ul>
              </div>
            </div>
            <div className="stat-title text-[16px]">Today Revenue</div>
            <div className="stat-value text-primary">৳ {todayIncome
            }</div>

          </div>
          {
            (dueBank.length === 0) ? "" : <div className="stat shadow bg-slate-50 rounded-xl">
              <div className=" ms-3 stat-figure text-primary text-2xl">
                <GrVmMaintenance />
                {/* <button onClick={handleTransfer} className='text-sm bg-slate-300 p-1 rounded'>transfer to bank</button> */}
                <div className='dropdown dropdown-end'>
                  <div tabIndex={0} className="text-sm p-1 bg-slate-100  rounded ">
                    <h1>Transfer</h1>
                  </div>
                  <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-64">
                    <li className='flex'>
                      <button className="justify-between">
                        Bkash Total
                        <span className="badge">{dueBkashTransfer}</span>
                        {(dueBkashTransfer === 0) ? "" : <span className='btn btn-xs text-secondary' onClick={() => handleTransfer(dueBkash)} > transfer</span>
                        }

                      </button>

                    </li>
                    <li>
                      <button className="justify-between">
                        Cash Total
                        <span className="badge">{dueCashTransfer}</span>
                        {(dueCashTransfer === 0) ? "" : <span className='btn btn-xs text-secondary' onClick={() => handleTransfer(dueCash)} > transfer</span>
                        }
                      </button>
                    </li>

                  </ul>
                </div>
              </div>
              <div className="stat-title text-[16px]">Due Revenue </div>
              <div className="stat-value text-primary">৳ {totalDueBank
              }</div>

            </div>
          }
          <div className="stat shadow bg-slate-50 rounded-xl">
            <div className=" ms-3 stat-figure text-primary text-2xl">
              <GrVmMaintenance />
            </div>
            <div className="stat-title text-[16px]">Monthly Revenue</div>
            <div className="stat-value text-primary"> ৳ {monthlyIncome}</div>
          </div>

          <div className="stat shadow bg-slate-50 rounded-xl">
            <div className=" ms-3 stat-figure text-primary text-2xl">
              <GrVmMaintenance />
            </div>
            <div className="stat-title text-[16px]">Today Expense</div>
            <div className="stat-value text-primary">৳ {todayExpense}</div>
          </div>

          <div className="stat shadow bg-slate-50 rounded-xl">
            <div className=" ms-3 stat-figure text-primary text-2xl">
              <GrVmMaintenance />
            </div>
            <div className="stat-title text-[16px]">Monthly Expense</div>
            <div className="stat-value text-primary"> ৳ {monthlyExpense}</div>
          </div>

          <div className="stat shadow bg-slate-50 rounded-xl">
            <div className=" ms-3 stat-figure text-primary text-2xl">
              <GrVmMaintenance />
            </div>
            <div className="stat-title text-[16px]">Total Today Revenue</div>
            <div className="stat-value text-primary"> ৳ {todayIncome - todayExpense}</div>
          </div>

          <div className="stat shadow bg-slate-50 rounded-xl">
            <div className=" ms-3 stat-figure text-primary text-2xl">
              <GrVmMaintenance />
            </div>
            <div className="stat-title text-[16px]">Total Monthly Revenue</div>
            <div className="stat-value text-primary"> ৳ {monthlyIncome - monthlyExpense}</div>
          </div>

          <div className="stat shadow bg-slate-50 rounded-xl">
            <div className=" ms-3 stat-figure text-primary text-2xl">
              <GrVmMaintenance />
            </div>
            <div className="stat-title text-[16px]">Today Bank Diposit</div>
            <div className="stat-value text-secondary"> ৳ {todayBankAmount} </div>
          </div>
        </div>
      </div>
      <div className='md:py-10 py-5 lg:mx-0 mx-2'>
        <h1 className='text-2xl lg:mx-8 mx-3 py-5 font-bold'>Customers Data</h1>
        <div className='lg:mx-8 mx-3 '>
          <div className=" lg:mb-6  my-5 flex justify-end">
            <input type="text" value={searchItem}
              onChange={handleInputChange}
              placeholder='Type to search customers'
              className="input input-bordered w-64 " />
          </div>
          <div className=' bg-gray-800 text-white rounded-2xl '>

            <div className="overflow-x-auto">
              <table className="table text-center">
                <thead className='text-white text-[16px]'>
                  <tr>
                    <th>
                      #
                    </th>
                    <th>Name</th>
                    <th>Mobile</th>
                    <th>Last Billing Date</th>
                    <th>Amount</th>
                    <th>bill status</th>
                    <th>Payment Method</th>
                    <th></th>

                  </tr>
                </thead>
                <tbody className='text-[16px]'>
                  {
                    (searchItem.length === 0) ? customers.sort((a, b) => ((new Date(a.date)) - (new Date(b.date)))).map((customer, i) => <tr className=' hover:bg-slate-600'
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

                      <td>{customer?.phone}</td>
                      <td>{customer?.date ? (`${new Date(customer?.date).getDate()}-${months[(new Date(customer?.date).getMonth())]}- ${new Date(customer?.date).getFullYear()}`) : <p className='text-[#FDA506]' >New customer</p>}</td>
                      <td>{customer?.amount ? ((customer.status === 'paid') ? customer?.amount : <p  >Please pay {customer?.amount} Taka</p>) : <p className='text-[#FDA506]' >New customer</p>}</td>
                      <td  >{customer?.status
                        ? ((customer.status === 'paid') ? <p className='text-green-500'>{customer?.status}</p> :
                          <p className='text-rose-500'>{customer?.status}</p>)
                        : <p className='text-rose-500' >unpaid</p>
                      }</td>
                      <td>{customer?.payment}</td>
                      <td>
                        {
                          !(customer?.status === 'paid') && <label onClick={() => setUpdatingCustomer(customer)} htmlFor="update-modal" className="btn btn-xs btn-error ">Update</label>
                        }
                      </td>

                    </tr>) : (filteredUsers.length === 0 ? " No Data Found" : (filteredUsers.map((customer, i) => <tr className=' hover:bg-slate-600 text-white'
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
                      <td>{customer?.email}</td>
                      <td>{customer?.phone}</td>
                      <td>{customer?.date ? (`${new Date(customer?.date).getDate()}-${months[(new Date(customer?.date).getMonth())]}- ${new Date(customer?.date).getFullYear()}`) : <p className='text-[#FDA506]' >New customer</p>}</td>
                      <td>{customer?.amount ? ((customer.status === 'paid') ? customer?.amount : <p  >Please pay {customer?.amount} Taka</p>) : <p className='text-[#FDA506]' >New customer</p>}</td>
                      <td  >{customer?.status
                        ? ((customer.status === 'paid') ? <p className='text-green-500'>{customer?.status}</p> :
                          <p className='text-rose-500'>{customer?.status}</p>)
                        : <p className='text-rose-500' >unpaid</p>
                      }</td>
                      <td>{customer?.payment}</td>
                      <td>
                        {
                          !(customer?.status === 'paid') && <label onClick={() => setUpdatingCustomer(customer)} htmlFor="update-modal" className="btn btn-xs btn-error ">Update</label>
                        }
                      </td>

                    </tr>

                    ))

                    )
                  }


                </tbody>


              </table>

            </div>
          </div>
        </div>

      </div>
      {
        updatingCustomer && <UpdatePaymentModal
          setUpdatingCustomer={setUpdatingCustomer}
          updatingCustomer={updatingCustomer}
          refetch={refetch}
        ></UpdatePaymentModal>
      }
    </div>
  );
};

export default Home;