import { useSelector, useDispatch } from "react-redux";
import Category from "../HomePage/Category";
import Navbar from "../HomePage/Navbar";
import { useEffect } from "react";
import { fetchCategory } from "../Redux/CategorySlice";
import Card from "../HomePage/Card";
import { fetchProducts } from "../Redux/ProductSlice";
import Page from "../HomePage/Page";
import './Carauselclick.css'

function Carauselclick() {
  const {page,keyword, minprice, maxprice, color, brand, rating, size } = useSelector((state) => state.filter.filters);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCategory());
    dispatch(fetchProducts({page,keyword, minprice,maxprice, brand, color, size, rating }));
  }, [dispatch,page,keyword, minprice,maxprice, brand, color, size, rating]);
  const category = useSelector((state) => state.category.category);
  const products = useSelector((state) => state.product.products);
  return (
    <div style={{ backgroundColor: "#EEEDEB" }}>
      <Navbar />
      <div className="Carauselcategorymaindiv">
        {category.map((category, index) => {
          return <Category key={index} category={category} />;
        })}
      </div>
      <div>
        {products.length > 0 ? (
          <h2 className="producthomeheading">Products</h2>
        ) : (
          ""
        )}
        {products.length > 0 ? <hr className="producthomeunderline"></hr> : ""}
        <div className="Cardhomediv">
          {products.length > 0
            ? products.map((product, index) => {
                return <Card key={index} product={product} />;
              })
            : ""}
        </div>
      </div>

      <div>
      {products.length>0? <Page />:""}
      </div>
      

    </div>
  );
}

export default Carauselclick;
