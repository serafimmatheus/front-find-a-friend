import { api } from '@/data/api'
import { IPropsHookForm } from '@/pages/login'

export const createOrganization = async (data: IPropsHookForm) => {
  const response = await api.post('/organizacoes', {
    data: data,
  })
  return response.data
}
