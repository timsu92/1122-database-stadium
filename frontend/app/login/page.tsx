'use client'

import React, { useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import axios from 'axios'

const Login: React.FC = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [serverError, setServerError] = useState<string | null>(null)
  const [successLogin, setSuccessLogin] = useState(false)
  // const router = useRouter()

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    try {
      const response = await axios.post('http://localhost:8080/auth/login', {
        email,
        password,
      })

      if (response.status === 401 || response.status === 500) {
        alert('Error: ' + response.data.message)
      } else if (response.status === 200) {
        const { email, role, jwtToken } = response.data
        localStorage.setItem('token', jwtToken)
        console.log('Logged in user info:', { email, role })
        alert('Logged in success')
        setSuccessLogin(true)
        // router.push('/activity') // Navigate to activity page
      }
    } catch (error) {
      console.error('There was an error submitting the form!', error)
      setServerError(
        'There was an error submitting the form. Please try again.'
      )
    }
  }

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <div className="flex min-h-screen items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Log in
            </h2>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="rounded-md shadow-sm -space-y-px">
              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700">
                  Email:
                </label>
                <Input
                  type="email"
                  id="email-address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email Address"
                  className="relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  required
                />
              </div>
              <div className="mb-4 relative">
                <label htmlFor="password" className="block text-gray-700">
                  Password:
                </label>
                <Input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className="relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  required
                />
                <div
                  className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                </div>
              </div>
            </div>
            <Button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              disabled={successLogin ? true : false}
            >
              Login
            </Button>
            {/* <Link href="/activity/">
              <Button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Login
              </Button>
            </Link> */}
          </form>
          <div className="mt-2 text-center">
            <Link href="/sign_up/">
              <p className="text-indigo-600 hover:text-indigo-900">
                Don't have an account? Sign up
              </p>
            </Link>
          </div>
          {serverError && (
            <div className="mt-4 text-center text-red-500">{serverError}</div>
          )}
          {successLogin && (
            <div className="mt-2 text-center">
              <Link href="/activity/">
                <p className="text-indigo-750 hover:text-indigo-900">
                  Go to activity
                </p>
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default Login
