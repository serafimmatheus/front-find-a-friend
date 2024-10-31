import { api } from '@/data/api'

interface IPropsOrganizacao {
  cep: string
  cidade: string
  email: string
  endereco: string
  estado: string
  nome: string
  organizacao: string
  whatsapp: string
}

interface IPropsPets {
  id: string
  coverImage: string
  imagesUrl: string[]
  requisitosDoacao: string[]
  ambiente: string
  gatoOuCachorro: string
  idade: string
  nivelEnergia: string
  nivelIndependencia: string
  nome: string
  porte: string
  sobre: string
  petId: IPropsOrganizacao
}

export const getPetById = async (id: string) => {
  const response = await api.get<IPropsPets>(`/pets/${id}`)
  return response.data
}
