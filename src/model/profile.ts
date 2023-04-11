export class Profile{
    id?:number
    user:string=""
    bio:string=""
    apartment:string=""
    profile_pic:String=""
    full_name:string=""
    building_id?:{
        "id":number,
        "full_address":string,
        "floors":number,
        "vote_active": boolean,
        "committee_name" : string,
        "payment_date":Date,
        "committee_apartment" : number,
        "committee_phone" : string,
        "committee_monthly" : number
    }={"id":0,
    "full_address":"",
    "floors":0,
    "vote_active":false,
    "committee_name" : "",
    "payment_date":new Date(),
    "committee_apartment" : 0,
    "committee_phone" : "",
    "committee_monthly" : 0
    }
    phone_number:string=""
    is_committee?:boolean
    monthly_payment:boolean=false
}