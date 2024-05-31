// import React, { useState } from 'react';
// import { GrVmMaintenance } from "react-icons/gr";
// import useCustomersPayment from '../../../../hooks/useCustomersPayment';
// import Swal from 'sweetalert2';
// import useAxiosSecure from '../../../../hooks/useAxiosSecure';
// const Stats = ({ todayIncome, monthlyIncome, todayExpense, monthlyExpense, grandTotalBank , todayBankAmount }) => {
//   // const [netTodayIncome , setNetTodayIncome] = useState([])
//   // console.log(CustomersPayment)
//  let bank = []
//  let bkash = []
//  let cash = []
//   const [CustomersPayment, refetch] = useCustomersPayment();
//   const [axiosSecure] = useAxiosSecure();
//   console.log(grandTotalBank?.reduce((sum, item) => parseFloat(item.amount) + sum, 0))
//   console.log(todayBankAmount)
//   // setBank(bank1)
//   // setBkash(bkash3)
//   // setCash(cash2)

//   //   let bank = 0;
//   // bankTotal.forEach((el) => bank += el?.amount);

//     grandTotalBank.map(single=>{
//       if(single?.payment === "Bank Deposit")
//         bank.push(single)
//       else if(single?.payment === "Bkash")
//       bkash.push(single)
//       else if(single?.payment === "Cash")
//         cash.push(single)
//     })
//     console.log(bkash)
//     const netbank = bank?.reduce((sum, item) => parseFloat(item.amount) + sum, 0);
//     const netcash = cash?.reduce((sum, item) => parseFloat(item.amount) + sum, 0);
//     const netbkash = bkash?.reduce((sum, item) => parseFloat(item.amount) + sum, 0);


//   const handleTransfer = (data) => {
   
//     Swal.fire({
//       title: 'Are you sure?',
//       icon: 'warning',
//       showCancelButton: true,
//       confirmButtonColor: '#3085d6',
//       cancelButtonColor: '#d33',
//       confirmButtonText: 'Yes'
//     }).then((result) => {
//       if (result.isConfirmed) {

//         // data.map(singleData => {
//         //   axiosSecure.put(`/banktransfer`, singleData)
//         //     .then(res => {
//         //       console.log(res.data.acknowledged);
              
//         //     })
//         // })
//         console.log(data)
//         axiosSecure.put(`/banktransfer`, data)
//         .then(res => {
//                 console.log(res.data.acknowledged);
//                 if(res.data.acknowledged){
//                   console.log("transferred")
//                 }
//                 else{
//                   console.log(res);
//                 }
//               })
//       }
//       refetch();
//     })


//   }


//   return (
//     <div className=" grid md:grid-cols-4 grid-cols-1 md:gap-5  gap-1">

//       <div className="stat shadow bg-slate-50 rounded-xl">
//         <div className=" ms-3 stat-figure text-primary text-2xl">
//           <GrVmMaintenance />
//           {/* <button onClick={handleTransfer} className='text-sm bg-slate-300 p-1 rounded'>transfer to bank</button> */}
//           <div className='dropdown dropdown-end'>
//             <div tabIndex={0} className="text-sm p-1 bg-slate-100  rounded ">
//               <h1>Transfer</h1>
//             </div>
//             <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-64">
//               <li className='flex'>
//                 <button className="justify-between">
//                   Bkash Total
//                   <span className="badge">{netbkash}</span>
//                   {(netbkash === 0) ? "" : <span className='btn btn-xs text-secondary' onClick={() => handleTransfer(bkash)} > transfer</span>
//                   }

//                 </button>

//               </li>
//               <li>
//                 <button className="justify-between">
//                   Cash Total
//                   <span className="badge">{netcash}</span>
//                   {(netcash === 0) ? "" : <span className='btn btn-xs text-secondary' onClick={() => handleTransfer(cash)} > transfer</span>
//                   }
//                 </button>
//               </li>
//               {/* <li >
//                 <h1 className="justify-between "  >
//                   Bank Total
//                   <span className="badge">{bank}</span>
//                   <span   > transferred</span>
//                 </h1>
//               </li> */}

//             </ul>
//           </div>
//         </div>
//         <div className="stat-title text-[16px]">Today Revenue</div>
//         <div className="stat-value text-primary">৳ {todayIncome
//         }</div>

//       </div>

//       <div className="stat shadow bg-slate-50 rounded-xl">
//         <div className=" ms-3 stat-figure text-primary text-2xl">
//           <GrVmMaintenance />
//         </div>
//         <div className="stat-title text-[16px]">Monthly Revenue</div>
//         <div className="stat-value text-primary"> ৳ {monthlyIncome}</div>

//       </div>

//       <div className="stat shadow bg-slate-50 rounded-xl">
//         <div className=" ms-3 stat-figure text-primary text-2xl">
//           <GrVmMaintenance />
//         </div>
//         <div className="stat-title text-[16px]">Today Expense</div>
//         <div className="stat-value text-primary">৳ {todayExpense}</div>

//       </div>

//       <div className="stat shadow bg-slate-50 rounded-xl">
//         <div className=" ms-3 stat-figure text-primary text-2xl">
//           <GrVmMaintenance />
//         </div>
//         <div className="stat-title text-[16px]">Monthly Expense</div>
//         <div className="stat-value text-primary"> ৳ {monthlyExpense}</div>

//       </div>

//       <div className="stat shadow bg-slate-50 rounded-xl">
//         <div className=" ms-3 stat-figure text-primary text-2xl">
//           <GrVmMaintenance />
//         </div>
//         <div className="stat-title text-[16px]">Grand Total Today Revenue</div>
//         <div className="stat-value text-primary"> ৳ {todayIncome-todayExpense}</div>

//       </div>

//       <div className="stat shadow bg-slate-50 rounded-xl">
//         <div className=" ms-3 stat-figure text-primary text-2xl">
//           <GrVmMaintenance />
//         </div>
//         <div className="stat-title text-[16px]">Today Bank Diposit</div>
//         <div className="stat-value text-secondary"> ৳ {todayBankAmount} </div>

//       </div>
//     </div>
//   );
// };

// export default Stats;