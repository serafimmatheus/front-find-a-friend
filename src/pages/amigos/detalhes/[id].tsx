import Image from 'next/image'
import miniLogo from '../../../assets/mini-logo.png'
import {
  Atencao,
  EspacoAmplo,
  FlechaParaEsquerda,
  Phone,
  Raio,
} from '@/icons/icons'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { Header } from '@/components/Header'
import Head from 'next/head'
import { useQuery } from '@tanstack/react-query'
import { getPetById } from '@/https/getPetById'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import Link from 'next/link'

export default function DetailsPet() {
  const route = useRouter()

  const petId = route.query.id as string

  const { data: pet } = useQuery({
    queryKey: ['pets', petId],
    queryFn: () => getPetById(petId),
  })

  const [numero, setNumero] = useState(0)

  function backPage() {
    route.back()
  }

  if (!pet) {
    return <div>Carregando...</div>
  }

  return (
    <>
      <Head>
        <title>{pet.nome} | Find a friend</title>
      </Head>
      <Header />

      <div className='flex w-screen h-screen'>
        <div className='flex w-full h-full bg-red-150 overflow-hidden'>
          <div className='flex flex-col w-full h-full items-center overflow-auto pt-20 pb-10'>
            <div className='flex'>
              <h2 className='font-nunito text-lg font-semibold text-gray-200 my-10'>
                Seu novo amigo
              </h2>
            </div>

            <div className='flex flex-col w-full max-w-4xl mx-auto bg-white rounded-3xl'>
              <div className='relative w-full h-[400px] '>
                <button
                  onClick={backPage}
                  className='w-12 h-12 bg-yellow flex flex-col absolute left-5 cursor-pointer justify-center items-center z-40 text-white my-5 rounded-[20px]'
                >
                  <FlechaParaEsquerda />
                </button>

                <Image
                  className='object-cover object-top rounded-t-3xl w-full h-full'
                  src={pet.imagesUrl[numero]}
                  alt='Imagem do seu futuro pet'
                  fill
                />
              </div>

              <div className='flex justify-center items-center gap-4'>
                {pet?.imagesUrl?.map((elem: any, index: number) => {
                  return (
                    <div
                      key={elem}
                      className={`relative flex p-2 justify-center w-20 h-20 items-center mt-10 cursor-pointer ${
                        index === numero
                          ? 'border-[3px] border-gray-400 rounded-md'
                          : 'border-[3px] border-gray-200 rounded-md'
                      }`}
                      onClick={() => setNumero(index)}
                    >
                      <Image
                        className={`object-cover overflow-hidden`}
                        src={elem}
                        alt='mini imagens do seu futuro pet'
                        fill
                      />
                    </div>
                  )
                })}
              </div>

              <div className='flex flex-col mt-20 px-10'>
                <h2 className='font-nunito font-extrabold text-5xl text-gray-400'>
                  {pet.nome}
                </h2>

                <p className='font-nunito font-semibold text-lg text-gray-400 my-10'>
                  {pet.sobre}
                </p>
              </div>

              <div className='flex justify-between px-10'>
                <div className='flex flex-col items-center border-[2px] px-8 py-4 border-gray-400 rounded-3xl'>
                  <div className='flex mb-2'>
                    {pet.nivelEnergia === 'pouca' && (
                      <>
                        <Raio />
                        <Raio color='#1e1e1e1e' />
                        <Raio color='#1e1e1e1e' />
                        <Raio color='#1e1e1e1e' />
                      </>
                    )}

                    {pet.nivelEnergia === 'media' && (
                      <>
                        <Raio />
                        <Raio />
                        <Raio color='#1e1e1e1e' />
                        <Raio color='#1e1e1e1e' />
                      </>
                    )}

                    {pet.nivelEnergia === 'muita' && (
                      <>
                        <Raio />
                        <Raio />
                        <Raio />
                        <Raio />
                      </>
                    )}
                  </div>

                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <span className='font-nunito font-semibold text-lg text-gray-400'>
                          {pet.nivelEnergia?.toLocaleUpperCase()}
                        </span>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Nivel de energia</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>

                <div className='flex flex-col border-[2px] px-8 py-4 border-gray-400 rounded-3xl'>
                  <div className='flex mb-2'>
                    <EspacoAmplo />
                  </div>

                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <span className='font-nunito font-semibold text-lg text-gray-400 text-center'>
                          {pet.ambiente?.toLocaleUpperCase()}
                        </span>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Espaço para o pet</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>

                <div className='flex flex-col items-center justify-between border-[2px] px-8 py-4 border-gray-400 rounded-3xl'>
                  <div className='flex mb-2'>
                    {pet.porte === 'pequeno' && (
                      <>
                        <div className='w-3 h-3 bg-gray-400 rounded-full mr-1' />
                        <div className='w-3 h-3 bg-gray-200 rounded-full mr-1' />
                        <div className='w-3 h-3 bg-gray-200 rounded-full' />
                      </>
                    )}

                    {pet.porte === 'medio' && (
                      <>
                        <div className='w-3 h-3 bg-gray-400 rounded-full mr-1' />
                        <div className='w-3 h-3 bg-gray-400 rounded-full mr-1' />
                        <div className='w-3 h-3 bg-gray-200 rounded-full' />
                      </>
                    )}

                    {pet.porte === 'grande' && (
                      <>
                        <div className='w-3 h-3 bg-gray-400 rounded-full mr-1' />
                        <div className='w-3 h-3 bg-gray-400 rounded-full mr-1' />
                        <div className='w-3 h-3 bg-gray-400 rounded-full' />
                      </>
                    )}
                  </div>

                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <span className='font-nunito font-semibold text-lg text-gray-400'>
                          {pet.porte?.toLocaleUpperCase()}
                        </span>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Porte do pet</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </div>

              <div className='flex justify-between px-10 mt-10'>
                <div className='relative w-full h-[291px]'>
                  <Image src='/Mapa.png' fill alt='localizacao' />
                </div>
              </div>

              <div className='flex flex-col px-10 mt-10'>
                <div className='flex border-t-2 border-bg-gray-75 py-10 space-x-8'>
                  <div className='flex w-16 h-16 bg-orange-400 rounded-2xl justify-center items-center'>
                    <Image
                      src={miniLogo}
                      alt='imagem bem massa fera'
                      className='w-6 h-6'
                    />
                  </div>

                  <div className='flex flex-col'>
                    <h3 className='font-nunito text-gray-400 font-bold text-3xl'>
                      {pet.petId?.organizacao}
                    </h3>
                    <p className='font-nunito text-gray-400 font-semibold text-base mt-2'>
                      {pet.petId?.endereco}, {pet.petId?.cidade} -{' '}
                      {pet.petId?.estado}
                    </p>
                  </div>
                </div>

                <div className='flex w-full pl-24 my-10 border-bg-gray-75 pb-10 border-b-2'>
                  <button className='flex bg-linear-100 rounded-md px-8 py-4 gap-5'>
                    <Phone />
                    {pet.petId?.whatsapp}
                  </button>
                </div>
              </div>

              <div className='flex flex-col px-10'>
                <h2 className='font-nunito text-gray-400 font-bold text-3xl'>
                  Requisitos para adoção
                </h2>
                <div className='mt-14 flex flex-col'>
                  {pet.requisitosDoacao.map((requisito: any) => (
                    <div
                      key={pet.id}
                      className='flex items-center gap-5 px-14 py-4 mb-4 border border-red-500 rounded-xl'
                    >
                      <Atencao />
                      <p className='font-nunito text-red-500 font-semibold text-lg'>
                        {requisito}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className='flex px-10 mt-20 mb-10'>
                <div className='flex bg-green-400 w-full h-16 rounded-xl justify-center items-center text-white cursor-pointer'>
                  <Link
                    href={`https://api.whatsapp.com/send?phone=${pet.petId?.whatsapp}`}
                    target='_blank'
                    rel='noreferrer'
                  >
                    Entrar em contato
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
