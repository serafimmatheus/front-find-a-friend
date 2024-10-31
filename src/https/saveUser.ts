import { api } from '@/data/api'

interface ISaveUser {
  id: string
  data: any
}

export const saveUser = async ({ id, data }: ISaveUser) => {
  const response = await api.patch(`/organizacoes/${id}`, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token-find-a-friends')}`,
    },
  })

  return response.data
}
