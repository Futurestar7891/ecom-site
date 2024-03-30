
import  { useState } from 'react'
import { useDispatch } from 'react-redux';
import './Submitreview.css'
import ReactStars from "react-rating-stars-component";
import { Submitreview } from '../Redux/ReviewSlice';

function SubmitReview({onClose,productid}) {
    console.log(productid,"is here")

    const dispatch=useDispatch();

    const submitreview=()=>{
        dispatch(Submitreview({Userid:localStorage.getItem("id"),Productid:productid,Comment:message.Comment
    ,Rating:message.Rating,Img:localStorage.getItem("Img")}))
    }

    const [message,setmessage]=useState({
        Rating:"",
        Comment:"",
    })

    const options = {
        count: 5,
        value: 0,
        edit: true,
        activeColor: "orange",
        color: "#CCCCCC",
        isHalf: false,
        size: 4* window.innerWidth / 100,
        onChange: newValue => {
            setmessage(prevState => ({
                ...prevState,
                Rating: newValue
            }));
        }
    };

    const handecomment=(e)=>{
        
        setmessage({...message,[e.target.name]:e.target.value})
    }

    const Crossreview=()=>{
        onClose();
    }
  return (
    <div className='reviewmaindiv'>
        <div className='reviewcontainer'>
        <div className='reviewtop'>
        <span>Share Review</span>
        <span onClick={Crossreview}>X</span>
      </div>
      <hr className='reviewunderline'/>
      <div className='Reviewheading'>
        <h2>How was your Experience?</h2>
        <p>Your review will help us to improve our product and make it more durable to you </p>
      </div>
      <div className='Reviewrating'>
      <ReactStars {...options} className="ReviewStars"/>
      </div>
      <div className='reviewbox'>
        <textarea name= "Comment" maxLength="600" value={message.Comment} onChange={handecomment} placeholder='Share Feedback'/>
      </div>
      <div className='submitReview'>
        <button onClick={submitreview}>Submit</button>
      </div>
        </div>
     
    </div>
  )
}

export default SubmitReview
