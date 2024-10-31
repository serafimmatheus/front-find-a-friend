import { api } from '@/data/api'

interface IPropsPets {
  cidade: string
  estado: string
}

export async function getPets({ cidade, estado }: IPropsPets) {
  const response = await api.get(`/pets/${estado}/${cidade}`)

  return response.data
}
