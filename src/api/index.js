import requests from "@/api/request";
import axios from "axios";
export const getCode=()=>{//此文件中采用分别暴露，不是默认暴露，应用时要加  {  }
    return requests({
        url:'http://localhost:8081/ssm/getCodeImg',
        method:'get',
        responseType: "arraybuffer",
    })
}
export const registe=(data)=>{
    return requests({
        url:`http://localhost:8081/ssm/HandleUserRegister`,
        method:"post",
        data:data
    })
}
export const checkName=(name)=>{
    return axios({
        params:{username:name},
        method:'get',
        url:'http://localhost:8081/ssm/CheckName'
    })
}