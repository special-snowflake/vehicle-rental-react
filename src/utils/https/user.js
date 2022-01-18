import axios from "axios";

const URL = process.env.REACT_APP_HOST+'/user'

export const getUserData=(id)=>{
    const urlGetData = URL+'/detail/'+id;
    return axios.get(urlGetData);
}