const Validation = (data) => {

    let errors = {}; 
    if(!data.name){
        errors.name = "Name is required"
    }
    if(!data.mobile){
        errors.mobile = "mobile Number is required"
    } else if (data.mobile.length < 10){
        errors.mobile = "mobile Number Must contain 10digits"
    }
    if(!data.mail){
        errors.mail = "Email is required"
    } else if(!/\S+@\S+\.\S+/.test(data.mail)){
        errors.mail = "Email is Invalid"
    }
  return (
    errors
  );
}

export default Validation