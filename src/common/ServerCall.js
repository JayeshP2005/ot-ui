import axios from "axios";
const BASE_URL="http://localhost:3030"

class ServerCall {
    static fnSendGetReq(url){
       return axios.get(BASE_URL+url,{
        headers : {
            Authorization : sessionStorage.token
        }
       })
    }
    static fnSendPostReq(url,data){
        return axios.post(BASE_URL+url,data)
    }
}

export default ServerCall;