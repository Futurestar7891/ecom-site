import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../HomePage/Navbar";
import Page from "../HomePage/Page";
import Card from "../HomePage/Card";
import { fetchProducts } from "../Redux/ProductSlice";
import Allfilters from "./Allfilters";
import './Filters.css'
import { setFilter } from "../Redux/FilterSlice";

function Filters() {
  const { keyword } = useParams();
  const dispatch = useDispatch();
  const {page, minprice, maxprice, color, brand, rating, size } = useSelector((state) => state.filter.filters);
  const products = useSelector((state) => state.product.products);

  useEffect(() => {
    dispatch(setFilter({filterName:"page",filterValue:1}))
    dispatch(fetchProducts({page,keyword, minprice,maxprice, brand, color, size, rating }));
  }, [dispatch,page,keyword, minprice, maxprice,brand,color,size,rating]);

  return (
    <div className="Filtermaindiv"  style={{backgroundColor:"#EEEDEB"}}>
      <div>
        <Navbar />
      </div>
      <div className="Filters">
        {products && products.length > 0 && <Allfilters />}
      </div>
      <div className="Cardhomediv">
        {products && products.length > 0 ? (
          products.map((product, index) => <Card key={index} product={product} />)
        ) : (
          <h1 style={{ marginTop: "100px" }}>No products found</h1>
        )}
      </div>

      <div style={{ marginTop: "20vh" }}>
        {products && products.length > 0 && <Page />}
      </div>

    </div>
  );
}

export default Filters;
