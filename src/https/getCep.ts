import axios from 'axios'

interface IPropsCep {
  cep: string
}

export async function getCep({ cep }: IPropsCep) {
  if (cep.length !== 9) {
    return
  }

  const response = await axios.get(`https://brasilapi.com.br/api/cep/v1/${cep}`)
  return response.data
}
