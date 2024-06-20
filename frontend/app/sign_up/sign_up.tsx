'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import axios from 'axios'

const SignUp: React.FC = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [phone, setPhone] = useState('')
  const [role, setRole] = useState('user')
  const [showPassword, setShowPassword] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const router = useRouter()

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match')
      return
    }

    setErrorMessage('')

    try {
      const response = await axios.post('http://localhost:3000/register', {
        email,
        password,
        phone,
        role,
      })

      if (response.status === 409 || response.status === 500) {
        alert('Error: ' + response.data.message)
      } else if (response.status === 200) {
        console.log('Server response:', response.data)
        router.push('/login') // Navigate to login page
      }
    } catch (error) {
      console.error('There was an error submitting the form!', error)
      // Handle error (e.g., show an error message)
      setErrorMessage(
        'There was an error submitting the form. Please try again.'
      )
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
        <form onSubmit={handleSubmit}>
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
              className={`relative block w-full px-3 py-2 border border-gray-300
              placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
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
              className={`relative block w-full px-3 py-2 border border-gray-300
                placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
              required
            />
            <div
              className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <AiOutlineEyeInvisible className="h-5 w-5 text-gray-500" />
              ) : (
                <AiOutlineEye className="h-5 w-5 text-gray-500" />
              )}
            </div>
          </div>
          <div className="mb-4 relative">
            <label htmlFor="confirmPassword" className="block text-gray-700">
              Confirm Password:
            </label>
            <Input
              type={showPassword ? 'text' : 'password'}
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Password again"
              className={`relative block w-full px-3 py-2 border border-gray-300
                placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
              required
            />
            <div
              className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <AiOutlineEyeInvisible className="h-5 w-5 text-gray-500" />
              ) : (
                <AiOutlineEye className="h-5 w-5 text-gray-500" />
              )}
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="phone" className="block text-gray-700">
              Phone:
            </label>
            <Input
              type="text"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Phone Number"
              className={`relative block w-full px-3 py-2 border border-gray-300
                placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
              pattern="\d{10}"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="role" className="block text-gray-700">
              Role:
            </label>
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className={`relative block w-full px-3 py-2 border border-gray-300
                placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
              required
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
              <option value="coach">Coach</option>
            </select>
          </div>
          <Button
            type="submit"
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Sign Up
          </Button>
          <br />
          {errorMessage && (
            <p className="text-red-500 text-sm mb-4">{errorMessage}</p>
          )}
        </form>
      </div>
    </div>
  )
}

export default SignUp
