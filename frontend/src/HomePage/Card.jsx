import { NavLink } from "react-router-dom";
import "./Card.css";
import ReactStars from "react-rating-stars-component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faInr} from "@fortawesome/free-solid-svg-icons";




const Card = ({ product }) => {
  // Extract properties from the product object
  const {_id, Name, Images, Rating, Reviews,Description,Price} = product;


  
  // Define options for ReactStars component
  const options = {
    count: 5,
    value: Rating,
    edit: false,
    activeColor: "orange",
    color: "#CCCCCC",
    isHalf: true,
  };

  // Check if Reviews is defined and it's an array
  const reviewsCount = Array.isArray(Reviews) ? Reviews.length : 0;

  return (
    
    <NavLink className="Cardmaindiv" to={`/Productdetails/${_id}`} >
      <div className="Cardimgdiv">
      <img src={Images[0].URL} alt="..." />
      </div>
     <div className="Cardbodydiv">
        <p>{Name}</p>
        <p >{Description}</p>
          <div style={{display:"flex"}}>
          <ReactStars {...options} className="Stars"/>({Rating})
          </div>
          <span><FontAwesomeIcon icon={faInr}/>{Price}</span>
      </div>
    </NavLink>
  );
};

export default Card;
