import { useSelector, useDispatch } from "react-redux";
import "./Allfilters.css"; // Import your CSS file
import { useState } from "react";
import { setFilter } from "../Redux/FilterSlice";
// import { useNavigate } from "react-router-dom";

function Allfilters() {

  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.products);
  console.log(products)
  const [showFilters, setShowFilters] = useState(false); // State to track whether to show filters

  const toggleFilters = () => {
    setShowFilters(true); // Toggle the state to show/hide filters
  };

  const untoggleFilters = () => {
    setShowFilters(false); // Toggle the state to show/hide filters
  };

  const [filters, setFilters] = useState({
    minprice: 0,
    maxprice: 50000,
    brand: "",
    size: "",
    keyword: "",
    rating: 0,
    color: "",
  });

  const handleChange = (e) => {
       const{name,value}=e.target
       setFilters({...filters, [name]:value})
       dispatch(setFilter({filterName:name,filterValue:value}))
      
  };


  return (
    <div style={{display:"flex",alignItems:"center"}}> 
    <div className="filterbutton">
    <button  onClick={toggleFilters}>Filters</button>
    </div>
      
      {showFilters && (
        <div className="mainfilterdiv">
          
          <div className="filterall">
            <label>Brand: </label>
            
            <select name="brand" value={filters.brand} onChange={handleChange}>
            <option value="">Select Brand</option>
              {[...new Set(products.map((product) => product.Brand))].map((brand, idx) => (
                <option key={idx} value={brand}>
                  {brand}
                </option>
              ))}
            </select>
          </div>
         
          <div className="filterall">
            <label>Color: </label>
           
            <select name="color" value={filters.color} onChange={handleChange}>
            <option value="">Select Color</option>
              {[...new Set(products.map((product) => product.Color))].map((color, idx) => (
                <option key={idx} value={color}>
                  {color}
                </option>
              ))}
            </select>
          </div>
         
          <div className="filterall">
            <label>Rating: </label>
           
            <select name="rating" value={filters.rating} onChange={handleChange}>
            <option value="">Select Rating</option>
              {[...new Set(products.map((product) => product.Rating))].map((rating, idx) => (
                <option key={idx} value={rating}>
                  {rating}
                </option>
              ))}
            </select>
          </div>
         
          <div className="filterall">
            <label>Size: </label>
            
            <select name="size" value={filters.size} onChange={handleChange}>
            <option value="">Select Size</option>
              {[...new Set(products.map((product) => product.Size))].map((size, idx) => (
                <option key={idx} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </div>

          <div className="filterall">
          </div>
         
        </div>
      )}
      <div className="crossbutton">
      {showFilters &&(<button  onClick={untoggleFilters}>Clear</button>)}
      </div>
       
    </div>
  );
}

export default Allfilters;
