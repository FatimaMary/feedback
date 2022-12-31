import React, { useState } from 'react'
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/system';
import { Rating } from '@mui/material';
import Validation from './Validation';
import axios from 'axios';

const getDatafromEntry = () => {
    const entry = localStorage.getItem("feedback");
    if (entry) {
      return JSON.parse(entry);
    } else {
      return [];
    }
  };

function Feedbackform( ) {
    const [name, setName] = useState("");
    const [mobile, setMobile] = useState("");
    const [rating, setRating] = useState("");
    const [recommendation, setRecommendation] = useState();
    const [comments, setComments] = useState("");
    const [data, setData] = useState(getDatafromEntry());
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});

    

    const handleSubmit = (e) => {
        e.preventDefault();
        axios
            .post("http://localhost:8081/feedback", {
                name: name,
                mobile: mobile,
                rating: parseInt(rating),
                recommendation: parseInt(recommendation),
                comments: comments,
            })
            .then((response) => {
                console.log(response);
                navigate("/table")
            })
        let newFeedback = {
            id: data.length + 1,
            name,
            mobile,
            rating,
            recommendation,
            comments,
            accepted: ""
        };
        setName("");
        setMobile("");
        setRating("");
        setRecommendation("");
        setComments("");
        setErrors(Validation(data));

        // localStorage.setItem("feedback", JSON.stringify([...data, newFeedback]));
        setData();
        navigate("/table")
    }

  return (
    <div className='form-container'>
        <form onSubmit={handleSubmit} className='feedback-form'>
            <h1 className='form-head'>Feedback Form</h1>
            <div className='form-div'>
                <label className='form-div-label'>Name: </label>
                <input type='text' name='name' value={name} onChange={(e) => setName(e.target.value)} className='form-div-input'/>
                {errors.name && <p className="error">{errors.name}</p>}
            </div>
            <div className='form-div'>
                <label className='form-div-label'>Mobile:</label>
                <input type='text' name='mobile' value={mobile} onChange={(e) => setMobile(e.target.value)} className='form-div-input'/>
                {errors.mobile && <p className="error">{errors.mobile}</p>}
            </div>
            <div className='form-div'>
                <label className='form-div-label'>How do you rate our Service?</label>
                <Box sx={{"& > legend" : { mt: 2},}}>
                    <Rating name="simple-controlled" value={rating} className='form-div-input' onClick={(e) => setRating(e.target.value)} onChange={(e, newValue) => setRating(newValue)}/>
                </Box>
            </div>
            <div className='form-div'>
                <label className='form-div-label'>Will you recommend us to Friends?</label>
                <div className='form-div-input-icon'>
                    <ThumbUpIcon className='likeBtn' style={{color: recommendation === "1" ? "green" : "black"}}  value={recommendation} onClick={() => setRecommendation("1")} />
                    <ThumbDownIcon className='dislikebtn' style={{color: recommendation === "0" ? "red" : "black"}} value={recommendation} onClick={() => setRecommendation("0")}/>
                </div>
            </div>
            <div className='form-div'>
                <label className='form-div-label'>Comments</label>
                <textarea className='form-div-input' value={comments} onChange={(e) => setComments(e.target.value)} />
            </div>
            <div className='form-btn'>
                <button className='form-div-btn'>Submit</button>
            </div>
        </form>
    </div>
  )
}

export default Feedbackform