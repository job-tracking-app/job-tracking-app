import axios from "axios"

const initialState = {
   isAuthenticated: false,
   errorMessage: "" 
}

//Action Types

const SIGN_UP = "SIGN_UP"



//Action Creator

export function signup(email, password){
    return {
        type : SIGN_UP,
        payload : axios.post("/user/signup", {email, password}).then(res => console.log(res))
    }
}


export default function reducer (state= initialState, action){
    switch(action.type){
        case `${SIGN_UP}_FULFILLED`:
            return {
                ...state,
                isAuthenticated:true,
                errorMessage: " "
            }
        default:
            return state;
    }
}
