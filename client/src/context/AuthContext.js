import {createContext,useReducer,useEffect} from "react";
import AuthReducer from "./AuthReducer"
const INTIAL_STATE = {
    user:sessionStorage.getItem("user")|| null,
    isFetching : false,
    error:false
}

export const AuthContext = createContext(INTIAL_STATE);

export const AuthContextProvider = ({children})=>{
    const [state,dispatch] = useReducer( AuthReducer,INTIAL_STATE)
    // useEffect(()=>{
    //     sessionStorage.setItem("user",JSON.stringify((state.user?.username)))
    //   },[state.user])
    //   console.log(state.user)
    return(
        <AuthContext.Provider value={{user:state.user,isFetching:state.isFetching,error:state.error,dispatch}}>
            {children}
        </AuthContext.Provider>
    )
}