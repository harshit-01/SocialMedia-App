import axios from "axios"
const url = "http://localhost:5000/api";
export const loginCall = async (userCredentials,dispatch)=>{
    dispatch({type:"LOGIN_START"})
    try{
        console.log(!1)
        const res = await axios.post(`${url}/auth/login`,userCredentials) ;
        dispatch({type:"LOGIN_SUCCESS",payload:res.data})
    }
    catch(err){
        dispatch({type:"LOGIN_FAILURE",payload:err})
        console.log(err.message)
    }
}