import React, { useState } from 'react'
import StarRating from './StartRating';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';

const getDatafromEntry = () => {
    const entry = localStorage.getItem("feedback");
    if (entry) {
      return JSON.parse(entry);
    } else {
      return [];
    }
  };

function Feedbackform() {
    const [name, setName] = useState("");
    const [mobile, setMobile] = useState("");
    const [comments, setComments] = useState("");
    const [data, setData] = useState(getDatafromEntry());
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        let newFeedback = {
            id: data.length + 1,
            name,
            mobile,
            comments
        };
        setName("");
        setMobile("");
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
                <label>Name: </label>
                <input type='text' name='name' value={name} onChange={(e) => setName(e.target.value)} className='form-div-input'/>
            </div>
            <div className='form-div'>
                <label className='form-div-label'>Mobile:</label>
                <input type='text' name='mobile' value={mobile} onChange={(e) => setMobile(e.target.value)} className='form-div-input'/>
            </div>
            <div className='form-div'>
                <label className='form-div-label'>How do you rate our Service?</label>
                {/* <FontAwesomeIcon icon="fa-regular fa-star" />
                <FontAwesomeIcon icon="fa-regular fa-star" />
                <FontAwesomeIcon icon="fa-regular fa-star" />
                <FontAwesomeIcon icon="fa-regular fa-star" />
                <FontAwesomeIcon icon="fa-regular fa-star" /> */}
                <StarRating className='form-div-input'/>
            </div>
            <div className='form-div'>
                <label className='form-div-label'>Will you recommend us to Friends?</label>
                <div className='form-div-input'>
                    <ThumbUpOffAltIcon/>
                    <ThumbDownOffAltIcon/>
                </div>
            </div>
            <div className='form-div'>
                <label className='form-div-label'>Comments</label>
                <textarea className='form-div-input' value={comments} onChange={(e) => setComments(e.target.value)}/>
            </div>
            <div className='form-div'>
                <button className='form-div-input'>Submit</button>
            </div>
        </form>
    </div>
  )
}

export default Feedbackform