import axios from 'axios';
import Head from 'next/head'
import Navbar from '../components/Navbar'
import Navigation from '../components/Navigation';
import RecentPost from '../components/RecentPost';
import Favicon from '../components/Favicon';




export default function Home() {
  return (
    <>
      <Head>
        <title>Gemoy</title>
        <Favicon />
        <meta name="msapplication-TileColor" content="#FFC0CB" />
        <meta name="theme-color" content="#FFC0CB"></meta>
      </Head>
      <Navbar data={'h1'}></Navbar>
      <div className='container m-auto w-[92%] max-w-xl	'>
        <Navigation link="home"></Navigation>


        <RecentPost ></RecentPost>


      </div>


    </>
  )
}
