

const initialState = {
    isLoadingNextQuestion: false,
    isLoadingInitial: false,
    isErrorInitial: false
}
interface AiInit {
    isLoadingNextQuestion: boolean,
    isLoadingInitial: boolean,
    isErrorInitial: boolean
}

interface ActionObj {
    type: string,
    payload: string
}


export const aiReducer = (state: AiInit = initialState, {type, payload}:ActionObj)=>{
    switch(type){
        case "INITIAL_LOAD_REQ": return {
            ...state,
            isLoadingInitial: true
        }
        case "INITIAL_LOAD_SUCC": return {
            ...state,
            isLoadingInitial: false
        }
        case "INITIAL_LOAD_FAIL": return {
            ...state,
            isLoadingInitial: false
        }
        default: return state
    }
}