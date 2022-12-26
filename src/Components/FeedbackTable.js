import React, { useState } from 'react'

const getDatafromEntry = ( ) => {
    const data = localStorage.getItem("feedback");
    if (data) {
      return JSON.parse(data);
    } else {
      return [];
    }
  };


function FeedbackTable() {
    const [data, setData] = useState(getDatafromEntry());
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
                    <td>{list.starrating}</td>
                    <td>{list.recommend}</td>
                    <td>{list.comments}</td>
                    <td></td>
                  </tr>
              ))
          }
          </tbody>
        </table>
    </div>
  )
}

export default FeedbackTable