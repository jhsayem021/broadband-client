import React, { useState } from 'react';
import useExpense from '../../../hooks/useExpense';
import Swal from 'sweetalert2';
import jsPDF from "jspdf";
import "jspdf-autotable";

const AllExpense = () => {
    const [updatingExpense, setUpdatingExpense] = useState([]);
    const [expense, refetch] = useExpense();
    const [searchResult, setSearchResult] = useState(false);
    const [searchItem, setSearchItem] = useState('')
    const [filteredUsers, setFilteredUsers] = useState(expense)
    const handleInputChange = (e) => {
      const searchTerm = e.target.value;
      setSearchItem(searchTerm)
  
      const filteredItems = expense.filter((singleExpense) =>
      (singleExpense?.expense.toLowerCase().includes(searchTerm.toLowerCase()) || singleExpense?.person.toLowerCase().includes(searchTerm.toLowerCase()))
      );
  
      setFilteredUsers(filteredItems);
    }
    const [noDataString, setNoDataString] = useState("");
    const [dateOne, setDateOne] = useState(null);
    const [dateTwo, setDateTwo] = useState(null);
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let t = 0;
    let inputdate1;
    let inputdate2;
  
  
    refetch();
    // setUpdatingCustomer(CustomersPayment)
    console.log(expense);
    const handleForm = e => {
      e.preventDefault();
      setUpdatingExpense([])
      const form = e.target;
      inputdate1 = new Date(form.date1.value).getTime();
      console.log(inputdate1)
      inputdate2 = new Date(form.date2.value).getTime();
      console.log(inputdate2)
  
      setDateOne(new Date(form.date1.value));
      setDateTwo(new Date(form.date2.value));
      if(inputdate1 !== 0 && inputdate2 === 0){
        setNoDataString(`Data from "${dateOne.getDate()} ${months[dateOne.getMonth()]} ${dateOne.getFullYear()}" to "${dateTwo.getDate()} ${months[dateTwo.getMonth()]} ${dateTwo.getFullYear()}"`)
      }
      console.log(noDataString)
      console.log((inputdate2 - inputdate1))
      console.log((inputdate2 - inputdate1) <= 0)
      if (((form.date1.value === "") || (form.date2.value === "")) || (((inputdate2 - inputdate1) <= 0)=== true)) {
          Swal.fire({
              title: "Invalid Date?",
              text: "Please enter valid date range",
              icon: "question"
            });
      } else {
        setUpdatingExpense(expense.filter(singleExpense => ((inputdate1 <= (new Date(singleExpense.entryDate).getTime())) && (inputdate2 >= (new Date(singleExpense.entryDate).getTime())))))
        console.log(updatingExpense);
  
        if (updatingExpense.length === 0) {
          setSearchResult(true);
        }
      }
      console.log(updatingExpense);
    }
  
    const exportPDF = () => {
      const unit = "pt";
      const size = "A4"; // Use A1, A2, A3 or A4
      const orientation = "portrait"; // portrait or landscape
      const marginLeft = 40;
      const doc = new jsPDF(orientation, unit, size);
      doc.setFontSize(15);
      let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
      const title = `Expense Report of "${dateOne.getDate()} ${months[dateOne.getMonth()]} ${dateOne.getFullYear()}" from "${dateTwo.getDate()} ${months[dateTwo.getMonth()]} ${dateTwo.getFullYear()}"`;
      const subTotal = `Total = ${sumArray(updatingExpense)}`
      const headers = [["Expense of", "Date", "Amount", "Expense By"]];
      const data = updatingExpense.map(singleExpense => [singleExpense.expense, singleExpense.entryDate, singleExpense.amount, singleExpense.person]);
      let content = {
        startY: 80,
        head: headers,
        body: data
      };
      doc.text(title, marginLeft, 40);
      doc.text(subTotal, marginLeft, 60);
      doc.autoTable(content);
      doc.save("Expense-Report.pdf")
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
  
            <h3 className="text-3xl font-bold mb-10"> Expense </h3>
  
            <form onSubmit={handleForm}  >
              <div className=' lg:flex '>
                <div className=' lg:grid gap-2 grid-cols-2 lg:mb-0 mb-5'>
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
                  updatingExpense?.length === 0 ? '' : <button className='btn btn-primary ms-10 mb-5' onClick={() => exportPDF()}>Export Data</button>
                }
  
              </div>
            <div>
              {
                (noDataString.length !== 0) && <h1 className='text-black'> {noDataString}</h1>
              }
            </div>
              <div className="my-6">
                  {
                      (updatingExpense.length !== 0) && <h1 className='text-2xl'> Total = {sumArray(updatingExpense)} </h1>
                  }
              </div>
              <div className='  '>
          <div className=" lg:mb-6  my-5 flex justify-end">
            <input type="text" value={searchItem}
              onChange={handleInputChange}
              placeholder='Type to search customers'
              className="input input-bordered w-64 " />
            {/* <input type="checkbox" name="" onClick={handleDataFilter} id="" /> */}
          </div>
  
              <div className="overflow-x-auto my-10">
                
                <table className="table bg-slate-700 text-center">
                  <thead className='text-white text-[16px]'>
                  
                    {
                      ((updatingExpense.length === 0) && (expense.length !==0)) ? ((<tr>
                      <th></th>
                      {/* <td></td> */}
                      <th>Expense for</th>
                      <th>Date</th>
                      <th>Amount</th>
                      <th>Expense By</th>
                    </tr>)) : (((updatingExpense.length !== 0)) ?((<tr>
                      <th></th>
                      {/* <td></td> */}
                      <th>Expense for</th>
                      <th>Date</th>
                      <th>Amount</th>
                      <th>Expense By</th>
                    </tr>)) : <tr> <th> </th> </tr>)
                    }
                  </thead>
                  <tbody>
         

{
                    (searchItem === "") ? (updatingExpense.length === 0 ?
                        (
                          (searchResult === false && (updatingExpense.length === 0)) ? (expense.map((singleExpense, i) => <tr className=' hover:bg-slate-600 text-white'
                            key={singleExpense._id}
                          >
                            <th>{i + 1}</th>
                            <td>{singleExpense?.expense}</td>
                            <td>{singleExpense?.entryDate}</td>
                            <td>{singleExpense?.amount}</td>
                            <td>{singleExpense?.person}</td>
                          </tr>)) : <tr> <td className='text-center text-white'>No Result Found</td> </tr>
                        ) :
  
                      (  updatingExpense.map((singleExpense, i) => <tr className=' hover:bg-slate-600 text-white'
                          key={singleExpense._id}
                        >
                          <th>{i + 1}</th>
                          <td>{singleExpense?.expense}</td>
                          <td>{singleExpense?.entryDate}</td>
                          <td>{singleExpense?.amount}</td>
                          <td>{singleExpense?.person}</td>
                        </tr>
                        ))) : (filteredUsers.map((singleExpense, i) => <tr className=' hover:bg-slate-600 text-white'
                      key={singleExpense._id}
                    >
                      <th>
                        {i}
                      </th>
                      <td>{singleExpense?.expense}</td>
                            <td>{singleExpense?.entryDate}</td>
                            <td>{singleExpense?.amount}</td>
                            <td>{singleExpense?.person}</td>

                    </tr>))
                  }
                  </tbody>
                </table>
              
  
  
              </div>
             </div>
            </form>
          </div>
        </div>
        <div>
        </div>
      </div>
    );
};

export default AllExpense;