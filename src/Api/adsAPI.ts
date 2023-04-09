import axios from "axios";
import { Ads, Payads, Pool } from "../model/ads";

const MY_server='https://committeeb.com'
// A mock function to mimic making an async request for data
export const get=(token:string)=>{
  return new Promise<{ data: Ads[] }>((resolve,reject) =>
    axios.get(MY_server+"ads/",{ headers: {
      'Authorization': `Bearer ${token}`
    }}).then(res => resolve({ data: res.data })).catch(error => {reject(error)})
  );
}
export const add=(ads:Ads,token:string)=>{
  return new Promise<{ data: Ads[] }>((resolve,reject) =>
    axios.post(MY_server+"ads/",ads,{ headers: {
      'Authorization': `Bearer ${token}`
    }}).then(res => resolve({ data: res.data })).catch(error => {reject(error)})
  );
}
export const getPool=(token:string)=>{
  return new Promise<{ data: Pool[] }>((resolve,reject) =>
    axios.get(MY_server+"pool/",{ headers: {
      'Authorization': `Bearer ${token}`
    }}).then(res => resolve({ data: res.data })).catch(error => {reject(error)})
  );
}
export const addPool=(pool:Pool,token:string)=>{
  return new Promise<{ data: Pool[] }>((resolve,reject) =>
    axios.post(MY_server+"pool/",{Title:pool.Title,Question:pool.Question,yes:0,no:0,building_id:pool.building_id},{ headers: {
      'Authorization': `Bearer ${token}`
    }}).then(res => resolve({ data: res.data })).catch(error => {reject(error)})
  );
}
export const editPool=(pool:Pool,token:string,action:string,profile:string)=>{
  return new Promise<{ data: Pool[] }>((resolve,reject) =>
    axios.put(MY_server+"pool/"+pool.id,{Title:pool.Title,Question:pool.Question,yes:action === "yes"? pool.yes+1:pool.yes,no:action === "no"? pool.no+1:pool.no,building_id:pool.building_id,"answered":[profile] },{ headers: {
      'Authorization': `Bearer ${token}`
    }}).then(res => resolve({ data: res.data })).catch(error => {reject(error)})
  );
}
export const getPayAds=(token:string)=>{
  return new Promise<{ data: Payads[] }>((resolve,reject) =>
    axios.get(MY_server+"adsPay/",{ headers: {
      'Authorization': `Bearer ${token}`
    }}).then(res => resolve({ data: res.data })).catch(error => {reject(error)})
  );
}
export const addPayAds=(payads:Payads)=>{
  return new Promise<{ data: Payads[] }>((resolve,reject) =>
    axios.post(MY_server+"adsPay/",{Content:payads.Content,Title:payads.Title,price:payads.price,building_id:payads.building_id},{ headers: {
      'Authorization': `Bearer ${payads.token}`
    }}).then(res => resolve({ data: res.data })).catch(error => {reject(error)})
  );
}