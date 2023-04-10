import { z } from 'zod'

export const createUserFormSchema = z.object({
  avatar: z.instanceof(FileList)
    .transform(list => list.item(0)!)
    .refine(file => file.size <= 5 * 1024 * 1024, 'O arquivo deve ter no máximo 5MB'),
  name: z.string()
    .nonempty('O nome é obrigatório')
    .transform(name => {
      return name.trim().split(' ').map(word => {
        return word[0].toLocaleUpperCase().concat(word.substring(1))
      }).join(' ')
    }),
  email: z.string()
    .nonempty('O e-mail é obrigatório')
    .email('Formato de e-mail inválido')
    .toLowerCase()
    .refine(email => {
      return email.endsWith('@email.com')
    }, 'O e-mail precisa ser da @email'),
  password: z.string()
    .min(6, 'A senha precisa de no mínimo 6 caracteres'),
  techs: z.array(z.object({
    title: z.string().nonempty('O título é obrigatório'),
    knowledge: z.coerce.number().min(1).max(100)
  })).min(2, 'Insira pelo menos duas tecnologias')
})

export type CreateUserFormData = z.infer<typeof createUserFormSchema>
