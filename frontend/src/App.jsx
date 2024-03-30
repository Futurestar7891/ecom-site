// import "./App.css";
import { Route,Routes } from "react-router-dom"
import Signup from "./Forms/Signup";
import Login from "./Forms/Login";
import Home from "./HomePage/Home";
import Productdetails from "./ProductDetails/Productdetails";
import Productimages from "./ProductDetails/Productimages";
import Filters from "./Filterproducts/Filters";
import Carauselclick from "./Carauselclick/Carauselclick";
import Verifyotp from "./Forms/Verifyotp";
import Newpassword from "./Forms/Newpassword";
import Changepassword from "./Profile/Changepassword";
import Cart from "./Cart/Cart";
import Confirmproduct from "./Shipping/Confirmproduct";
import Address from "./Shipping/Address";
import Editaddress from "./Shipping/Editaddress";




function App() {
  return (
    <Routes>
   <Route path="/" Component={Home}/>
   <Route path="/Login" Component={Login}/>
   <Route path="/Signup" Component={Signup}/>
   <Route path="/Productdetails/:_id" Component={Productdetails}/>
   <Route path="/Productimages/:_id" Component={Productimages}/>
   <Route path="/Filters/:keyword" Component={Filters}/>
   <Route path="/Carauselclick" Component={Carauselclick}/>
   <Route path="/Verifyotp" Component={Verifyotp}/>
   <Route path="/Newpassword" Component={Newpassword}/>
   <Route path="/Changepassword" Component={Changepassword}/>
   <Route path="/Cart" Component={Cart}/>
   <Route path="/Shippingdetails" Component={Address}/>
   <Route path="/Confirmorder" Component={Confirmproduct}/>
   <Route path="/Editaddress/:idx" Component={Editaddress}/>
   <Route path="/Editaddress" Component={Editaddress}/>
      
      

  
   



 
 </Routes>
      
 
      

    
  )
}

export default App;
