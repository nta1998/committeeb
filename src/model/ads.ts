export class Ads{
    id?:number
    Title:string=""
    Content:string=""
    Post_time?:string=""
    token:string=""
    building_id:number=-1
}
export class Pool{
    id?:number
    Question:string=""
    Title:string=""
    token:string=""
    answered?:number[]=[]
    yes:number=-1
    no :number=-1
    building_id:number=-1
}
export class Payads{
    id?:number
    Content:string=""
    Title:string=""
    price:number=0
    Post_time?:string=""
    token:string=""
    building_id:number=-1
}