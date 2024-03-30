import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import Slider from "react-slick";
import './Productimages.css'

function Productimages() {

    const { _id }=useParams();
    const[productimages,setproductimages]=useState(null);

    useEffect(()=>{
        const fetchimages = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/getproductbyid/${_id}`);
                const data = await response.json();
                console.log("the right answer is ",data.product.Images)
                setproductimages(data.product.Images);
            } catch (error) {
                console.error("Error fetching images:", error);
            }
        };
        
        fetchimages();
    },[_id])

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
      };
    
  return (
    <div className="Productimgmaindiv">
      <div className="Productimgdiv"  >
      <Slider {...settings}>
      
        {
            productimages && productimages.map((images,idx)=>{
                return (
                    
                    <img key={idx} className="Productimg" src={images.URL}alt={`Product Image ${idx + 1}`} />
               
                )
               
               
            })
        }
        
      </Slider>
      </div>
    </div>
  )
}

export default Productimages
