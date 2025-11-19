import { getUserByEmail, getUserByUserName } from "~/server/database/respositories/userRespository";

type ExistsCheck={
  value:boolean
  message?:string
}

type RegistrationError={
  emailError?:string
  usernameError?:string
  // generalError?:string
}
export async function doesUserExist(email:string, username:string):Promise<ExistsCheck>{
const hasEmail=await getUserByEmail(email)
const hasUsername=await getUserByUserName(username)
const emailExist=hasEmail!==null
const userNameExist=hasUsername!==null
 const errors:RegistrationError={}
  if(emailExist){
    errors.emailError=`Email already in use ${email}`
  }
  if(userNameExist){
    errors.usernameError=`Username already in use ${username}`
  }
  if(emailExist || userNameExist){
    const message=JSON.stringify(errors)
    return {value:true, message}
  }
  return {value:false}
}