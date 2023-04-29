import axios from "axios";
import { Building } from "../model/building";


const MY_server= process.env.REACT_APP_MY_SERVER
// A mock function to mimic making an async request for data
export const getbuilding=(token:string,id:number)=>{
  return new Promise<{ data: any[] }>((resolve,reject) =>
    axios.get(MY_server+"building/"+id,{ headers: {
      'Authorization': `Bearer ${token}`
    }}).then(res => resolve({ data: res.data })).catch(error => {reject(error)})
  );
}
export const voteActiv=(bilding:Building,token:string)=>{
  console.log(bilding)
  return new Promise<{ data: Building }>((resolve,reject) =>
    axios.put(MY_server+"building/"+bilding.id,{
      full_address:bilding.full_address,
      floors:bilding.floors,
      vote_active:!bilding.vote_active,
      payment_date:bilding.payment_date,
      committee_name:bilding.committee_name,
      committee_apartment:bilding.committee_apartment,
      committee_phone:bilding.committee_phone,
      committee_monthly:bilding.committee_monthly},{ headers: {
      'Authorization': `Bearer ${token}`
    }}).then(res => resolve({ data: res.data })).catch(error => {reject(error)})
  );
}
export const editBuilding=(data:Building,token:string)=>{
  return new Promise<{ data: any[] }>((resolve,reject) =>
    axios.put(MY_server+"building/"+data.id,data,{ headers: {
      'Authorization': `Bearer ${token}`
    }}).then(res => resolve({ data: res.data })).catch(error => {reject(error)})
  );
}