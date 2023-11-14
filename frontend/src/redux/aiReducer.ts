

const initialState = {
    isLoadingNextQuestion: false,
    isLoadingInitial: false,
    isErrorInitial: false,
    interviewId: "",
    chatHistory: []
}
interface AiInit {
    isLoadingNextQuestion: boolean,
    isLoadingInitial: boolean,
    isErrorInitial: boolean,
    interviewId: string,
    chatHistory: string[]
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
        case "INTERVIEW_ID": return {
            ...state,
            interviewId: payload
        }
        case "CHAT_ARRAY": return {
            ...state,
            chatHistory: payload
        }
        default: return state
    }
}