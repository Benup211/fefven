"use client"

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useRouter } from 'next/navigation'
import useAuthStore from '@/state/admin/login-store'
import { Loader2 } from 'lucide-react'
import {toast} from '@/hooks/use-toast'

const schema = yup.object().shape({
  username: yup.string().required('Username is required'),
  password: yup.string().required('Password is required'),
})

export function LoginForm() {
  const { login,logout,isLoading } = useAuthStore()
  const router = useRouter()

  const { register, handleSubmit, setValue, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  })

  const onSubmit = async (data:any) => {
    const response= await login(data.username, data.password)
    if(response.success){
      toast({
        title:"Login Success",
        description:"You have successfully logged in",
      })
      router.push('/admin')
    }else{
      toast({
        title:"Login Failed",
        description:response.error,
        variant:"destructive"
      })
    }
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className='mx-auto'>Admin Login</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4"
         noValidate>
          <div>
            <Label htmlFor="username">Username</Label>
            <Input id="username" type='text' {...register('username')} placeholder="Enter your username" />
            {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username.message}</p>}
          </div>

          <div>
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" {...register('password')} placeholder="Enter your password" />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? <Loader2 className=" animate-spin w-4 h-4" /> : 'Login'}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

