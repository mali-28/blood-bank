import { regUserName, regEmail } from "../constants/constant";

export const getLocalStorage = (key) =>{
    try{
    if(key){
        const data = localStorage.getItem(key);
        console.log("data",data)
        if(data){
          
            return JSON.parse(data)
        }
    }
}
    catch(e){
        console.log({e})
    }
    return null
  
}

export const setLocalStorage = (key, data) =>{

    if(key && data){

        localStorage.setItem(key, JSON.stringify(data));
        
    }
}
  


export const validateUserName = (name) => {
    const value = typeof name === "string" ? name.trim() : "";
    if (!value) {
      return "required*";
    }
    if (value.length < 3) {
      return "Field should atleast be 3 chracters";
    }
    if (!regUserName.test(value)) {
      return "Field should only contains alphabets or numbers";
    }
    return "";
  };

  export const validateEmail = (email) => {
    const value = typeof email === "string" ? email.trim() : "";
    if (!value) {
      return "Email is required";
    } else if (!regEmail.test(value)) {
      return "Please Enter valid Email";
    }
    return "";
  };
  
  export const validatePassword = (pass) => {
    const value = typeof pass === "string" ? pass.trim() : "";
    if (!value) {
      return "Password is required";
    } else if (value.length < 6) {
      return "Password should atleast be 6 chracters";
    }
    return "";
  };

  export const validateZipCode = (zipcode) => {
    const value = typeof zipcode === "string" ? zipcode.trim() : "";
    if (!value) {
      return "Zip code is required";
    } else if (value.length !== 5) {
      return "zip-code must be 5 digit";
    }
    return "";
  };
  
  export const validateGender = (gender) => {
    const value = typeof gender === "string" ? gender.trim() : "";
    if (!value) {
      return "Gender field is required";
    }
    return "";
  };
  