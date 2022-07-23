import { USER_LOGIN_FAIL, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS } from "../constants/userConstants"
import axios from 'axios'
export const login = (email,password) => async (dispatch) => {
    try {
        dispatch({
            type:USER_LOGIN_REQUEST
        })
        // when sedning data we want to set header content to be json
        const config = {
            headers:{
                'Content-Type':"application/json"
            }
        }

        const {data} = await axios.post('/api/users/login',{email,password},config)

        dispatch({
            type:USER_LOGIN_SUCCESS,
            payload:data
        })

        // saving user in the local storage so as to restore session / page when it comes again after some time 
        localStorage.setItem('userInfo',JSON.stringify(data))

    } catch (error) {
        dispatch({
            type: USER_LOGIN_FAIL,
            payload:
              error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
          });       
    }
}