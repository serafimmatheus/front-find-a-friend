import Image from 'next/image'
import logo from '../assets/logo.png'
import doguinhos from '../assets/dogs.png'
import { useRouter } from 'next/router'
import Head from 'next/head'
import { Button } from '@/components/ui/button'
import { SearchFriends } from '@/components/searchFriends'

export default function Home() {
  const route = useRouter()

  return (
    <>
      <Head>
        <title>Find a friend</title>
        <link rel='icon' href='/mini-logo.ico' />
      </Head>
      <main className='bg-red-500 w-screen min-h-screen'>
        <div className='container flex flex-col w-full max-w-7xl my-0 mx-auto px-4'>
          <div className='flex pt-10 sm:pt-24 justify-between items-center w-full'>
            <div className=' w-[215px] h-[56px]  '>
              <Image src={logo} alt='Logo' />
            </div>

            <div className='flex gap-4'>
              <Button
                variant='outline'
                className='rounded-full'
                onClick={() => route.push('/login')}
              >
                Logar
              </Button>

              <Button
                className='rounded-full'
                onClick={() => route.push('/login?isRegister=true')}
              >
                cadastrar
              </Button>
            </div>
          </div>

          <div className='w-full pt-32 sm:flex items-end justify-center'>
            <div className='sm:w-1/2 flex mb-10'>
              <h1 className='text-white font-extrabold text-2xl sm:text-7xl'>
                Leve a felicidade para o seu lar
              </h1>
            </div>
            <div className='sm:w-1/2'>
              <Image src={doguinhos} alt='Doguinhos amigaveis' />
            </div>
          </div>

          <div className='flex flex-col lg:flex-row  pt-28 items-center'>
            <div className='flex sm:w-1/2 mb-10'>
              <p className='text-white font-semibold text-2xl w-[407px] text-center sm:text-start'>
                Encontre o animal de estimação ideal para seu estilo de vida!
              </p>
            </div>

            <div className='flex items-center gap-10 justify-end w-full md:w-1/2'>
              <p className='w-1/3 text-white text-lg'>Busque seu amigo:</p>

              <SearchFriends />
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
