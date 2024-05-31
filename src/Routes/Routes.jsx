import { createBrowserRouter } from "react-router-dom";
import Dashboard from "../Layout/Dashboard";
import Home from "../Pages/Dashboard/Home/Home";
import Customers from "../Pages/Dashboard/Customers/Customers";
import Users from "../Pages/Dashboard/Users/Users";
import Login from "../Pages/Login/Login";
import SignUp from "../Pages/SignUp/SignUp";
import PrivateRoute from "./PrivateRoute";
import Main from "../Layout/Main";
import WelcomePage from "../Pages/WelcomePage/WelcomePage";
import Expense from "../Pages/Dashboard/Expense/Expense";
import AllIncome from "../Pages/Dashboard/AllIncome/AllIncome";
import AllExpense from "../Pages/Dashboard/AllExpense/AllExpense";


export const router = createBrowserRouter([
    {
        path:"/",
        element: <Main></Main>,
        children: [
            {
                path: '/',
                element: <WelcomePage></WelcomePage>
            },
            {
                path: 'login',
                element: <Login></Login>
              },
              {
                path: 'signup',
                element: <SignUp></SignUp>
              },
        ]
    }
    ,
    {
        path: 'dashboard',
        element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>, 
        children: [
          {
            path: 'home',
            element:  <Home></Home>
          },
          {
            path: 'customers', 
            element: <Customers></Customers>
          },
          {
            path:'users',
            element: <Users></Users>
          },
          {
            path:'expense',
            element: <Expense></Expense>
          },
          {
            path:'income',
            element: <AllIncome></AllIncome>
          },
          {
            path:'allexpense',
            element: <AllExpense></AllExpense>
          },
          // admin routes
        //   {
        //     path: 'adminhome',
        //     element: <AdminRoute><AdminHome></AdminHome></AdminRoute>
        //   },
        //   {
        //     path: 'allusers', 
        //     element: <AdminRoute><AllUsers></AllUsers></AdminRoute>
        //   },
        //   {
        //     path: 'addItem',
        //     element: <AdminRoute><AddItem></AddItem></AdminRoute>
        //   },
        //   {
        //     path: 'manageitems',
        //     element: <AdminRoute><ManageItems></ManageItems></AdminRoute>
        //   }
        ]
      }
])