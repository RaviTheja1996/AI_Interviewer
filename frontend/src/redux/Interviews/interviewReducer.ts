import axios from "axios"

interface chatmessage{
    role:String,
    content:String
}


interface interviewInterface {
    userId: String,
    type: String,
    chatHistory: Array<chatmessage>,
    communication: Number,
    subjectExpertise:Number,
}

const initialState:Array<interviewInterface>=[]



export const interviewReducer = (state = initialState, type:String)=>{
    switch(type){
       case "GET_DATA":
        {
            axios.get("http://localhost:4500/interview/").then((res)=> console.log(res.data))
            break;
         }
    

        default: return state

    }


}