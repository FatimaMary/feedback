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
    const [accept, setAccept] = useState(false);
    const [reject, setReject] = useState(false);
    const [data, setData] = useState(getDatafromEntry());

    const acceptValue = (id) => {
        console.log("clicked")
            // alert("Accepted")
           setAccept(true)
          //  <p>accepted</p>
    }
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
                       list.accepted === accept ? (<p>Accepted</p>) : (reject ? (<p>Rejected</p>) : (<div><ThumbUpOffAltIcon value={click} onClick={(e) => setAccept("Accepted")}/>
                        <ThumbDownOffAltIcon  value={click} onClick={(e) => setReject("Rejected")}/></div>))
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