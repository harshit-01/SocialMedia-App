import axios from "axios"
const url = "https://tieup-project.herokuapp.com/api";
export const loginCall = async (userCredentials,dispatch)=>{
    dispatch({type:"LOGIN_START"})
    try{
        const res = await axios.post(`${url}/auth/login`,userCredentials) ;
        dispatch({type:"LOGIN_SUCCESS",payload:res.data})
    }
    catch(err){
        dispatch({type:"LOGIN_FAILURE",payload:err})
        console.log(err.message)
    }
}