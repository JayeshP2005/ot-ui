export const appReducer = (state,action)=>{
    switch (action.type) {
        case "LOGIN":
                state = {
                    ...state,
                    isLoggedin : action.payload
                }
            break;
            case "LOGOUT":
                state = {
                    ...state,
                    isLoggedin : action.payload
                }
            break;
        }
        return state;

}