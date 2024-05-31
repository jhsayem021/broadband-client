import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { Navigate, useLocation } from "react-router";
import { NavLink } from "react-router-dom";


const PrivateRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation();

    if(loading){
        return <div className="w-96 mx-auto ">
        
        <progress className="progress w-56"></progress> <br></br> <br></br> <br></br>

        {
           ( user===null) ? <h1 className="text-xl my-5 mx-auto">Please login first</h1> : <h1 className="text-xl my-5 mx-auto">Please Wait server is loading</h1>
        }
        {/* <h1 className="text-xl my-5 mx-auto">Please login first</h1> */}
        {
        (user===null) && <NavLink to="/login" className="p-3 bg-slate-200 text-black rounded-lg mt-10 "> Login </NavLink>
        }
        </div>
    }

    if (user) {
        return children;
    }
    return <Navigate to="/login" state={{from: location}} replace></Navigate>
};

export default PrivateRoute;