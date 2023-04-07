import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { type z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { createUserFormSchema } from './validations/create-user-form-schema'

import './styles/global.css'

type CreateUserFormData = z.infer<typeof createUserFormSchema>

export const App = () => {
  const [output, setOutput] = useState('')
  const { formState: { errors }, handleSubmit, register } = useForm<CreateUserFormData>({
    resolver: zodResolver(createUserFormSchema)
  })

  const createUser = (data: any) => {
    setOutput(JSON.stringify(data, null, 2))
  }

  return (
    <main className="flex flex-col items-center justify-center text-zinc-300 h-screen bg-zinc-950">
      <h1 className="text-white text-3xl mb-8">Advanced Forms</h1>
      <form
        className="flex flex-col gap-4 w-full max-w-sm"
        onSubmit={handleSubmit(createUser)}
      >
        <div className="flex flex-col gap-1">
          <label className="text-lg" htmlFor="email">Nome</label>
          <input
            className="text-white text-base p-3 h-10 bg-zinc-800 rounded-sm shadow-sm"
            type="text" id="name"
            {...register('name')}
          />
          {
            errors.name && (
              <span className="text-pink-600 text-sm mt-1">
                {errors.name.message}
              </span>
            )
          }
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-lg" htmlFor="email">E-mail</label>
          <input
            className="text-white text-base p-3 h-10 bg-zinc-800 rounded-sm shadow-sm"
            type="email" id="email"
            {...register('email')}
          />
          {
            errors.email &&
            <span className="text-pink-600 text-sm mt-1">
              {errors.email.message}
            </span>
          }
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-lg" htmlFor="password">Senha</label>
          <input
            className="text-white text-base p-3 h-10 bg-zinc-800 rounded-sm shadow-sm"
            type="password" id="password"
            {...register('password')}
          />
          {
            errors.password &&
            <span className="text-pink-600 text-sm mt-1">
              {errors.password.message}
            </span>
          }
        </div>

        <button
          className="text-white font-semibold h-10 bg-emerald-500 hover:bg-emerald-600 rounded-sm shadow-sm"
          type="submit"
        >
          Entrar
        </button>
      </form>

      <pre>
        {output}
      </pre>
    </main>
  )
}
