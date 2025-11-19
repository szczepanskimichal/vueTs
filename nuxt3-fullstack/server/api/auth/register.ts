import { CompatibilityEvent, sendError } from 'h3'
import bcrypt from 'bcrypt'
import { IUser } from '~~/types/IUser'
import { doesUserExist } from '~~/server/services/userService'

export default async (event: CompatibilityEvent) => {
  const body=await useBody(event)
  const name=body.name
  const username=body.username
  const email=body.email
  const password=body.password

  const userExists=await doesUserExist(email, username)
  if(userExists){
    return sendError(event, createError({statusCode:422, statusMessage:'User exists', data:userExists.message}))
  }
  const encryptedPassword:string=await bcrypt.hash(password, 10)
  const userData={
    username:username,
    name:name,
    email:email,
    password:encryptedPassword
  }
  const user=await createUser(userData)
  return await createSession(event, user.id)

}