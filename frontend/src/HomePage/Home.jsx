import { useEffect } from "react";
import Navbar from "./Navbar";
import Start from "./Start";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../Redux/ProductSlice";
import Card from "./Card";
import Page from "./Page";
import Category from "./Category";
import { fetchCategory } from "../Redux/CategorySlice";
import Recentvisit from "./Recentvisit";
import "./Home.css";
import { getFromCart } from "../Redux/CartSlice";
import { setFilter } from "../Redux/FilterSlice";


function Home() {
  const dispatch = useDispatch();
  const {page,keyword, minprice, maxprice, color, brand, rating, size } = useSelector((state) => state.filter.filters);
  useEffect(() => {
    dispatch(setFilter({ filterName: "keyword", filterValue:"" }));
    dispatch(setFilter({ filterName: "color", filterValue:"" }));
    dispatch(setFilter({ filterName: "size", filterValue:"" }));
    dispatch(setFilter({ filterName: "rating", filterValue:"" }));
    dispatch(setFilter({ filterName: "brand", filterValue:"" }));
    dispatch(setFilter({ filterName: "minprice", filterValue:0 }));
    dispatch(setFilter({ filterName: "maxprice", filterValue:50000 }));
    dispatch(fetchProducts({page,keyword, minprice,maxprice, brand, color, size, rating }));
    dispatch(fetchCategory());
  
    const token = localStorage.getItem("Token");
    if (token!=null) {
      dispatch(getFromCart({Userid:localStorage.getItem("id")}));
    }
    
  }, [dispatch,page,keyword, minprice, maxprice,brand,color,size,rating]);

  const products = useSelector((state) => state.product.products);
  const productloading=useSelector((state)=>state.product.loading);
  const category = useSelector((state) => state.category.category);
  const visitedproduct = useSelector((state) => state.visited.product);
  console.log(visitedproduct);

  return (
    <div style={{backgroundColor:"#EEEDEB"}}>
      <div>
        <Navbar />
      </div>

      <div className='Categoryhomediv'>
        {category.map((category, index) => {
          return <Category key={index} category={category} />;
        })}
      </div>
      <div className="HomeStartdiv">
        <Start />
      </div>

      <div className="HomeContainers">
        {visitedproduct.length > 0 ? <h2 className="recenthomeheading">Continue Shopping...</h2> : ""}

        <div className="Recentvisitdiv">
        {visitedproduct.length > 0
            ? visitedproduct.map((product, index) => {
                return <Recentvisit key={index} product={product} />;
              })
            : ""}
        </div>
          
        </div>

      <div className={productloading===true?"shimmer":"HomeContainers"}>
        {products && products.length > 0 ? <h2 className="producthomeheading">Products</h2> : ""}
        {products && products.length > 0 ? <hr className="producthomeunderline"></hr> : ""}
        <div className="Cardhomediv">
          {products &&
            products.map((product, index) => {
              return <Card key={index} product={product} />;
            })}
        </div>
      </div>

      <div className="HomeContainers">
        {
          products && products.length>0? <Page />:""
        }
       
      </div>
    </div>
  );
}

export default Home;
