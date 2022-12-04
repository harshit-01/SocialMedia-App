import axios from "axios"

const url = "https://tieup.onrender.com/api";
// const url = "http://localhost:5000/api"
export const loginCall = async (userCredentials,dispatch)=>{
    dispatch({type:"LOGIN_START"})
    try{
        const res = await axios.post(`${url}/auth/login`,userCredentials) ;
        sessionStorage.setItem('user', userCredentials.username);
        sessionStorage.setItem('name', true);
        dispatch({type:"LOGIN_SUCCESS",payload:res.data})
    }
    catch(err){
        sessionStorage.setItem('name', false);
        dispatch({type:"LOGIN_FAILURE",payload:err})
        console.log(err.message)
    }
}