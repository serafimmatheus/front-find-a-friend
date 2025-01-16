import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select'
import { Search } from 'lucide-react'
import { Button } from './ui/button'
import { useToast } from '@/hooks/use-toast'
import { useSearchParams } from 'next/navigation'

const states = [
  'AC',
  'AL',
  'AP',
  'AM',
  'BA',
  'CE',
  'DF',
  'ES',
  'GO',
  'MA',
  'MT',
  'MS',
  'MG',
  'PA',
  'PB',
  'PR',
  'PE',
  'PI',
  'RJ',
  'RN',
  'RS',
  'RO',
  'RR',
  'SC',
  'SP',
  'SE',
  'TO',
]

export interface Root {
  id: number
  nome: string
}

const schemaFriend = z.object({
  estado: z.string(),
  cidade: z.string(),
})

type Friend = z.infer<typeof schemaFriend>

export const SearchFriends = () => {
  const route = useRouter()
  const [cidades, setCidades] = useState<Root[]>([])
  const { toast } = useToast()
  const { get } = useSearchParams()

  const { control, handleSubmit, watch } = useForm<Friend>({
    resolver: zodResolver(schemaFriend),
  })

  const fetchCidades = async (estado: string) => {
    const response = await fetch(
      `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${estado}/municipios`
    )

    const data = await response.json()

    setCidades(data)
  }

  const handleSubmitFriend = (data: Friend) => {
    if (!data.estado || !data.cidade) {
      console.log('deu erro')
      return toast({
        title: 'Erro',
        description: 'Preencha todos os campos',
      })
    }
    route.push(`/amigos/${data.estado}/${data.cidade}`)
  }

  useEffect(() => {
    fetchCidades(watch('estado'))
  }, [watch('estado')])

  return (
    <form
      onSubmit={handleSubmit(handleSubmitFriend)}
      className='w-full flex flex-col sm:flex-row items-center justify-center sm:justify-start gap-2'
    >
      <Controller
        control={control}
        name='estado'
        render={({ field }) => (
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <SelectTrigger className='w-full sm:w-[65px]'>
              <SelectValue defaultValue={states[0]} />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {states.map((state) => (
                  <SelectItem key={state} value={state}>
                    {state}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        )}
      />

      <Controller
        control={control}
        name='cidade'
        render={({ field }) => (
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <SelectTrigger className='min-w-[65px]'>
              <SelectValue placeholder='Cidade...' />
            </SelectTrigger>
            <SelectContent>
              {cidades.length > 0 && (
                <SelectGroup>
                  {cidades.map((cidade) => (
                    <SelectItem key={cidade.id} value={cidade.nome}>
                      {cidade.nome}
                    </SelectItem>
                  ))}
                </SelectGroup>
              )}
            </SelectContent>
          </Select>
        )}
      />

      <Button
        type='submit'
        size='icon'
        className='bg-yellow hover:bg-yellow hover:opacity-90 w-full sm:w-14 h-9'
      >
        <Search />
      </Button>
    </form>
  )
}
