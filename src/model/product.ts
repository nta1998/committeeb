export class Product {
    id?:number
    name:string=""
    category:string=""
    price:number=-1
    product_pic:string=""
    profile_id:{
        id?:number
        profile_pic:String
        full_name:string
        building_id:number
        phone_number:string}={
            profile_pic:"",
            full_name:"",
            building_id:-1,
            phone_number:""}
    Description:string=""
}