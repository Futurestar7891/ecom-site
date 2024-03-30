import { NavLink } from 'react-router-dom';
import './Profile.css'
import { useNavigate } from 'react-router-dom';
import EditProfile from './Editprofile';
import { useState } from 'react';
import { setFilter } from '../Redux/FilterSlice';
import { useDispatch } from 'react-redux';
function Profile({onClose}) {
  const dispatch=useDispatch();
  const [showeditprofile,setshoweditprofile]=useState(false);
  const navigate=useNavigate();
  const logout=()=>{
     localStorage.removeItem("Token")
     dispatch(setFilter({filterName:"keyword",filterValue:""}))
     dispatch(setFilter({filterName:"page",filterValue:1}))
     navigate('/')
     window.location.reload();
     onClose()
    
  }

  const Crossprofile=()=>{
    onClose();
  }
  return (
    <div className="profilemaindiv">
     <div className='profilecontainer'>
      <span onClick={Crossprofile}>X</span>
        <div className='profileimage'>
         <img src={localStorage.getItem("Img")} alt="" />
         <strong>{localStorage.getItem("Name")}</strong>
         </div>
         <hr />
        <div className='profiledetails'>
        <NavLink className="Navlink">Orders</NavLink>
        <NavLink onClick={()=>setshoweditprofile(true)} className="Navlink">Edit Profile</NavLink>
        <NavLink className="Navlink" to="/Changepassword" >Change Password</NavLink>
        <NavLink className="Navlink">Address</NavLink>
        <NavLink className="Navlink">Language</NavLink>
        <NavLink className="Navlink">Help</NavLink>
       </div>
       <div className='profilebutton'>
       <button onClick={logout}>Logout</button>

       </div>
     </div>
     {
        showeditprofile && (
<          EditProfile onClose={()=>setshoweditprofile(false)}/> 
        )
     }
     
    </div>
  )
}

export default Profile;
