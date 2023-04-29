import axios from "axios";
import { Vote } from "../model/vote";

const MY_server= process.env.REACT_APP_MY_SERVER
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
  console.log(data)
  return new Promise<{ data: any[] }>((resolve,reject) =>
    axios.put(MY_server+'vote/win/'+data.winer.id,{win:{'full_name': data.winer.full_name, 'bio': data.winer.bio, 'apartment': data.winer.apartment, 'phone_number': data.winer.phone_number, 'is_committee': true, 'monthly_payment': data.winer.monthly_payment,'building_id':data.winer.building_id.id},old:{'id':data.profile.id,'full_name': data.profile.full_name, 'bio': data.profile.bio, 'apartment': data.profile.apartment, 'phone_number': data.profile.phone_number, 'is_committee': false, 'monthly_payment': data.profile.monthly_payment,'building_id':data.profile.building_id.id}},{ headers: {
      'Authorization':`Bearer ${data.token}`
    }}).then(res => resolve({ data: res.data })).catch(error => {reject(error);})
  );
}

