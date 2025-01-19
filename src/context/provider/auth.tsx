import { api } from '@/data/api'
import { IPropsHookForm } from '@/pages/login'
import jwt from 'jsonwebtoken'
import { useRouter } from 'next/router'
import React, { createContext, useEffect, useState } from 'react'

interface IPropsAuthProvider {
  children: React.ReactNode
}

interface IPropsUsuario {
  cep: string
  cidade: string
  email: string
  endereco: string
  estado: string
  nome: string
  organizacao: string
  whatsapp: string
}

interface LoginProps {
  email: string
  password: string
}

interface AuthContextIProps {
  usuario: any
  isLogin: boolean
  token: string | undefined
  isLoading: boolean
  login({ email, password }: LoginProps): Promise<void>
  sairDaAplicacao(): Promise<void>
  createOrganization(data: IPropsHookForm): Promise<any>
}

export const AuthContext = createContext<AuthContextIProps>(
  {} as AuthContextIProps
)

export function AuthProvider({ children }: IPropsAuthProvider) {
  const [usuario, setUsuario] = useState<IPropsUsuario>({} as IPropsUsuario)
  const [isLogin, setIsLogin] = useState(false)
  const [isLoading, setIsLoadin] = useState(false)
  const [token, setToken] = useState<string>()

  const router = useRouter()

  async function login({ email, password }: LoginProps) {
    setIsLoadin(true)
    await api
      .post('/login', { email, password })
      .then((responde) => {
        setUsuario(responde.data.user)
        setToken(responde.data.token)

        if (!responde.data.user && !responde.data.token) {
          setIsLogin(true)
          setIsLoadin(false)

          return
        }

        localStorage.setItem('token-find-a-friends', responde.data.token)
        localStorage.setItem(
          'user-find-a-friends',
          JSON.stringify(responde.data.user)
        )

        setIsLoadin(false)

        router.push('/cadastro/pet')
      })
      .catch((err) => {
        setIsLogin(true)
        setIsLoadin(false)
      })
      .finally(() => {
        setIsLoadin(false)
      })
  }

  async function sairDaAplicacao() {
    setUsuario({} as any)
    localStorage.removeItem('token-find-a-friends')
    localStorage.removeItem('user-find-a-friends')

    router.push('/')
  }

  async function createOrganization(data: IPropsHookForm)  {
    await fetch('https://api-find-a-friends.vercel.app/api/v1/organizacoes', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }

  useEffect(() => {
    if (localStorage.getItem('token-find-a-friends')) {
      const token: any = localStorage.getItem('token-find-a-friends')

      const { sub }: any = jwt.decode(token)

      api
        .get(`/organizacao/${sub}`)
        .then((response) => {
          setUsuario(response.data)
        })
        .catch((err) => console.error(err))
    }
  }, [])

  return (
    <AuthContext.Provider
      value={{usuario, isLogin, token, isLoading,login, createOrganization, sairDaAplicacao }}
    >
      {children}
    </AuthContext.Provider>
  )
}
