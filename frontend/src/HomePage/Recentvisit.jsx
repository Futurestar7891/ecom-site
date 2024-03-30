import { NavLink } from "react-router-dom";
import "./Recentvisit.css";

function Recentvisit({ product }) {
  const {_id} = product;
  return (
    <NavLink to={`/Productdetails/${_id}`} className="Recentvisiteddiv">
      <img src={product.Images[0].URL} alt="" />
    </NavLink>
  );
}

export default Recentvisit;
