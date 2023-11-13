

const initialState = {
    isLoading: false
}
interface AiInit {
    isLoading: boolean
}

interface ActionObj {
    type: string,
    payload: string
}


export const aiReducer = (state: AiInit = initialState, {type, payload}:ActionObj)=>{
    switch(type){
        default: return state
    }
}