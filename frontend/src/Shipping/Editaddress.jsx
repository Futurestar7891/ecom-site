
import { useParams } from 'react-router-dom'
import './Editaddress.css'
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { createaddress, updateaddress } from '../Redux/Addresses';
function Editaddress() {
    const {idx}=useParams();
    const dispatch=useDispatch();
    const Address=useSelector((state)=>state.Address.Address[idx]);
    const message=useSelector((state)=>state.Address.message);
    console.log(message);
    const [Editaddress,setEditaddress]=useState(Address);
    const [Newaddress,setNewaddress]=useState({
        Name: "",
        Email: "",
        Mobile: "",
        Altermobile: "",
        Country: "",
        State: "",
        City: "",
        Pincode: "",
        House: "",
    })

    const handleInput=(e)=>{
        const {name,value}=e.target;
        {
            idx!=null? setEditaddress({...Editaddress,[name]:value})
            : setNewaddress({...Newaddress,[name]:value})
        }
       
       
    }
    const saveaddress=(e)=>{
        e.preventDefault();
        {
            idx!=null? dispatch(updateaddress({Email:Editaddress.Email,Name:Editaddress.Name,Mobile:Editaddress.Mobile,
                Altermobile:Editaddress.Altermobile,Pincode:Editaddress.Pincode,Userid:localStorage.getItem("id"),Index:idx}))
                : dispatch(createaddress({
                    Email:Newaddress.Email,Name:Newaddress.Name,Mobile:Newaddress.Mobile,
                    Altermobile:Newaddress.Altermobile,Pincode:Newaddress.Pincode,Userid:localStorage.getItem("id")
                }))

        }
       

       
    }
    
  return (
    <div className="ShippingddressEditmaindiv">
        {
            idx!=null? <div className="ShippingaddressEditcontainer">
            <div className="ShippingaddressEditpage">
           <form action="" onSubmit={saveaddress} >
               <div className="AddressEditinputdiv">
                   <input name="Name" value={Editaddress.Name}  onChange={handleInput}type="text"   placeholder="Enter Name" />
                   <input name="Email" value={Editaddress.Email}  onChange={handleInput}type="text"   placeholder="Enter Email"/>
               </div>
               <div className="AddressEditinputdiv">
                <input name="Mobile"value={Editaddress.Mobile}  onChange={handleInput}type="text"  placeholder="Enter Mobile No."/>
               <input name="Altermobile" value={Editaddress.Altermobile} onChange={handleInput}type="text"   placeholder="Enter Alternate Mobile No."/></div>
               <div className="AddressEditinputdiv">
                   <select value={Editaddress.Country} onChange={handleInput} name="Country"  id="" >
        
                   </select>
                   <select value={Editaddress.State} onChange={handleInput}name="State"  id="" ></select>
                   <select value={Editaddress.City}  onChange={handleInput}name="City"  id="" ></select>
               </div>
               <div className="AddressEditinputdiv">
                   <input value={Editaddress.House}  onChange={handleInput}name="Address"  type="text"  placeholder="Enter Address" />
                   <input value={Editaddress.Pincode}  onChange={handleInput}name="Pincode" type="text"  placeholder="Enter Pincode" />
               </div>
               <div className="AddressEditinputdiv">
                  <button type="reset">Reset</button>
                  <button type="submit">Save Address</button>
               </div>
           </form>
        </div>
            
            </div>:<div className="ShippingaddressEditcontainer">
            <div className="ShippingaddressEditpage">
           <form action="" onSubmit={saveaddress} >
               <div className="AddressEditinputdiv">
                   <input name="Name" value={Newaddress.Name}  onChange={handleInput}type="text"   placeholder="Enter Name" />
                   <input name="Email" value={Newaddress.Email}  onChange={handleInput}type="text"   placeholder="Enter Email"/>
               </div>
               <div className="AddressEditinputdiv">
                <input name="Mobile"value={Newaddress.Mobile}  onChange={handleInput}type="text"  placeholder="Enter Mobile No."/>
               <input name="Altermobile" value={Newaddress.Altermobile} onChange={handleInput}type="text"   placeholder="Enter Alternate Mobile No."/></div>
               <div className="AddressEditinputdiv">
                   <select value={Newaddress.Country} onChange={handleInput} name="Country"  id="" >
        
                   </select>
                   <select value={Newaddress.State} onChange={handleInput}name="State"  id="" ></select>
                   <select value={Newaddress.City}  onChange={handleInput}name="City"  id="" ></select>
               </div>
               <div className="AddressEditinputdiv">
                   <input value={Newaddress.House}  onChange={handleInput}name="Address"  type="text"  placeholder="Enter Address" />
                   <input value={Newaddress.Pincode}  onChange={handleInput}name="Pincode" type="text"  placeholder="Enter Pincode" />
               </div>
               <div className="AddressEditinputdiv">
                  <button type="reset">Reset</button>
                  <button type="submit">Save Address</button>
               </div>
           </form>
        </div>
            
            </div>
        }
   
    </div>
  )
}

export default Editaddress
