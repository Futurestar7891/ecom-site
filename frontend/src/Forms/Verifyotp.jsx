import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { verifyotp } from "../Redux/VerifyotpSlice";
import { useNavigate } from "react-router-dom";
import './Verifyotp.css'
import { fetchotp } from "../Redux/ForgotSlice";
function Verifyotp() {
 const navigate=useNavigate();
  const Email=useSelector((state)=>state.forgotpass.Email);
  console.log("Email reached to frontend",Email);
  const dispatch = useDispatch();
  const [OTP, setOTP] = useState();
 

  const varifyotp =(e) => {
    e.preventDefault();
    dispatch(verifyotp({OTP:OTP,Email:Email}))
    navigate('/Newpassword')

  };
  const Resendotp=(e)=>{
    e.preventDefault();
    dispatch(fetchotp({Email:Email}))

  }

  return (
    <div className="Varifyotpmaindiv">
      <div className="Varifyotpcontainer">
        <div className="Verifyotppage">
        <div className="Verifyotpimgdiv">
          <img src="https://img.freepik.com/premium-vector/unlock-password-correct-success-login-concept-vector-illustration-flat-design_662353-282.jpg"/>
        </div>
        <div className="Varifyotpheading">
          <h2>Verification</h2>
          <p>You will get an OTP via Email</p>
        </div>
      <form action="" onSubmit={varifyotp}>
        
       <input
          type="password"
          value={OTP}
          placeholder="Enter OTP..."
          onChange={(e) => setOTP(e.target.value)}
        />
        <button> Verify OTP</button>
      </form>
      <div className="Resentotp">
       <p>Didnt recieved otp?</p> <p style={{color:"blue",cursor:"pointer",}} onClick={Resendotp} >Resend OTP</p>
      </div>
        </div>
        
        
      </div>
    </div>
  );
}

export default Verifyotp;
