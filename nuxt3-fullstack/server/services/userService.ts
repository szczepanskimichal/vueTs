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
//  const emailExist=getUserByEmail(email)
//   const userNameExist=getUserByUsername(username)
 
  const emailExist=true
 const userNameExist=true
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