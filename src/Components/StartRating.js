import React, { useState } from 'react'
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating'

function StartRating() {
    const [value, setValue] = useState(1);
    console.log(value);
  return (
    <Box sx={{"& > legend" : { mt: 2},}}>
        <Rating name="simple-controlled" value={value} onClick={(e) => setValue(e.target.value)} onChange={(e, newValue) => setValue(newValue)}/>
    </Box>
  )
}

export default StartRating