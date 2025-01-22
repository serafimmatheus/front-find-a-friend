import Image from 'next/image'
import { useEffect, useState } from 'react'
import logoPets from '../../assets/dogs.png'
import logo from '../../assets/logo.png'

import { useAuthContext } from '@/context/hooks/useAuthProvider'

import InvalidLogin from '@/components/invalidLogin'

import { useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { getCep } from '@/https/getCep'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMask } from '@react-input/mask'
import { useMutation, useQuery } from '@tanstack/react-query'
import { House } from 'lucide-react'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { z } from 'zod'

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
    .min(9, {
      message: 'CEP deve ter no mínimo 8 caracteres',
    })
    .max(9, {
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
    .min(15, {
      message: 'Whatsapp deve ter no mínimo 11 caracteres',
    })
    .max(15, {
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
  const { isRegister } = route.query

  const [modo, isModo] = useState<'login' | 'register'>(
    isRegister === 'true' ? 'register' : 'login'
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

  const { login, isLogin, isLoading, createOrganization } = useAuthContext()

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
    const newData = {
      ...data,
      cep: data.cep.replace(/\D/g, ''),
      whatsapp: data.whatsapp.replace(/\D/g, ''),
    }
    createOrganizationFn(newData)
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

  const inputRef = useMask({
    mask: '(__) _____-____',
    replacement: { _: /\d/ },
  });

  const inputRefCep = useMask({
    mask: '_____-___',
    replacement: { _: /\d/ },
  });

  return (
    <>
      <Head>
        <title>{modo === 'login' ? 'Login' : 'Registro'} | Brasil Meu Pet</title>
      </Head>

      <div className='grid grid-cols-1 lg:grid-cols-2 w-full h-screen bg-secondary gap-14'>
        {isLoading && (
          <div className='w-full h-full justify-center items-center absolute bg-destructive-foreground opacity-75'>
            <div className='w-12 h-12 relative left-1/2 top-1/2 rounded-full animate-spin border-x-8 border-solid border-orange-400 border-t-transparent' />
          </div>
        )}
        <div className='cols-span-1 hidden lg:flex w-full h-screen justify-center items-center'>
          <div className='flex flex-col w-full h-full bg-background p-11 justify-between items-center'>
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
              <section className='max-w-xl mx-auto w-full'>
                <div className='flex items-center gap-5 justify-between'>
                  <div className='w-full flex flex-col justify-center'>
                    <Link className='lg:hidden pb-20 self-center' href='/'>
                      <Image src={logo} alt='logo da aplicação' />
                    </Link>

                    <div className='flex justify-between items-center gap-4'>
                      <h2 className='font-nunito font-bold text-lg md:text-3xl text-muted-foreground'>
                        Boas-vindas!
                      </h2>
                    </div>
                  </div>
                </div>

                <form
                  onSubmit={handleSubmitLoginForm(handleLogin)}
                  className='flex flex-col lg:mt-8'
                >
                  {isLogin && <InvalidLogin />}
                  <div className='flex flex-col gap-5 mb-12 mt-8'>
                    <div className='flex flex-col gap-2'>
                      <Label htmlFor='email'>E-mail</Label>
                      <Input
                        placeholder='Digite seu email...'
                        className='h-12'
                        {...registerLoginForm('email')}
                      />
                    </div>

                    <div className='flex flex-col gap-2'>
                      <Label htmlFor='email'>Senha</Label>
                      <Input
                        type='password'
                        placeholder='Digite sua senha...'
                        className='h-12'
                        {...registerLoginForm('password')}
                      />
                      <span
                        
                        className='font-nunito text-xs text-muted-foreground text-center md:text-right'
                      >
                        Ainda não possui uma conta?{' '}
                        <Button 
                          variant='link'
                          onClick={() => {
                            isModo('register')
                          }} 
                          type='button'
                          className='hover:underline cursor-pointer text-muted-foreground px-0 py-0 ml-1 font-semibold'
                        >
                          Cadastre-se
                        </Button>
                      </span>
                    </div>

                    <Button
                      type='submit'
                      className='h-11 font-nunito text-white !bg-gray-400 hover:opacity-80 font-extrabold bg-popover text-sm px-3'
                    >
                      Entrar
                    </Button>
                  </div>
                </form>
              </section>
            ) : (
              <section className='max-w-xl mx-auto w-full'>
                <div className='w-full flex lg:hidden justify-center items-center pb-20'>
                  <Link href='/'>
                    <Image src={logo} alt='logo da aplicação' />
                  </Link>
                </div>

                <div className='flex items-center gap-5 justify-between'>
                  <h2 className='font-nunito text-muted-foreground font-bold text-lg md:text-3xl '>
                    Cadastre sua organização
                  </h2>

                  <Link className='block lg:hidden' href='/'>
                    <House size={32} color='#E8E8E6' />
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
                        className='border-gray-400  h-12'
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
                        className='border-gray-400  h-12'
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
                        className='border-gray-400  h-12'
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
                      placeholder='_____ - ___'
                      className='border-gray-400  h-12'
                      {...registerForm('cep', { setValueAs: (value) => inputRefCep.current?.value || value })}
                      ref={(e) => {
                        registerForm('cep').ref(e);
                        if (e) inputRefCep.current = e;
                      }}
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
                        disabled
                        placeholder='Digite o endereço...'
                        className='border-gray-400  h-12'
                        {...registerForm('endereco')}
                      />
                      {errorsForm.endereco && (
                        <span className='text-red-500 text-xs'>
                          {errorsForm.endereco.message}
                        </span>
                      )}
                    </div>

                    <div className='grid grid-cols-1 sm:grid-cols-5 gap-4'>
                      <div className='sm:col-span-1 flex flex-col gap-2'>
                        <Label htmlFor='estado'>Estado</Label>
                        <Input
                          disabled
                          maxLength={2}
                          placeholder='Digite o estado...'
                          className='border-gray-400  h-12'
                          {...registerForm('estado')}
                        />
                        {errorsForm.estado && (
                          <span className='text-red-500 text-xs'>
                            {errorsForm.estado.message}
                          </span>
                        )}
                      </div>

                      <div className='sm:col-span-4 flex flex-col gap-2'>
                        <Label htmlFor='cidade'>Cidade</Label>
                        <Input
                          disabled
                          placeholder='Digite a cidade...'
                          className='border-gray-400  h-12'
                          {...registerForm('cidade')}
                        />
                        {errorsForm.cidade && (
                          <span className='text-red-500 text-xs'>
                            {errorsForm.cidade.message}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className='flex flex-col gap-2'>
                      <Label htmlFor='whatsapp'>Whatsapp</Label>
                      <Input
                        placeholder='(__) _____-____'
                        className='border-gray-400  h-12'
                        {...registerForm('whatsapp', { setValueAs: (value) => inputRef.current?.value || value })}
                        ref={(e) => {
                          registerForm('whatsapp').ref(e);
                          if (e) inputRef.current = e;
                        }}
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
                        className='border-gray-400  h-12'
                        {...registerForm('password')}
                      />
                      {errorsForm.password && (
                        <span className='text-red-500 text-xs'>
                          {errorsForm.password.message}
                        </span>
                      )}
                    </div>

                    <span className='font-nunito text-xs text-muted-foreground text-center '>
                      Já possui uma conta?{' '}
                      <Button
                        variant='link'
                        onClick={() => isModo('login')}
                        className='hover:underline cursor-pointer px-0 py-0 text-muted-foreground font-semibold'
                      >
                        Logar
                      </Button>
                    </span>

                    <Button
                      className='h-12 w-full font-nunito font-extrabold  text-white bg-gray-400 hover:bg-gray-400 hover:opacity-90 px-3'
                      type='submit'
                    >
                      Enviar
                    </Button>
                  </div>
                </form>
              </section>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
