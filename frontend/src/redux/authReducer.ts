

const initialState = {
    isAuth: true,
    username: "",
    userId: "",
    token: ""
}

interface AuthInit {
    isAuth: boolean,
    username: string,
    userId: string,
    token: string
}

interface ActionObj {
    type: string,
    payload: string
}

export const authReducer = (state: AuthInit = initialState, {type, payload}:ActionObj)=>{
    switch(type){
        default: return state
    }
}