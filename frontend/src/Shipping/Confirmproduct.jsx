import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faMinus,
  faPlus,
  faInr,
  faTruck,
  faBuildingColumns,
  faCheck
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { deleteProduct, updateQuantity } from "../Redux/BuyproductSlice";
import { useNavigate } from "react-router-dom";
import { getshippingaddress } from "../Redux/Shippingaddress";


function Confirmproduct() {
  const Shippingaddress=useSelector((state)=>state.Shippingaddress.Shippingaddress);
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const [subtotal,setsubtotal]=useState(0)
    const Buyproduct=useSelector((state)=>state.Buyproduct.Product);
    
    useEffect(() => {
      dispatch(getshippingaddress({Userid:localStorage.getItem("id")}))
        const totalAmount = () => {
          const total = Buyproduct.reduce((acc, product) => {
            return acc + product.Price;
          }, 0);
          setsubtotal(total);
        };
    
        totalAmount();
        Buyproduct.length===0?navigate('/'):""
      },[dispatch,Buyproduct,navigate]);

      const increase=(idx,Quantity)=>{
         dispatch(updateQuantity({idx:idx,Quantity:Quantity}))
      }
      const decrease=(idx,Quantity)=>{
        dispatch(updateQuantity({idx:idx,Quantity:Quantity}))
     }
     const handleQuantityChange=(idx,Quantity)=>{
        dispatch(updateQuantity({idx:idx,Quantity:Quantity}))
     }
     const delet=(idx)=>{
        dispatch(deleteProduct({idx:idx}))
     }

     
      
     
   
  return (
    <div className="Cartmaindiv" >
      <div className="Cartcontainer">
      <div className="Addressproccess" style={{backgroundColor:"#454545"}}>
        <FontAwesomeIcon className="Addressproccessicons" style={{color:"red"}} icon={faTruck}/>
        <hr style={{border:"1px solid red",width:"40%"}}/>
        <FontAwesomeIcon className="Addressproccessicons" style={{color:"red"}}icon={faCheck}/>
        <hr style={{border:"1px solid black",width:"40%"}}/>
        <FontAwesomeIcon className="Addressproccessicons" icon={faBuildingColumns}/></div>

        {Buyproduct.length > 0 ? (
          Buyproduct.map((product, idx) => {
            return (
              <div className="Cartproducts" key={idx}>
                <div className="cartimagediv">
                  <img src={product.Img.URL} alt="" />
                </div>
                <div className="Cartbody">
                <div className="cartproductname">{product.Name}</div>
                <div className="cartinput">
                  {product.Quantity > 1 ? (
                    <FontAwesomeIcon
                      className="Carticon"
                      icon={faMinus}
                      onClick={() => decrease(idx, product.Quantity - 1)}
                    ></FontAwesomeIcon>
                  ) : (
                    <FontAwesomeIcon
                      className="Carticon"
                      style={{color:"red"}}
                      icon={faTrash}
                      onClick={() => delet(idx)}
                    ></FontAwesomeIcon>
                  )}

                  <select
                    value={product.Quantity}
                    onChange={(e) => handleQuantityChange(idx, e.target.value)}
                  >
                    {[...Array(10).keys()].map((number) => (
                      <option key={number + 1} value={number + 1}>
                        {number + 1}
                      </option>
                    ))}
                  </select>

                  {
                    product.Quantity<10?<FontAwesomeIcon
                    className="Carticon"
                    icon={faPlus}
                    onClick={() => increase(idx, product.Quantity + 1)}
                  ></FontAwesomeIcon>:""
                  }
                </div>
                <div className="cartprice">
                  <FontAwesomeIcon icon={faInr} />{" "}
                  {parseFloat(product.Price).toFixed(2)}
                </div>
                <div className="cartdelete">
                  <FontAwesomeIcon 
                    className="Carticon"
                    style={{color:"red"}}
                    icon={faTrash}
                    onClick={() => delet(idx)}
                  ></FontAwesomeIcon>
                </div>
                </div>
               
              </div>
            );
          })
        ) : (
          <div className="nocart">Please first add item in cart</div>
        )}
        {Buyproduct.length > 0 ? (
          <div className="Subtotalandaddress">
            {
              Shippingaddress &&(<div className="finalshipaddress">
                <h3>{Shippingaddress.Name}</h3>
                <p>{Shippingaddress.House},{Shippingaddress.City} {Shippingaddress.State} {Shippingaddress.Pincode}
                ,{Shippingaddress.Country}</p>
                <p>Mobile No.{Shippingaddress.Mobile}</p>
              </div>)
            }
            <div className="finalsubtotal">
              <p>subtotal is :</p>
              <p><FontAwesomeIcon icon={faInr} />{parseFloat(subtotal).toFixed(2)}</p>
              
            </div>
            <div className="ConfirmProduct">
              <button className="buybtn">Confirm Order</button>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  )
}

export default Confirmproduct
