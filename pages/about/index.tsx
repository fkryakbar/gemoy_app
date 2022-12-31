import Head from 'next/head'
import Favicon from '../../components/Favicon';
import Navbar from '../../components/Navbar'
import Navigation from '../../components/Navigation';

export default function About() {
  return (
    <>
      <Head>
        <title>About</title>
        <Favicon />
        <meta name="msapplication-TileColor" content="#FFC0CB" />
        <meta name="theme-color" content="#FFC0CB"></meta>
      </Head>
      <Navbar data={1}></Navbar>
      <div className='container m-auto w-[92%] max-w-xl	'>
        <Navigation link="about"></Navigation>
        <div className='bg-white border-2 rounded-lg py-8 px-2 mt-5 text-center'>
          <p className='text-center mb-3'>This App was created with &#10084; and was dedicated to save our memories
          </p>
          <a href='https://happy21hanna.ninepmx.my.id' className='btn bg-pink-400 border-0 hover:bg-pink-600 mb-3'> Happy Birthday on 21 ! </a>
          <hr />
          <p className='text-center font-bold mt-3'>F & H</p>
        </div>

      </div>


    </>
  )
}
