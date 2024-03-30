
import { useState } from "react";
import { useDispatch,useSelector } from "react-redux"
import { changepassword } from "../Redux/ChangepassSlice";
import { useNavigate } from "react-router-dom";
import './Newpassword.css'

function Newpassword() {
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const [password, setpassword]=useState("");
    const [confirmpassword,setconfirmpassword]=useState("")
    const Email=useSelector((state)=>state.forgotpass.Email);
    const success=useSelector((state)=>state.changepass.success);

    const Changepassword=(e)=>{
           e.preventDefault();
           if(password==confirmpassword){
               dispatch(changepassword({Email:Email,Password:password}))
               if(success==true){
                    navigate('/Login')
               }
               else{
                  console.log("main kisi aur ka ho filahal")
               }
           }

           else{
            console.log("password not matched")
           }

    }
  return (
    <div className="newpasswordmaindiv">
      <div className="newpasswordcontainer">
        <div className="newpasswordpage">
        <div className="newpasswordimgdiv">
          <img src="https://plus.unsplash.com/premium_photo-1676618539983-d1a95978fd7d?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
        </div>
        <div className="newpasswordheading">
          <h2>Change Password with Security</h2>
        </div>
      <form action="" onSubmit={Changepassword}>
       <input type="text" value={password} placeholder="Enter New password" onChange={(e)=>setpassword(e.target.value)}/>
       <input type="text" value={confirmpassword} placeholder="Confirm Password" onChange={(e)=>setconfirmpassword(e.target.value)}/>
       <button>Changepassword</button>
       </form>
        </div>
        

      </div>
      

    </div>
  )
}

export default Newpassword
