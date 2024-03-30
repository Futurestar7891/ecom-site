import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useDispatch,} from "react-redux";
import { setFilter } from "../Redux/FilterSlice";
import { NavLink, useNavigate } from "react-router-dom";
import { faBagShopping, faCartShopping, faComment, faMagnifyingGlass, faPhone, faUser } from "@fortawesome/free-solid-svg-icons";
import "./Navbar.css";
import Profile from "../Profile/Profile";


function Navbar() {
  const Token=localStorage.getItem("Token");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState("");
  const [showprofile,setshowprofile]=useState(false);

  const handleInput = (e) => {
    setKeyword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      dispatch(setFilter({filterName:"page",filterValue:1}))
      dispatch(setFilter({ filterName: "keyword", filterValue: keyword }));
      navigate(`/Filters/${keyword}`);
      setKeyword("");
    }
  };

  const logout=()=>{
    localStorage.removeItem("Token")
    dispatch(setFilter({filterName:"keyword",filterValue:""}))
    dispatch(setFilter({filterName:"page",filterValue:1}))
    navigate('/')
    window.location.reload();
    
  }

  
  return (
    <div className="navbarmaindiv">
      <div className="navbarcontainer">
      
      <div className="navbarsearchdiv">
      <NavLink  to="/" className="shop">Ryan Shops</NavLink>
        <div className="navsearchform" id="navbarSupportedContent">
          <form onSubmit={handleSubmit}>
            <input type="search" placeholder="Search" aria-label="Search" value={keyword} onChange={handleInput} />
            <button className="btn" type="submit"><FontAwesomeIcon icon={faMagnifyingGlass} style={{marginRight:"1%"}}/></button>
          </form>
      </div>
      </div>
        <div className="navbarlists">
        <ul>
            {

             localStorage.getItem("Token")?<li>
              <NavLink className="navbarlink" activeClassName="active" exact to="/Carauselclick"><FontAwesomeIcon icon={faBagShopping} style={{marginRight:"5%"}}/> Products </NavLink>
            </li>:
            <li >
              <NavLink className="navbarlink" activeClassName="active" exact to="/Login"><FontAwesomeIcon icon={faUser} style={{marginRight:"5%"}}/> Login </NavLink>
            </li>
            }
            
            <li>
              {
                Token!=null? <NavLink className="navbarlink" activeClassName="active" to="/Cart"><FontAwesomeIcon icon={faCartShopping} style={{marginRight:"5%"}}/> Cart </NavLink>:
                <NavLink className="navbarlink" activeClassName="active" to="#"><FontAwesomeIcon icon={faCartShopping} style={{marginRight:"5%"}}/> Cart </NavLink>
              }
               
            </li>
            
            <li>
              <NavLink className="navbarlink" to="#"><FontAwesomeIcon icon={faPhone} style={{marginRight:"5%"}}/> Contact Us </NavLink>
            </li>
            <li onClick={logout}>
              <NavLink className="navbarlink" to="#"><FontAwesomeIcon icon={faComment} /> logout</NavLink>
            </li>
            {
              localStorage.getItem("Token")?<li>
              <NavLink className="navbarlink" onClick={()=>setshowprofile(true)}><img className="profile" src={localStorage.getItem("Img")} alt="" /></NavLink>
            </li>:""
            }
            
          </ul>
        </div>
          {
            showprofile && (<Profile onClose={()=>setshowprofile(false)}/>)
          }
        </div>
      
    </div>
  );
}

export default Navbar;
