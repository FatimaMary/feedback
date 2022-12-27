import React, { useState } from 'react'
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/system';
import { Rating } from '@mui/material';

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
    const [rating, setRating] = useState();
    const [likeBtn, setLikeBtn] = useState("");
    const [comments, setComments] = useState("");
    const [data, setData] = useState(getDatafromEntry());
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        let newFeedback = {
            id: data.length + 1,
            name,
            mobile,
            rating,
            likeBtn,
            comments
        };
        setName("");
        setMobile("");
        setRating("");
        setLikeBtn("");
        setComments("");

        localStorage.setItem("feedback", JSON.stringify([...data, newFeedback]));
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
            </div>
            <div className='form-div'>
                <label className='form-div-label'>Mobile:</label>
                <input type='text' name='mobile' value={mobile} onChange={(e) => setMobile(e.target.value)} className='form-div-input'/>
            </div>
            <div className='form-div'>
                <label className='form-div-label'>How do you rate our Service?</label>
                <Box sx={{"& > legend" : { mt: 2},}}>
                    <Rating name="simple-controlled" value={rating} className='form-div-input' onClick={(e) => setRating(e.target.value)} onChange={(e, newValue) => setRating(newValue)}/>
                </Box>
            </div>
            <div className='form-div'>
                <label className='form-div-label'>Will you recommend us to Friends?</label>
                <div className='form-div-input'>
                    <ThumbUpOffAltIcon className='likeBtn' value={likeBtn} onClick={() => setLikeBtn("yes")}/>
                    <ThumbDownOffAltIcon className='dislikebtn' value={likeBtn} onClick={() => setLikeBtn("No")}/>
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