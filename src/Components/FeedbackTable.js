import React, { useEffect, useState } from 'react';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import DeleteIcon from "@mui/icons-material/Delete";
import { Rating } from '@mui/material';
import axios from 'axios';


function FeedbackTable() {
    const [click, setClick] = useState("")
    // const [accept, setAccept] = useState(false);
    // const [reject, setReject] = useState(false);
    const [data, setData] = useState([]);

    const fetchAllFeedbacks = () =>{
      axios.get("http://localhost:8081/feedback").then((response) => {
        console.log(response.data);
        setUpdatedFeedbacks(response.data);
      });
      
    };

    const updateAcceptance = (feedbackToUpdate, value) => {
      axios.put("http://localhost:8081/feedback",{
        id: parseInt(feedbackToUpdate.id),
        name: feedbackToUpdate.name,
        mobile:feedbackToUpdate.mobile,
        rating: parseInt(feedbackToUpdate.rating),
        recommendation: parseInt(feedbackToUpdate.recommendation),
        comments: feedbackToUpdate.comments,
        accepted: value
      })
      .then((response) => {
        fetchAllFeedbacks();
      })
      };
  

    const setUpdatedFeedbacks =(responseData) => {
      const feedbackList = responseData.map((singleFeedback) => {
        return {
          id: singleFeedback.id,
          name: singleFeedback.name,
          mobile: singleFeedback.mobile,
          rating: singleFeedback.rating,
          recommendation: singleFeedback.recommendation,
          comments: singleFeedback.comments,
          accepted: singleFeedback.accepted,
        };
      });
      setData(feedbackList);
    };

    useEffect(() => {
      fetchAllFeedbacks();
    }, []);
    

    const handleRemove = (idToDelete) => {
      console.log(idToDelete);
      console.log(parseInt(idToDelete));
      axios 
      .delete("http://localhost:8081/feedback", {
        data: {
          id: parseInt(idToDelete),
        },
      })
      .then((response) =>{
        console.log(response);
        fetchAllFeedbacks();
      });
    };

    
  return (
    <div className='feedback-container'>
        <h1>Feedback Table</h1>
        <table className='feedback-table'>
          <thead>
            <tr>
              <th>Name</th>
              <th>Mobile</th>
              <th>StarRating</th>
              <th>Recommended</th>
              <th>Comments</th>
              <th>Accepted</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
          {
              data.map((list) => (
                  <tr key={list.id} className='feedback-table'>
                    <td>{list.name}</td>
                    <td>{list.mobile}</td>
                    <td><Rating value={list.rating} readOnly/></td>
                    <td>{list.recommendation} </td>
                    <td>{list.comments}</td>
                    <td>
                    <div className='table-div-input'>
                      {
                       list.accepted === "Accepted" ? (<p>Accepted</p>) :list.accepted === "Rejected" ? (<p>Rejected</p>) : (<div><ThumbUpOffAltIcon style={{color: "green"}} value={click} onClick={() => updateAcceptance(list, "Accepted")}/>
                        <ThumbDownOffAltIcon style={{color: "red"}} value={click} onClick={() => updateAcceptance(list, "Rejected")}/></div>)
                      }
                    </div>
                    </td>
                    <td><DeleteIcon
                  onClick={() => handleRemove(list.id)}
                  className="deleteicon"
                ></DeleteIcon></td>
                  </tr>
              ))
          }
          </tbody>
        </table>
    </div>
  )
}

export default FeedbackTable


// c ? (ok) : ()