import { useContext, useState} from 'react';
import { AuthContext } from '../../providers/AuthProvider';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import Swal from 'sweetalert2'
import SocialLogin from '../Shared/SocialLogin/SocialLogin';
import loginBanner from '../../assets/others/authentication2.png'
import loginBG from '../../assets/menu/Banner.png'

const Login = () => {
  
    const { signIn } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const [error,setError] = useState(null)
    // const from = location.state?.from?.pathname || "/";


    const handleLogin = event => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        // console.log(email, password);
        signIn(email, password)
            .then(result => {
                const user = result.user;
                console.log(user);
                Swal.fire({
                    title: 'User Login Successful.',
                    showClass: {
                        popup: 'animate__animated animate__fadeInDown'
                    },
                    hideClass: {
                        popup: 'animate__animated animate__fadeOutUp'
                    }
                });
                // navigate(from, { replace: true });
                navigate("/dashboard/home");
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                if(errorMessage){
                    Swal.fire({
                        title: `Invalid User!! Please Signup First`,
                        showClass: {
                            popup: 'animate__animated animate__fadeInDown'
                        },
                        hideClass: {
                            popup: 'animate__animated animate__fadeOutUp'
                        }
                    });
                }
                // setError(errorMessage);
                // console.log(errorMessage)
              });
    }

 

  
   const backgroundImg = {
    backgroundImage: `url(${loginBG})`,
    backgroundRepeat: 'no-repeat'
  }

    return (
        <>
            
            <div style={backgroundImg} className="hero min-h-screen bg-base-200">
                <div style={backgroundImg} className="hero-content flex-col md:flex-row-reverse  shadow-slate-400 shadow-lg md:p-16">
                    <div className="text-center md:w-1/2 ">
                        <h1 className="text-5xl font-bold md:mb-10 mb-5">Login now!</h1>
                        <div>
                            <img  src={loginBanner} alt="" />
                        </div>
                    </div>
                    <div className="card md:w-1/2 max-w-sm shadow-2xl bg-base-100">
                        <form onSubmit={handleLogin} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" name="email" placeholder="email" className="input input-bordered" />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" name="password" placeholder="password" className="input input-bordered" />
                                <label className="label">
                                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                            </div>
                           
                            {/* TODO: make button disabled for captcha */}
                            <div className="form-control mt-6">
                                <input  className="btn bg-[#D1A054] " type="submit" value="Login" />
                            </div>
                        </form>
                        <p className='text-center text-[#e9ac51]' ><small>New Here? <Link to="/signup">Create an account</Link> </small></p>
                        <SocialLogin></SocialLogin>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;