import axios from "axios";
import { Profile } from "../model/profile";
import { post } from "../model/post";
const MY_server= process.env.REACT_APP_MY_SERVER
// A mock function to mimic making an async request for data

export const profileget=(token:string)=>{
  return new Promise<{ data: Profile[] }>((resolve) =>
    axios.get(MY_server+"profile/",{ headers: {
      'Authorization':`Bearer ${token}`
    }}).then(res => resolve({ data: res.data }))
  );
}
export const profilegetall=(token:string)=>{
  return new Promise<{ data: Profile[] }>((resolve) =>
    axios.get(MY_server+"profile/All",{ headers: {
      'Authorization':`Bearer ${token}`
    }}).then(res => resolve({ data: res.data }))
  );
}
export const editprofile=(profile:Profile,token:string,id:number)=>{
  return new Promise<{ data: post[] }>((resolve) =>
    axios.put(MY_server+"profile/"+id,profile,{ headers: {
      'Authorization':`Bearer ${token}`
    }}).then(res => resolve({ data: res.data }))
  );
}
export const editPayprofile=(profile:Profile,token:string)=>{
  return new Promise<{ data: post[] }>((resolve) =>
    axios.put(MY_server+"profile/"+profile.id,{"full_name":profile.full_name,"phone_number":profile.phone_number,"monthly_payment":true},{ headers: {
      'Authorization':`Bearer ${token}`
    }}).then(res => resolve({ data: res.data }))
  );
}
export const add=(post_img:File,token:string)=>{

  return new Promise<{ data: any }>((resolve,reject) =>
    axios.post(MY_server+"profile/",post_img,{ headers: {
      'Authorization':`Bearer ${token}`,
      'Content-Type': 'multipart/form-data'
    }}).then(res => {
      resolve({ data: res.data });
    }).catch(error => {
      reject(error);
    }))
  }
