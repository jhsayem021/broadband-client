import React, { useState } from 'react';
import useCustomersPayment from '../../../hooks/useCustomersPayment';
import Swal from 'sweetalert2';
import jsPDF from "jspdf";
import "jspdf-autotable";

const AllIncome = () => {
    
  const [updatingRevenue, setUpdatingRevenue] = useState([]);
  const [CustomersPayment, refetch] = useCustomersPayment();
  const [searchResult, setSearchResult] = useState(false);
  const [noDataString, setNoDataString] = useState("");
  const [dateOne, setDateOne] = useState(null);
  const [dateTwo, setDateTwo] = useState(null);
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  let t = 0;
  let inputdate1;
  let inputdate2;


  refetch();
  // setUpdatingCustomer(CustomersPayment)
  console.log(CustomersPayment);
  const handleForm = e => {
    e.preventDefault();
    setUpdatingRevenue([])
    const form = e.target;
    inputdate1 = new Date(form.date1.value).getTime();
    console.log(inputdate1)
    inputdate2 = new Date(form.date2.value).getTime();
    console.log(inputdate2)

    setDateOne(new Date(form.date1.value));
    setDateTwo(new Date(form.date2.value))
    console.log((inputdate2 - inputdate1))
    console.log((inputdate2 - inputdate1) <= 0)
    if (((form.date1.value === '') || (form.date2.value === '')) || (((inputdate2 - inputdate1) <= 0) === true)) {
        Swal.fire({
            title: "Invalid Date?",
            text: "Please enter valid date range",
            icon: "question"
          });
    } else {
      setUpdatingRevenue(CustomersPayment.filter(customer => ((inputdate1 <= (new Date(customer.date).getTime())) && (inputdate2 >= (new Date(customer.date).getTime())))))
      console.log(updatingRevenue);

      if (updatingRevenue.length === 0) {
        setSearchResult(true);
        setNoDataString("No data found ");
      }
    }
    console.log(updatingRevenue);
  }

  const exportPDF = () => {
    const unit = "pt";
    const size = "A4"; // Use A1, A2, A3 or A4
    const orientation = "portrait"; // portrait or landscape
    const marginLeft = 40;
    const doc = new jsPDF(orientation, unit, size);
    doc.setFontSize(15);
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const title = `Revenue Report of "${dateOne.getDate()} ${months[dateOne.getMonth()]} ${dateOne.getFullYear()}" from "${dateTwo.getDate()} ${months[dateTwo.getMonth()]} ${dateTwo.getFullYear()}"`;
    const subTotal = `Total = ${sumArray(updatingRevenue)}`
    const headers = [["NAME", "LAST BILLING DATE", "PAYMENT"]];
    const data = updatingRevenue.map(customer => [customer.name, customer.date, customer.amount]);
    let content = {
      startY: 80,
      head: headers,
      body: data
    };
    doc.text(title, marginLeft, 40);
    doc.text(subTotal, marginLeft, 60);
    doc.autoTable(content);
    doc.save("report.pdf")
  }
  function sumArray(array) {
    let sum = 0;

    /*loop over array and add each item to sum
    */
    for (const item of array) {
      sum += parseFloat(item.amount);
    }

    // return the result 
    console.log(sum);
    return sum;
  }


  return (
    <div>
      <div className='w-5/6 mx-auto'>
        <div className="">

          <h3 className="text-3xl font-bold mb-10"> Revenue </h3>

          <form onSubmit={handleForm}  >
            <div className='lg:flex'>
              <div className='lg:grid gap-2 grid-cols-2 lg:mb-0 mb-5'>
                <div className='lg:mb-0 mb-5'>
                  <label htmlFor="">From </label>
                  <input name="date1" type="datetime-local" className="input input-bordered w-1/2 ml-3" />
                </div>
                <div>
                  <label htmlFor="">To </label>
                  <input name="date2" type="datetime-local" className="input input-bordered w-1/2 ml-3" />
                </div>
              </div>
              <div className=''>
                <input type="submit" value="Submit" className="btn bg-[#102156] text-white   " />
              </div>
              {
                updatingRevenue?.length === 0 ? '' : <button className='btn btn-primary ms-10 mb-5' onClick={() => exportPDF()}>Export Data</button>
              }

            </div>
    
            <div className="my-6">
                {
                    (updatingRevenue.length !== 0) && <h1 className='text-2xl'> Total = {sumArray(updatingRevenue)} </h1>
                }
            </div>


            <div className="overflow-x-auto my-10">
              
              <table className="table bg-slate-700 text-center">
                <thead className='text-white text-[16px]'>
                
                {
                      ((updatingRevenue.length === 0) && (CustomersPayment.length !==0)) ? ((<tr>
                     <th></th>
                    <th>Name</th>
                    <th>Last billing Date</th>
                    <th>Amount</th>
                    <th>Payment Method</th>
                    </tr>)) : (((updatingRevenue.length !== 0)) ?((<tr>
                        <th></th>     
                    <th>Name</th>
                    <th>Last billing Date</th>
                    <th>Amount</th>
                    <th>Payment Method</th>
                    </tr>)) : <tr> <th> </th> </tr>)
                    }
                </thead>
                <tbody >
                  {
                    updatingRevenue.length === 0 ?
                      (
                        (searchResult === false && (updatingRevenue.length === 0)) ? (CustomersPayment.map((customer, i) => <tr className=' hover:bg-slate-600 text-white'
                          key={customer._id}
                        >
                          <th>{i + 1}</th>
                          <td>{customer.name}</td>
                          <td>{customer?.date ? (customer?.date) : <p className='text-primary' >New customer</p>}</td>
                          <td>{customer?.amount}</td>
                          <td>{customer?.payment}</td>
                        </tr>)) : <tr> <td className='text-center text-white'>No Result Found</td> </tr>
                      ) :

                     ( updatingRevenue.map((customer, i) => <tr className=' hover:bg-slate-600 text-white'
                        key={customer._id}
                      >
                        <th>{i + 1}</th>
                        <td>{customer.name}</td>
                        <td>{customer?.date ? (customer?.date) : <p className='text-primary' >New customer</p>}</td>
                        <td>{customer?.amount}</td>
                        <td>{customer?.payment}</td>
                      </tr>
                      
                      )
                      
                      )
                      
                  }
                  {
                    updatingRevenue.length === 0 ?
                      (
                        (searchResult === false && (updatingRevenue.length === 0)) ? <tr className=' hover:bg-slate-600 text-white'
                        
                        >
                                             <td></td>
                    <td></td>
                    <td className='text-white text-end' >Total =</td>
                
                    <td className='text-white'> {CustomersPayment?.reduce((sum, item) => parseFloat(item.amount) + sum, 0)}</td>
                        </tr> : <tr> <td className='text-center text-white'>No Result Found</td> </tr>
                      ) :

                     ( <tr className=' hover:bg-slate-600 text-white'
                        
                     >
                                          <td></td>
                 <td></td>
                 <td className='text-white text-end' >Total =</td>
             
                 <td className='text-white'> {updatingRevenue?.reduce((sum, item) => parseFloat(item.amount) + sum, 0)}</td>
                     </tr>
                      
                    
                      
                      )
                      
                  }
                </tbody>
              </table>
            


            </div>
          </form>
        </div>
      </div>
      <div>
      </div>
    </div>
    );
};

export default AllIncome;