export class ChatM{
    id?:number
    message:string=""
    profile_id:{
        "id":number,
        "building_id" :number,
        "user"  :number
        "full_name" : string
        "bio" : string
        "apartment":number
        "phone_number" : string
        "profile_pic" : string}={
        "id": -1,
        "building_id" :-1,
        "user"  :-1,
        "full_name" : "",
        "bio" : "",
        "apartment":-1,
        "phone_number" : "",
        "profile_pic" : "",
    }
    building_id:number=-1
    send_time?:string
}