import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SubmitReview from "./Submitreview";
import { faInr } from "@fortawesome/free-solid-svg-icons";
import { NavLink, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ReactStars from "react-rating-stars-component";
import "./Productdetails.css";
import { visited } from "../Redux/Recentslice";
import { addToCart } from "../Redux/CartSlice";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { setProduct } from "../Redux/BuyproductSlice";

const ProductDetails = () => {
  const navigate = useNavigate();
  const useref = useRef(null);
  const dispatch = useDispatch();
  const { _id } = useParams();
  const [productdetails, setProductDetails] = useState(null);
  const [showreview, setshowreview] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(
          `https://ecom-site-backend.vercel.app/api/getproductbyid/${_id}`
        );
        const data = await response.json();
        setProductDetails(data.product); // Assuming the API response contains a "product" object
        dispatch(visited(data.product));
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    fetchProduct();
  }, [_id, dispatch]);

  const AddToCart = (e) => {
    e.preventDefault();
    const Cartdata = {
      Name: productdetails.Name,
      Quantity: 1,
      Img: productdetails.Images[0],
      Id: productdetails._id,
      Price: productdetails.Price,
    };
    const Token = localStorage.getItem("Token");
    if (Token != null) {
      dispatch(
        addToCart({ Cartdata: Cartdata, Userid: localStorage.getItem("id") })
      );
    } else {
      alert("please login first");
    }
  };

  const Reviewbutton = (ref) => {
    setshowreview(true);
    ref.current.scrollIntoView({ behavior: "smooth" });
  };

  const Buynow = () => {
    dispatch(
      setProduct({
        Name: productdetails.Name,
        Quantity: 1,
        Img: productdetails.Images[0],
        Price: productdetails.Price,
      })
    );
    navigate(`/Shippingdetails`);
  };

  // Define settings for the carousel
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const options = {
    count: 5,
    value: productdetails ? productdetails.Rating : 0,
    edit: false,
    activeColor: "orange",
    color: "#CCCCCC",
    isHalf: true,
    size: 20,
  };

  const reviewsCount = productdetails
    ? Array.isArray(productdetails.Reviews)
      ? productdetails.Reviews.length
      : 0
    : 0;
  const reviewusers = productdetails
    ? Array.isArray(productdetails.Reviews)
      ? productdetails.Reviews
      : 0
    : 0;
  return (
    <div className="Productdetailmaindiv">
      {productdetails && (
        <div className="Productdetailcontainer">
          <div className="Productdetaildiv">
            <div className="Productdetailimages">
              <NavLink
                className="Productdetaillink"
                to={`/Productimages/${_id}`}
              >
                <Slider {...settings}>
                  {productdetails.Images.map((image, index) => (
                    <img
                      className="Productdetailimg"
                      key={index}
                      src={image.URL}
                      alt={`Product Image ${index + 1}`}
                    />
                  ))}
                </Slider>
              </NavLink>
            </div>
            <div className="Productdetails">
              <div className="Prouductdetailnameandrating">
                <div className="Productdetailname">
                  <strong>Name:</strong>
                  {productdetails.Name}
                </div>
                <div className="Productdetailrating">
                  <ReactStars {...options} /> {reviewsCount}
                </div>
              </div>
              <div className="Productdescription">
                <strong>Description:</strong> {productdetails.Description}
              </div>

              <div className="Productdetailprice">
                <strong>Price :</strong> <FontAwesomeIcon icon={faInr} />{" "}
                {productdetails.Price}
              </div>
              <div className="Cartbuttons">
                <button onClick={AddToCart}>Add to Cart</button>
                <button onClick={Buynow}>Buy Now</button>
              </div>
              <div className="Reviewbutton">
                <button onClick={() => Reviewbutton(useref)}>
                  Give Review
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {showreview ? (
        <div ref={useref}>
          <SubmitReview onClose={() => setshowreview(false)} productid={_id} />
        </div>
      ) : (
        <div className="userreviewmaindiv">
          {reviewusers ? (
            reviewusers.map((views, index) => (
              <div className="userreviews" key={index}>
                <div className="userreiviewsimgdiv">
                  <img className="userreviewprofile" src={views.Image} alt="" />
                </div>

                <div className="userreviewname">{views.Name}</div>
                <div className="userreviewrating">
                  <ReactStars
                    count={5}
                    value={views.Rating}
                    edit={false}
                    isHalf={true}
                    activeColor="orange"
                    color="#CCCCCC"
                    size={25}
                  />
                </div>
                <div className="userreviewcomment">{views.Comment}</div>
              </div>
            ))
          ) : (
            <div className="noreviews">Loading.....</div>
          )}
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
