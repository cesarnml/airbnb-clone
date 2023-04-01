'use client'

import axios from 'axios'
import { signIn } from 'next-auth/react'
import { AiFillGithub } from 'react-icons/ai'
import { FcGoogle } from 'react-icons/fc'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'

import { useLoginModal } from '$/hooks/useLoginModal'
import { useState } from 'react'
import { Modal } from './Modal'
import { Heading } from '../Heading'
import { Input } from '../inputs/Input'
import toast from 'react-hot-toast'
import { Button } from '../Button'
import { noop } from '$/lib/helpers'
import { useRouter } from 'next/navigation'

export const LoginModal = () => {
  const router = useRouter()
  const loginModal = useLoginModal()
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true)

    const response = await signIn('credentials', {
      ...data,
      redirect: false,
    })
    setIsLoading(false)
    if (response?.ok) {
      toast.success('Logged in')
      router.refresh()
      loginModal.onClose()
    }
    if (response?.error) {
      toast.error(response.error)
    }
  }

  const bodyContent = (
    <div className='flex flex-col gap-4'>
      <Heading title='Welcome back' subtitle='Login to your account!' />
      <form className='flex flex-col gap-4'>
        <Input
          id='email'
          label='Email'
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
        <Input
          id='password'
          type='password'
          label='Password'
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
      </form>
    </div>
  )

  const footerContent = (
    <div className='mt-3 flex flex-col gap-4'>
      <hr />
      <Button
        outline
        label='Continue with Google'
        icon={FcGoogle}
        onClick={() => signIn('google')}
      />
      <Button
        outline
        label='Continue with Github'
        icon={AiFillGithub}
        onClick={() => signIn('github')}
      />
      <div className='mt-4 text-center font-light text-neutral-500'>
        <div className='flex flex-row items-center justify-center gap-2'>
          <div>Already have an account?</div>
          <div
            onClick={loginModal.onClose}
            className='cursor-pointer text-neutral-800 hover:underline'
          >
            Log in
          </div>
        </div>
      </div>
    </div>
  )
  return (
    <Modal
      disabled={isLoading}
      isOpen={loginModal.isOpen}
      title='Login'
      actionLabel='Continue'
      onClose={loginModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  )
}
