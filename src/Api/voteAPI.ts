import axios from "axios";
import { Vote } from "../model/vote";

const MY_server='https://committeeb.com/'
// A mock function to mimic making an async request for data
export const get=(token:string)=>{
  return new Promise<{ data: Vote[] }>((resolve,reject) =>
    axios.get(MY_server+"vote/",{ headers: {
      'Authorization':`Bearer ${token}`
    }}).then(res => resolve({ data: res.data })).catch(error => {reject(error);})
  );
}
export const add=(vote:Vote,token:string)=>{
  return new Promise<{ data: Vote[] }>((resolve,reject) =>
    axios.post(MY_server+"vote/",vote,{ headers: {
      'Authorization':`Bearer ${token}`
    }}).then(res => resolve({ data: res.data })).catch(error => {reject(error);})
  );
}

export const editVote=(vote:Vote,token:string,profile:number)=>{
  return new Promise<{ data: Vote[] }>((resolve,reject) =>
    axios.put(MY_server+"vote/"+vote.id,{building_id:vote.building_id,profile_id:vote.profile_id.id,vote:vote.vote+1,answered:[profile]},{ headers: {
      'Authorization':`Bearer ${token}`
    }}).then(res => resolve({ data: res.data })).catch(error => {reject(error);})
  );
}
export const delVote=(id:number,token:string)=>{
  return new Promise<{ data: Vote[] }>((resolve,reject) =>
    axios.delete(MY_server+"vote/"+id,{ headers: {
      'Authorization':`Bearer ${token}`
    }}).then(res => resolve({ data: res.data })).catch(error => {reject(error);})
  );
}
export const winVote=(data:any)=>{
  return new Promise<{ data: Vote[] }>((resolve,reject) =>
    axios.put('http://127.0.0.1:8000/vote/win/'+data.win.id,{data},{ headers: {
      'Authorization':`Bearer ${data.token}`
    }}).then(res => resolve({ data: res.data })).catch(error => {reject(error);})
  );
}

