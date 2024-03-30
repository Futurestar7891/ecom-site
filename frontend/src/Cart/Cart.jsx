import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faMinus,
  faPlus,
  faInr,
} from "@fortawesome/free-solid-svg-icons";
import "./Cart.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteToCart, getFromCart, updateToCart } from "../Redux/CartSlice";
import { useNavigate } from "react-router-dom";
import { setmulProduct } from "../Redux/BuyproductSlice";

function Cart() {
  const navigate=useNavigate();
  const [subtotal, setsubtotal] = useState(0);
  const Cartdata = useSelector((state) => state.Cart.Cart);
  const dispatch = useDispatch();
  useEffect(() => {
    const Token = localStorage.getItem("id");
    if (Token != null) {
      dispatch(getFromCart({ Userid: localStorage.getItem("id") }));
    }
  }, [dispatch]);

  useEffect(() => {
    const totalAmount = () => {
      const total = Cartdata.reduce((acc, product) => {
        return acc + product.Price;
      }, 0);
      setsubtotal(total);
    };

    totalAmount();
  });
  const delet = async (idx) => {
    try {
      await dispatch(
        deleteToCart({ index: idx, Userid: localStorage.getItem("id") })
      );
      await dispatch(getFromCart({ Userid: localStorage.getItem("id") }));
    } catch (error) {
      console.log(error);
    }
  };

  const increase = async (idx, Quantity) => {
    await dispatch(
      updateToCart({
        Userid: localStorage.getItem("id"),
        Index: idx,
        Quantity: Quantity,
      })
    );
    await dispatch(getFromCart({ Userid: localStorage.getItem("id") }));
  };

  const decrease = async (idx, Quantity) => {
    await dispatch(
      updateToCart({
        Userid: localStorage.getItem("id"),
        Index: idx,
        Quantity: Quantity,
      })
    );
    await dispatch(getFromCart({ Userid: localStorage.getItem("id") }));
  };

  const handleQuantityChange = async (idx, Quantity) => {
    await dispatch(
      updateToCart({
        Userid: localStorage.getItem("id"),
        Index: idx,
        Quantity: Quantity,
      })
    );
    await dispatch(getFromCart({ Userid: localStorage.getItem("id") }));
  };

  const Buyproduct=()=>{
    dispatch(setmulProduct(Cartdata))
    navigate('/Shippingdetails')

  }
  return (
    <div className="Cartmaindiv">
      <div className="Cartcontainer">
        {Cartdata.length > 0 ? (
          <div className="subtotal">
            <div>
              subtotal is <FontAwesomeIcon icon={faInr} />
              {parseFloat(subtotal).toFixed(2)}
            </div>
            <div>
              <button onClick={Buyproduct}className="buybtn">Buy now</button>
            </div>
          </div>
        ) : (
          ""
        )}

        {Cartdata.length > 0 ? (
          Cartdata.map((product, idx) => {
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

                  <FontAwesomeIcon
                    className="Carticon"
                    icon={faPlus}
                    onClick={() => increase(idx, product.Quantity + 1)}
                  ></FontAwesomeIcon>
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
      </div>
    </div>
  );
}

export default Cart;
