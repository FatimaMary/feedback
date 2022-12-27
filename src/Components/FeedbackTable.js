import React, { useState } from 'react';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';

const getDatafromEntry = ( ) => {
    const data = localStorage.getItem("feedback");
    if (data) {
      return JSON.parse(data);
    } else {
      return [];
    }
  };


function FeedbackTable() {
    const [click, setClick] = useState("")
    // const [accept, setAccept] = useState(false);
    // const [reject, setReject] = useState(false);
    const [data, setData] = useState(getDatafromEntry());

    const updateAcceptance = (id, value) => {
      const updatedArray = data.map((singleValue) => {
        console.log(id, singleValue.id);
        if (singleValue.id === id) {
          return {
            id: singleValue.id,
            name: singleValue.name,
            mobile: singleValue.mobile,
            rating: singleValue.rating,
            likeBtn: singleValue.likeBtn,
            comments: singleValue.comments,
            accepted: value,
          };
        } else {
          return singleValue;
        }
      });
      console.log(updatedArray);
      setData(updatedArray);
      localStorage.setItem("feedback", JSON.stringify(updatedArray));
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
            </tr>
          </thead>
          <tbody>
          {
              data.map((list) => (
                  <tr key={list} className='feedback-table'>
                    <td>{list.name}</td>
                    <td>{list.mobile}</td>
                    <td>{list.rating}</td>
                    <td>{list.likeBtn} </td>
                    <td>{list.comments}</td>
                    <td>
                    <div className='table-div-input'>
                      {
                       list.accepted === "Accepted" ? (<p>Accepted</p>) :list.accepted === "Rejected" ? (<p>Rejected</p>) : (<div><ThumbUpOffAltIcon value={click} onClick={() => updateAcceptance(list.id, "Accepted")}/>
                        <ThumbDownOffAltIcon  value={click} onClick={() => updateAcceptance(list.id, "Rejected")}/></div>)
                      }
                    </div>
                    </td>
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