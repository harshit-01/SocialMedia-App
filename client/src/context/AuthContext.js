import {createContext,useReducer,useEffect} from "react";
import AuthReducer from "./AuthReducer"
const INTIAL_STATE = {
    user:sessionStorage.getItem("user")|| null,
    isFetching : false,
    error:false,
    name:false
}

export const AuthContext = createContext(INTIAL_STATE);

export const AuthContextProvider = ({children})=>{
    const [state,dispatch] = useReducer( AuthReducer,INTIAL_STATE)
    // useEffect(()=>{
    //     // sessionStorage.setItem("user",JSON.stringify((state.user?.username)))
    //     sessionStorage.setItem("name",JSON.stringify(state.name))
    //   },[state.name])
    //console.log(state)
    return(
        <AuthContext.Provider value={{user:state.user,isFetching:state.isFetching,error:state.error,name:state.name,dispatch}}>
            {children}
        </AuthContext.Provider>
    )
}