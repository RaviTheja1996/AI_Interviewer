import axios from "axios";
import { LOGINERROR, LOGINREQUEST, LOGINSUCCESSFUL } from "./actionType";
import React, { Dispatch } from "react";

export interface loginuserCredentials {
  email: string;
  password: string;
}


// export const login = (payload: loginuserCredentials) => async (dispatch : Dispatch) => {
//   dispatch({ type: LOGINREQUEST });
//   try {
//     await axios.post("http://localhost:4500/user/login", payload)
//     .then((res)=>{
//       dispatch({ type: LOGINSUCCESSFUL }); // i have to send user.data
    
//     }) // i have to change the link aswell
//   } catch (error) {
//     dispatch({ type: LOGINERROR });
//   }
// };
