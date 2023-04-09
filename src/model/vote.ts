export class Vote{
    id?:number
    profile_id:{"full_name":string,"profile_pic":string,id:number}={full_name:"",profile_pic:"",id:-1}
    building_id?:number
    answered:number[]=[]
    vote:number=0
}

