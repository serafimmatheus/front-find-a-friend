import { zodResolver } from '@hookform/resolvers/zod'
import { Search } from 'lucide-react'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from './ui/button'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select'

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
  const router = useRouter()
  const { isReady, query, push } = router

  const [formInitialized, setFormInitialized] = useState(false)

  const [cidades, setCidades] = useState<Root[]>([])

  const { control, handleSubmit, watch, setValue } = useForm<Friend>({
    resolver: zodResolver(schemaFriend),
    mode: 'onChange',
  })

  const fetchCidades = async (estado: string) => {
    const response = await fetch(
      `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${estado}/municipios`
    )

    const data = await response.json()

    setCidades(data)
  }

  const handleSubmitFriend = (data: Friend) => {
    push(`/amigos/${data.estado}/${data.cidade}`)
  }

  useEffect(() => {
    fetchCidades(watch('estado'))
  }, [watch('estado')])

  useEffect(() => {
    if (isReady && !formInitialized) {
      const estado = (query.estado as string) || ''
      const cidade = (query.cidade as string) || ''
      setValue('estado', estado)
      setValue('cidade', cidade)
      setFormInitialized(true)
    }
  }, [isReady, query, setValue, formInitialized])

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
          <Select
            disabled={!watch('estado')}
            onValueChange={field.onChange}
            defaultValue={field.value}
          >
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
        className='bg-accent hover:bg-accent text-secondary hover:opacity-90 w-full sm:w-14 h-9'
      >
        <Search />
      </Button>
    </form>
  )
}
