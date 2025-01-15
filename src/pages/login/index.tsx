import Image from 'next/image'
import logo from '../../assets/logo.png'
import logoPets from '../../assets/dogs.png'
import { useEffect, useState } from 'react'

import { useAuthContext } from '@/context/hooks/useAuthProvider'

import InvalidLogin from '@/components/invalidLogin'

import { useForm } from 'react-hook-form'

import { useRouter } from 'next/router'
import Head from 'next/head'
import Link from 'next/link'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useMutation, useQuery } from '@tanstack/react-query'
import { getCep } from '@/https/getCep'
import { House } from 'lucide-react'
import { createOrganization } from '@/https/createOrganization'

export const schemaRegisterForm = z.object({
  nome: z
    .string()
    .min(3, {
      message: 'Nome deve ter no mínimo 3 caracteres',
    })
    .max(255, {
      message: 'Nome deve ter no máximo 255 caracteres',
    }),
  organizacao: z
    .string()
    .min(3, {
      message: 'Nome da organização deve ter no mínimo 3 caracteres',
    })
    .max(255, {
      message: 'Nome da organização deve ter no máximo 255 caracteres',
    }),
  email: z.string().email(),
  cep: z
    .string()
    .min(8, {
      message: 'CEP deve ter no mínimo 8 caracteres',
    })
    .max(8, {
      message: 'CEP deve ter no máximo 8 caracteres',
    }),
  estado: z
    .string()
    .min(2, {
      message: 'Estado deve ter no mínimo 2 caracteres',
    })
    .max(2, {
      message: 'Estado deve ter no máximo 2 caracteres',
    }),
  cidade: z.string(),
  endereco: z.string(),
  whatsapp: z
    .string()
    .min(11, {
      message: 'Whatsapp deve ter no mínimo 11 caracteres',
    })
    .max(12, {
      message: 'Whatsapp deve ter no máximo 12 caracteres',
    }),
  password: z
    .string()
    .regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/, {
      message:
        'Senha deve ter no mínimo 8 caracteres, uma letra maiúscula, uma minúscula e um número',
    }),
})

const schemaLoginForm = z.object({
  email: z.string().email(),
  password: z.string(),
})

export type IPropsHookForm = z.infer<typeof schemaRegisterForm>
export type LoginForm = z.infer<typeof schemaLoginForm>

export default function Login() {
  const route = useRouter()
  const isRegister = route.query.isRegister as string

  const [modo, isModo] = useState<'login' | 'register'>(
    !!isRegister ? 'register' : 'login'
  )

  const {
    handleSubmit: handleSubmitRegisterForm,
    register: registerForm,
    formState: { errors: errorsForm },
    watch,
    setValue,
    reset,
  } = useForm<IPropsHookForm>({
    resolver: zodResolver(schemaRegisterForm),
  })

  const {
    handleSubmit: handleSubmitLoginForm,
    register: registerLoginForm,
    reset: resetLogin,
  } = useForm<LoginForm>({
    resolver: zodResolver(schemaLoginForm),
  })

  const { login, isLogin, isLoading } = useAuthContext()

  const { mutateAsync: createOrganizationFn } = useMutation({
    mutationFn: createOrganization,
    onError: (error) => {
      reset()
      alert('Cadastrado com sucesso')
    },
    onSuccess: (data) => {
      reset()
      alert('Cadastrado com sucesso')
    },
  })

  const { mutateAsync: loginFn } = useMutation({
    mutationFn: login,
    onError: (error) => {
      resetLogin()
    },
    onSuccess: (data) => {
      resetLogin()
    },
  })

  async function handleCadastro(data: IPropsHookForm) {
    createOrganizationFn(data)
  }

  async function handleLogin(data: LoginForm) {
    const { email, password } = data
    await loginFn({ email, password })
  }

  const { data, isFetching } = useQuery({
    queryKey: ['cep', watch('cep')],
    queryFn: () => getCep({ cep: watch('cep') }),
  })

  setValue('cidade', data?.city)
  setValue('estado', data?.state)
  setValue('endereco', data?.street)

  useEffect(() => {
    function checkRouterPage() {
      const tokenApp = localStorage.getItem('token-find-a-friends')
      if (tokenApp) {
        return route.push('/cadastro/pet')
      }
    }

    checkRouterPage()
  }, [route])

  return (
    <>
      <Head>
        <title>{modo === 'login' ? 'Login' : 'Registro'} | Find a friend</title>
      </Head>

      <div className='grid grid-cols-1 lg:grid-cols-2 w-full h-screen bg-white gap-14'>
        {isLoading && (
          <div className='w-full h-full justify-center items-center absolute bg-red-200 opacity-75'>
            <div className='w-12 h-12 relative left-1/2 top-1/2 rounded-full animate-spin border-x-8 border-solid border-orange-400 border-t-transparent'></div>
          </div>
        )}
        <div className='cols-span-1 hidden lg:block flex w-full h-screen justify-center items-center'>
          <div className='flex flex-col w-full h-full bg-red-500 p-11 justify-between items-center'>
            <Link href='/'>
              <Image src={logo} alt='logo da aplicação' />
            </Link>

            <div className='w-64'>
              <Image src={logoPets} alt='logo 2 da aplicação' />
            </div>
          </div>
        </div>

        <div className='cols-span-1 flex w-full h-screen'>
          <div className='w-full pt-14 max-w-7xl px-5 lg:px-0 lg:pr-14 mx-auto overflow-auto'>
            {modo === 'login' ? (
              <>
                <div className='flex items-center gap-5 justify-between'>
                  <h2 className='font-nunito font-bold text-lg md:text-3xl text-gray-400'>
                    Boas-vindas!
                  </h2>

                  <Link className='block lg:hidden' href='/'>
                    <House size={32} className='text-gray-400' />
                  </Link>
                </div>

                <form
                  onSubmit={handleSubmitLoginForm(handleLogin)}
                  className='flex flex-col mt-16'
                >
                  {isLogin && <InvalidLogin />}
                  <div className='flex flex-col gap-5 mb-12 mt-8'>
                    <div className='flex flex-col gap-2'>
                      <Label htmlFor='email'>E-mail</Label>
                      <Input
                        placeholder='Digite seu email...'
                        className='border-gray-400 text-gray-400 h-12'
                        {...registerLoginForm('email')}
                      />
                    </div>

                    <div className='flex flex-col gap-2'>
                      <Label htmlFor='email'>Senha</Label>
                      <Input
                        type='password'
                        placeholder='Digite sua senha...'
                        className='border-gray-400 text-gray-400 h-12'
                        {...registerLoginForm('password')}
                      />
                      <span
                        onClick={() => {
                          isModo('register')
                        }}
                        className='font-nunito text-xs text-gray-400 text-center md:text-right'
                      >
                        Ainda não possui uma conta?{' '}
                        <b className='hover:underline cursor-pointer'>
                          Cadastre-se
                        </b>
                      </span>
                    </div>

                    <Button
                      type='submit'
                      className='h-12 font-nunito font-extrabold text-base text-white bg-gray-400 hover:bg-gray-400 hover:opacity-90 px-3'
                    >
                      Entrar
                    </Button>
                  </div>
                </form>
              </>
            ) : (
              <>
                <div className='flex items-center gap-5 justify-between'>
                  <h2 className='font-nunito font-bold text-lg md:text-3xl text-gray-400'>
                    Cadastre sua organização
                  </h2>

                  <Link className='block lg:hidden' href='/'>
                    <House size={32} className='text-gray-400' />
                  </Link>
                </div>
                <form
                  onSubmit={handleSubmitRegisterForm(handleCadastro)}
                  className='flex flex-col pt-8'
                >
                  <div className='flex flex-col gap-5 pb-12 pt-8'>
                    <div className='flex flex-col gap-2'>
                      <Label htmlFor='nome'>Nome do responsável</Label>
                      <Input
                        placeholder='Digite o nome do responsável...'
                        className='border-gray-400 text-gray-400 h-12'
                        {...registerForm('nome')}
                      />
                      {errorsForm.nome && (
                        <span className='text-red-500 text-xs'>
                          {errorsForm.nome.message}
                        </span>
                      )}
                    </div>

                    <div className='flex flex-col gap-2'>
                      <Label htmlFor='organizacao'>Nome da organização</Label>
                      <Input
                        placeholder='Digite o nome da organização...'
                        className='border-gray-400 text-gray-400 h-12'
                        {...registerForm('organizacao')}
                      />
                      {errorsForm.organizacao && (
                        <span className='text-red-500 text-xs'>
                          {errorsForm.organizacao.message}
                        </span>
                      )}
                    </div>

                    <div className='flex flex-col gap-2'>
                      <Label htmlFor='email'>E-mail</Label>
                      <Input
                        placeholder='Digite seu e-mail...'
                        className='border-gray-400 text-gray-400 h-12'
                        {...registerForm('email')}
                      />
                      {errorsForm.email && (
                        <span className='text-red-500 text-xs'>
                          {errorsForm.email.message}
                        </span>
                      )}
                    </div>

                    <div className='flex flex-col gap-2'>
                      <Label htmlFor='cep'>CEP</Label>
                      <Input
                        placeholder='Digite apenas numeros...'
                        className='border-gray-400 text-gray-400 h-12'
                        {...registerForm('cep')}
                      />
                      {errorsForm.cep && (
                        <span className='text-red-500 text-xs'>
                          {errorsForm.cep.message}
                        </span>
                      )}
                    </div>

                    <div className='flex flex-col gap-2'>
                      <Label htmlFor='endereco'>Endereço</Label>
                      <Input
                        disabled={isFetching}
                        placeholder='Digite o endereço...'
                        className='border-gray-400 text-gray-400 h-12'
                        {...registerForm('endereco')}
                      />
                      {errorsForm.endereco && (
                        <span className='text-red-500 text-xs'>
                          {errorsForm.endereco.message}
                        </span>
                      )}
                    </div>

                    <div className='flex flex-col gap-2'>
                      <Label htmlFor='estado'>Estado</Label>
                      <Input
                        disabled={isFetching}
                        maxLength={2}
                        placeholder='Digite o estado...'
                        className='border-gray-400 text-gray-400 h-12'
                        {...registerForm('estado')}
                      />
                      {errorsForm.estado && (
                        <span className='text-red-500 text-xs'>
                          {errorsForm.estado.message}
                        </span>
                      )}
                    </div>

                    <div className='flex flex-col gap-2'>
                      <Label htmlFor='cidade'>Cidade</Label>
                      <Input
                        disabled={isFetching}
                        placeholder='Digite a cidade...'
                        className='border-gray-400 text-gray-400 h-12'
                        {...registerForm('cidade')}
                      />
                      {errorsForm.cidade && (
                        <span className='text-red-500 text-xs'>
                          {errorsForm.cidade.message}
                        </span>
                      )}
                    </div>

                    <div className='flex flex-col gap-2'>
                      <Label htmlFor='whatsapp'>Whatsapp</Label>
                      <Input
                        maxLength={12}
                        type='tel'
                        placeholder='Digite o Whatsapp...'
                        className='border-gray-400 text-gray-400 h-12'
                        {...registerForm('whatsapp')}
                      />
                      {errorsForm.whatsapp && (
                        <span className='text-red-500 text-xs'>
                          {errorsForm.whatsapp.message}
                        </span>
                      )}
                    </div>

                    <div className='flex flex-col gap-2'>
                      <Label htmlFor='password'>Senha</Label>
                      <Input
                        type='password'
                        placeholder='Digite sua senha...'
                        className='border-gray-400 text-gray-400 h-12'
                        {...registerForm('password')}
                      />
                      {errorsForm.password && (
                        <span className='text-red-500 text-xs'>
                          {errorsForm.password.message}
                        </span>
                      )}
                    </div>

                    <span className='font-nunito text-xs text-gray-400 text-center '>
                      Já possui uma conta?{' '}
                      <b
                        onClick={() => isModo('login')}
                        className='hover:underline cursor-pointer'
                      >
                        Logar
                      </b>
                    </span>

                    <Button
                      className='h-12 w-full font-nunito font-extrabold  text-white bg-gray-400 hover:bg-gray-400 hover:opacity-90 px-3'
                      type='submit'
                    >
                      Enviar
                    </Button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
