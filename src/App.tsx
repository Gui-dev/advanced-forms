import { useState } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { createUserFormSchema, type CreateUserFormData } from './validations/create-user-form-schema'

import './styles/global.css'
import { supabase } from './lib/supabase'

export const App = () => {
  const [output, setOutput] = useState('')
  const { control, formState: { errors }, handleSubmit, register } = useForm<CreateUserFormData>({
    resolver: zodResolver(createUserFormSchema)
  })
  const { append, fields } = useFieldArray({
    control,
    name: 'techs'
  })

  const addNewtech = () => {
    append({ title: '', knowledge: 0 })
  }

  const createUser = async (data: CreateUserFormData) => {
    await supabase.storage.from('advanced-forms').upload(data.avatar.name, data.avatar)
    setOutput(JSON.stringify(data, null, 2))
  }

  return (
    <main className="flex flex-col items-center justify-center text-zinc-300 h-screen bg-zinc-950">
      <h1 className="text-white text-3xl mb-8">Advanced Forms</h1>
      <form
        className="flex flex-col gap-4 w-full max-w-sm"
        onSubmit={handleSubmit(createUser)}
      >
        <div className="flex flex-row gap-4">
          <label
            className="flex flex-1 items-center text-white text-base p-3 h-10 bg-zinc-800 rounded-sm shadow-sm cursor-pointer"
            htmlFor="avatar"
          >
            Selecione seu avatar
          </label>
          <input
            type="file"
            className="hidden text-sm text-gray-900 p-3 h-10 bg-zinc-800 border border-zinc-600 rounded-lg cursor-pointer"
            id="avatar"
            accept="image/*"
            {...register('avatar')}
          />
          {
            errors.avatar && (
              <span className="text-pink-600 text-sm mt-1">
                {errors.avatar.message}
              </span>
            )
          }
        </div>

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
        <div className="flex flex-col gap-1">
          <label className="flex flex-row items-center justify-between text-lg" htmlFor="techs">
            Tecnologias
            <button
              type="button"
              className="text-3xl text-emerald-500 font-bold hover:text-emerald-600"
              onClick={addNewtech}
            >
              +
            </button>
          </label>
          {fields.map((field, index) => {
            return (
              <div
                key={field.id}
                className="flex flex-col"
              >
                <div className="flex flex-row gap-2">
                  <input
                    className="flex-1 text-white text-base p-3 h-10 bg-zinc-800 rounded-sm shadow-sm"
                    type="text"
                    placeholder="Nome da tecnologia"
                    {...register(`techs.${index}.title`)}
                  />
                  <input
                    className=" text-white text-base p-3 h-10 w-28 bg-zinc-800 rounded-sm shadow-sm"
                    type="number"
                    {...register(`techs.${index}.knowledge`)}
                  />
                </div>
                {
                  errors.techs &&
                  <span className="text-pink-600 text-sm mt-1">
                    {errors.techs.message}
                  </span>
                }
                {
                  errors.techs?.[index]?.title &&
                  <span className="text-pink-600 text-sm mt-1">
                    {errors.techs[index]?.title?.message}
                  </span>
                }
                {
                  errors.techs?.[index]?.knowledge &&
                  <span className="text-pink-600 text-sm mt-1">
                    {errors.techs[index]?.knowledge?.message}
                  </span>
                }
              </div>
            )
          })}
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
