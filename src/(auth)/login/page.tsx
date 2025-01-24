"use client";
import { useAuthStore } from '@/store/Auth'
import React from 'react'

function LoginPage ()  {
    const {login} = useAuthStore();
    const [isLoading, setIsLoading] = React.useState(false)
    const [error, setError] = React.useState("")

    const handleSubmit = async (e: React.FormEvent <HTMLFormElement>) => {
    e.preventDefault()
    //collecting the data
    const formData = new FormData(e.currentTarget)
    const email = formData.get("email")
    const password = fromData.get("password")

    //validating the data
    if(!email ||!password){
        setError(() => "Please fill all the fields")
        return
    }

    //handle loading and error
    setIsLoading(() => true)
    setError(() => "")
    
    //sending it to the store
    const loginResponse = await login(email?.toString(), password.toString())
    
    if(loginResponse.error){
        setError(() => loginResponse.error!.message)
    }
    setIsLoading(() => false)
    }
  return (
    <div>page</div>
  )
}

export default LoginPage