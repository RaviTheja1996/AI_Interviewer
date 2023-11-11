import axios from "axios";
import { LOGINERROR, LOGINREQUEST, LOGINSUCCESSFUL } from "./actionType";

interface loginuserCredentials {
  email: string;
  password: string;
}

export const login = (payload: loginuserCredentials) => async (dispatch: any) => {
  dispatch({ type: LOGINREQUEST });
  try {
    const user = await axios.post("http://localhost:8080/login", payload); // i have to change the link aswell
    dispatch({ type: LOGINSUCCESSFUL, payload: user }); // i have to send user.data
    return user;
  } catch (error) {
    dispatch({ type: LOGINERROR });
  }
};
