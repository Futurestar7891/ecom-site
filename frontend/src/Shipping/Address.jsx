import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './Address.css'
import {
  faBuildingColumns,
  faCheck,
  faTruck,
} from "@fortawesome/free-solid-svg-icons";
// import { useState } from "react"

import "./Address.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  createaddress,
  deleteaddress,
  getaddress,
} from "../Redux/Addresses";
import { getshippingaddress } from "../Redux/Shippingaddress";
import { useEffect } from "react";
import { updateshippingaddress } from "../Redux/Shippingaddress";
function Address() {
  const dispatch = useDispatch();
  const Address = useSelector((state) => state.Address.Address);
  const message=useSelector((state)=>state.Address.message);
  const error=useSelector((state)=>state.Address.error);
  console.log(error)
  console.log("jhkjsdhfkjdsfd",message);
  const [Value, setValue] = useState({
    Name: "",
    Email: "",
    Mobile: "",
    Altermobile: "",
    Country: "",
    State: "",
    City: "",
    Pincode: "",
    House: "",
  });

  const navigate = useNavigate();

  const handleInput=(e)=>{
      const {name,value}=e.target
      setValue({...Value,[name]:value})
  }

  useEffect(() => {
    try {
      dispatch(getaddress({ Userid: localStorage.getItem("id") }));
    } catch (error) {
      console.log("the problem is in getting the address")
    }
   
    }, [dispatch]);


  const submitaddress = (e) => {
    e.preventDefault();
    dispatch(
      createaddress({Email:Value.Email,Name:Value.Name,Mobile:Value.Mobile,Altermobile:Value.Mobile,Pincode:Value.Pincode,
      Userid:localStorage.getItem("id") })
    ).then(()=>{
      dispatch(getaddress({ Userid: localStorage.getItem("id") }));
    })
    .catch((error) => {
      console.error("Error getting address:", error);
      // Handle error if needed
    });
  };

  const Editaddress=(idx)=>{
    console.log(idx,"the index is")
      navigate(`/Editaddress/${idx}`)
  }
  const Removeaddress = (idx) => {
    dispatch(deleteaddress({ Userid: localStorage.getItem("id"), Index: idx }))
      .then(() => {
        dispatch(getaddress({ Userid: localStorage.getItem("id") }));
      })
      .catch((error) => {
        console.error("Error deleting address:", error);
        // Handle error if needed
      });
  };
  
  const Usefordelivery=(idx)=>{
      dispatch(updateshippingaddress({Index:idx,Userid:localStorage.getItem("id")}))
      .then(()=>{
        dispatch(getshippingaddress({Userid:localStorage.getItem("id")}))
      })
      .catch(()=>{
        console.error("Error deleting");
      })
      navigate("/Confirmorder");
  }
 
  const Addnewaddress=()=>{
     navigate('/Editaddress');
  }

  

  return (
    <div className="Addressmaindiv" style={{backgroundColor:"#DFF5FF"}}>
       <div className="Addressproccess">
          <FontAwesomeIcon className="Addressproccessicons" style={{color:"red"}}icon={faTruck} />
          <hr style={{width:"40%",border:"1px solid black"}} />
          <FontAwesomeIcon className="Addressproccessicons"icon={faCheck} />
          <hr style={{width:"40%",border:"1px solid black"}}/>
          <FontAwesomeIcon className="Addressproccessicons"icon={faBuildingColumns} />
        </div>
      <div className="Addresscontainer">
       
        {Address.length > 0 ? (
          Address.map((address, idx) => {
            return (
              <div className="Addresspage" key={idx}>
                <form action="">
                  <span onClick={()=>Removeaddress(idx)}>X</span>
                  <div className="Addressinputdiv">
                    <p><strong>{address.Name}</strong></p>
                    <p>{address.House},{address.City } { address.Pincode}</p>
                    <p>{address.State},{address.Country}</p>
                   <p><strong>Mobile :</strong>{address.Mobile}</p>
                  </div>
                  <div className="Addressinputdiv">
                    <button onClick={()=>Editaddress(idx)}>Edit Address</button>
                    <button onClick={()=>Usefordelivery(idx)}>Use this for delivery</button>
                  </div>
                </form>
              </div>
            );
          })
        ) : (
          <div className="Addresspage">
            <form action="" onSubmit={submitaddress}>
              <div className="AddressEditinputdiv">
                <input
                  name="Name"
                  value={Value.Name}
                  type="text"
                  onChange={handleInput}
                  placeholder="Enter Name"
                />
                <input
                  name="Email"
                  value={Value.Email}
                  type="text"
                  onChange={handleInput}
                  placeholder="Enter Email"
                />
              </div>
              <div className="AddressEditinputdiv">
                <input
                  name="Mobile"
                  value={Value.Mobile}
                  type="text"
                  onChange={handleInput}
                  placeholder="Enter Mobile No."
                />
                <input
                  name="Altermobile"
                  value={Value.Altermobile}
                  type="text"
                  onChange={handleInput}
                  placeholder="Enter Alternate Mobile No."
                />
              </div>
              <div className="AddressEditinputdiv">
                <select
                  name="Country"
                  value={Value.Country}
                  id=""
                  onChange={handleInput}
                ></select>
                <select
                  name="State"
                  value={Value.State}
                  id=""
                  onChange={handleInput}
                ></select>
                <select
                  name="City"
                  value={Value.City}
                  id=""
                  onChange={handleInput}
                ></select>
              </div>
              <div className="AddressEditinputdiv">
                <input
                  name="Address"
                  value={Value.House}
                  type="text"
                  onChange={handleInput}
                  placeholder="Enter Address"
                />
                <input
                  name="Pincode"
                  value={Value.Pincode}
                  type="text"
                  onChange={handleInput}
                  placeholder="Enter Pincode"
                />
              </div>
              <div className="AddressEditinputdiv">
                <button type="reset">
                  Reset
                </button>
                <button type="submit">Use this Address</button>
              </div>
            </form>
          </div>
        )}
      </div>
      {Address.length > 0 ? (
        <button onClick={Addnewaddress} className="Addaddress">Add a New Address?</button>
      ) : (
        ""
      )}
    </div>
  );
}

export default Address;
