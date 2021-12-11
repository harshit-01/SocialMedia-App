const AuthReducer = (state,action)=>{
    switch(action.type){
        case "LOGIN_START" :
            return{
                user:null,
                isFetching:true,
                error:false,
                name:false
            }
        case "LOGIN_SUCCESS" :
            return{
                user:action.payload,
                isFetching:false,
                error:false,
                name:true
            }
        case "LOGIN_FAILURE" :
            return{
                user:null,
                isFetching:false,
                error:action.payload,
                name:false
            }
        default:
            return state
    }

}
export default AuthReducer