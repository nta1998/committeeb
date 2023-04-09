import { User } from "../model/user";
import axios from "axios";
import { Profile } from "../model/profile";
const MY_server='https://committeeb.com/'
// A mock function to mimic making an async request for data
export const login=(user:User)=>{
  console.log(MY_server)
  return new Promise<{ data: any }>((resolve,reject) =>
    axios.post(MY_server+"login/",user).then(res => {
      resolve({ data: res.data });
    }).catch(error => {
      reject(error);
    }))
  }
export const refreshp=(refresh:string)=>{
  return new Promise<{ data: any }>((resolve,reject) =>
    axios.post(MY_server+"token/refresh/",{"refresh":refresh}).then(res => resolve({ data: res.data })).catch(error => {
      reject(error);
    }))
}
export const singup=(user:User,profile:Profile)=>{
  return new Promise<{ data: User }>((resolve) =>
    axios.post(MY_server+"singup/",{user,profile}).then(res => resolve({ data: res.data }))
  );
}

export const singupbuilding=(user:any)=>{
  return new Promise<{ data: User }>((resolve,reject) =>
    axios.post(MY_server+'singup/building',user).then(res => resolve({ data: res.data })).catch(error => {
      reject(error);
    }))
}
