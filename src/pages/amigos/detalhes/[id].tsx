import { Header } from '@/components/Header'
import { Button } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { getPetById } from '@/https/getPetById'
import {
  Atencao,
  EspacoAmplo,
  FlechaParaEsquerda,
  Raio,
  WhatsApp,
} from '@/icons/icons'
import { useQuery } from '@tanstack/react-query'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import miniLogo from '../../../assets/mini-logo.png'

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
        <title>{pet.nome} | Brasil Meu Pet</title>
      </Head>
      <Header />

      <div className='flex w-screen h-screen'>
        <div className='flex w-full h-full bg-background overflow-hidden'>
          <div className='flex flex-col w-full h-full items-center overflow-auto pt-28 pb-10'>
            <div className='flex'>
              <h2 className='font-nunito text-lg font-semibold text-secondary my-10'>
                Seu novo amigo
              </h2>
            </div>

            <div className='flex flex-col w-full max-w-4xl mx-auto bg-white rounded-xl'>
              <div className='relative w-full h-[400px] '>
                <Button
                  onClick={backPage}
                  className='w-12 h-12 bg-accent flex flex-col absolute left-5 cursor-pointer justify-center items-center z-40 my-5 rounded-xl'
                >
                  <FlechaParaEsquerda color='#ffffff' />
                </Button>

                <Image
                  className='object-cover object-top rounded-t-xl w-full h-full'
                  src={pet.imagesUrl[numero]}
                  alt='Imagem do seu futuro pet'
                  fill
                />
              </div>

              <div className='flex flex-wrap md:justify-center items-center gap-4 px-4 sm:px-10 mt-10'>
                {pet?.imagesUrl?.map((elem: any, index: number) => {
                  return (
                    <Button
                      key={elem}
                      className={`relative flex p-2 justify-center w-20 h-20 items-center  cursor-pointer ${
                        index === numero
                          ? 'border-[3px] border-gray-400 rounded-md'
                          : 'border-[3px] border-gray-200 rounded-md'
                      }`}
                      onClick={() => setNumero(index)}
                    >
                      <Image
                        className='object-cover overflow-hidden'
                        src={elem}
                        alt='mini imagens do seu futuro pet'
                        fill
                      />
                    </Button>
                  )
                })}
              </div>

              <div className='flex flex-col mt-10 md:mt-20 px-4 sm:px-10'>
                <h2 className='font-nunito font-extrabold text-3xl md:text-5xl text-secondary'>
                  {pet.nome}
                </h2>

                <p className='font-nunito font-semibold text-lg text-secondary py-5 sm:my-10'>
                  {pet.sobre}
                </p>
              </div>

              <section className='flex flex-col gap-4 pt-6 sm:pt-0 sm:flex-row justify-center px-4 sm:px-10'>
                <div className='flex w-full flex-col items-center border-[2px] px-8 py-4 border-secondary rounded-xl'>
                  <div className='flex mb-2'>
                    {pet.nivelEnergia === 'pouca' && (
                      <>
                        <Raio color='#0B7499'/>
                        <Raio color='#1e1e1e1e' />
                        <Raio color='#1e1e1e1e' />
                        <Raio color='#1e1e1e1e' />
                      </>
                    )}

                    {pet.nivelEnergia === 'media' && (
                      <>
                        <Raio color='#0B7499'/>
                        <Raio color='#0B7499'/>
                        <Raio color='#1e1e1e1e' />
                        <Raio color='#1e1e1e1e' />
                      </>
                    )}

                    {pet.nivelEnergia === 'muita' && (
                      <>
                        <Raio color='#0B7499' />
                        <Raio color='#0B7499' />
                        <Raio color='#0B7499' />
                        <Raio color='#0B7499' />
                      </>
                    )}
                  </div>

                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <span className='font-nunito font-semibold text-lg text-secondary'>
                          {pet.nivelEnergia?.toLocaleUpperCase()}
                        </span>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Nivel de energia</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>

                <div className='flex w-full flex-col items-center border-[2px] px-8 py-4 border-secondary rounded-xl'>
                  <div className='flex mb-2'>
                    <EspacoAmplo />
                  </div>

                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <span className='font-nunito font-semibold text-lg text-secondary text-center'>
                          {pet.ambiente?.toLocaleUpperCase()}
                        </span>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Espaço para o pet</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>

                <div className='flex w-full flex-col items-center justify-between border-[2px] px-8 py-4 border-secondary rounded-xl'>
                  <div className='flex mb-2'>
                    {pet.porte === 'pequeno' && (
                      <>
                        <div className='w-3 h-3 bg-secondary rounded-full mr-1' />
                        <div className='w-3 h-3 bg-gray-200 rounded-full mr-1' />
                        <div className='w-3 h-3 bg-gray-200 rounded-full' />
                      </>
                    )}

                    {pet.porte === 'medio' && (
                      <>
                        <div className='w-3 h-3 bg-secondary rounded-full mr-1' />
                        <div className='w-3 h-3 bg-secondary rounded-full mr-1' />
                        <div className='w-3 h-3 bg-gray-200 rounded-full' />
                      </>
                    )}

                    {pet.porte === 'grande' && (
                      <>
                        <div className='w-3 h-3 bg-secondary rounded-full mr-1' />
                        <div className='w-3 h-3 bg-secondary rounded-full mr-1' />
                        <div className='w-3 h-3 bg-secondary rounded-full' />
                      </>
                    )}
                  </div>

                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <span className='font-nunito font-semibold text-lg text-secondary'>
                          {pet.porte?.toLocaleUpperCase()}
                        </span>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Porte do pet</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </section>

              {/* <div className='flex justify-between px-4 sm:px-10 mt-10'>
                <div className='relative w-full h-[291px]'>
                  <Image src='/Mapa.png' fill alt='localizacao' className='object-contain' />
                </div>
              </div> */}

              <div className='flex flex-col px-4 sm:px-10 mt-10'>
                <div className='flex border-t-2 border-bg-gray-75 py-10 space-x-3 sm:space-x-8'>
                  <div className='flex w-16 h-16 bg-primary rounded-2xl justify-center items-center'>
                    <Image
                      src={miniLogo}
                      alt='imagem bem massa fera'
                      className='w-6 h-6'
                    />
                  </div>

                  <div className='flex flex-col'>
                    <h3 className='font-nunito text-secondary font-bold text-lg md:text-3xl'>
                      {pet.petId?.organizacao}
                    </h3>
                    <p className='font-nunito text-secondary font-semibold text-sm md:text-base sm:mt-2'>
                      {pet.petId?.endereco}, {pet.petId?.cidade} -{' '}
                      {pet.petId?.estado}
                    </p>
                  </div>
                </div>

                <div className='flex w-full border-bg-gray-75 mb-10 border-b-2' />
              </div>

              <div className='flex flex-col px-4 sm:px-10'>
                <h2 className='font-nunito text-secondary font-bold text-xl md:text-3xl'>
                  Requisitos para adoção
                </h2>
                <ul className='mt-6 md:mt-14 flex flex-col'>
                  {pet.requisitosDoacao.map((requisito: any) => (
                    <li
                      key={pet.id}
                      className='flex min-h-11 items-center gap-5 px-4 sm:px-14 py-4 mb-4 border border-destructive-foreground rounded-xl'
                    >
                      <Atencao color='#C4252A' />
                      <p className='font-nunito text-destructive font-semibold'>
                        {requisito}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>

              <div className='flex px-4 sm:px-10 mt-11 md:mt-20 mb-10'>
                <Button asChild className='flex bg-primary w-full h-11 text-white'>
                  <Link
                    href={`https://api.whatsapp.com/send?phone=${pet.petId?.whatsapp}&text=Ol%C3%A1%2C%20gostaria%20de%20saber%20mais%20sobre%20o%20pet%20${pet.nome}`}
                    target='_blank'
                    rel='noreferrer'
                  >
                    <WhatsApp size={28} />

                    Entrar em contato
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
