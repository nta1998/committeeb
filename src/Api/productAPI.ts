import axios from "axios";
const MY_server='https://committeeb.com/'
// A mock function to mimic making an async request for data
export const productget=(token:string)=>{
  return new Promise<{ data: any[] }>((resolve,reject) =>
    axios.get(MY_server+"product/",{ headers: {
      'Authorization': `Bearer ${token}`
    }}).then(res => resolve({ data: res.data })).catch(error => {reject(error);})
  );
}
export const productAdd=(product:File,token:string)=>{
  return new Promise<{ data: any }>((resolve,reject) =>
    axios.post(MY_server+"product/",product,{ headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'multipart/form-data'
    }}).then(res => {resolve({ data: res.data })}).catch(error => {reject(error);}))
  }
export const productDel=(id:number, token:string)=>{
  return new Promise<{ data: any }>((resolve) =>
    axios.delete(MY_server+"product/"+id,{ headers: {
      'Authorization': `Bearer ${token}`
    }}).then(res => resolve({ data: res.data }))
  );
}
