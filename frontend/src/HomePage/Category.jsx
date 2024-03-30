import { NavLink } from "react-router-dom";
import './Category.css'


function Category({category}) {

    const {Name,Image}=category;
  return (
   <NavLink to={`/Filters/${Name}`} style={{textDecoration:"none"}}>
    <div className="categorydiv">
    <img src={Image} alt="" />
    <p>{Name}</p>
    </div>
   
   </NavLink>
  )
}

export default Category
