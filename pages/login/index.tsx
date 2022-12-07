import Head from 'next/head'
import Link from 'next/link';
import Navbar from '../../components/Navbar'
import Navigation from '../../components/Navigation';
import { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Favicon from '../../components/Favicon';


export default function Login() {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [showMessage, setShowMessage] = useState(false);
    const [message, setMessage] = useState('')
    const [loading, setLoading] = useState(false);
    const router = useRouter()

    const onLogin = async (e: any) => {
        e.preventDefault()
        setLoading(true)

        const api = await axios.post('/api/login', { username: username.toLowerCase().replace(/\s+/g, ''), password: password });
        if (username == '' || password == '') {
            setShowMessage(true);
            setMessage('Fill cannot be empty')
        } else if (api.data.code == 400) {
            setShowMessage(true);
            setMessage(api.data.message)
        } else if (api.data.code == 200) {
            router.push('/dashboard')
        }

        setLoading(false)


    }

    const getUsername = (e: any) => {
        setUsername(e.target.value);
    }

    const getPassword = (e: any) => {
        setPassword(e.target.value)
    }



    return (
        <>
            <Head>
                <title>Login</title>
                <Favicon />
                <meta name="msapplication-TileColor" content="#FFC0CB" />
                <meta name="theme-color" content="#FFC0CB"></meta>
            </Head>
            <Navbar data={1}></Navbar>
            <div className='container m-auto w-[92%] max-w-xl'>
                <Navigation link="login"></Navigation>
                <div className='mt-5'>

                    <div className="bg-white border-2 rounded-md px-8 pt-6 pb-8 mb-4 flex flex-col">
                        {showMessage &&
                            <div className="alert alert-error mb-4">
                                <div>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                    <span>{message}</span>
                                </div>
                            </div>
                        }
                        <form action="" onSubmit={onLogin} method='POST' autoComplete='off'>
                            <div className="mb-4">
                                <label className="block text-grey-darker text-sm font-bold mb-2" htmlFor="username">
                                    Username
                                </label>
                                <input onChange={(e) => getUsername(e)} className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker" id="username" type="text" placeholder="Username" />
                            </div>
                            <div className="mb-6">
                                <label className="block text-grey-darker text-sm font-bold mb-2" htmlFor="password">
                                    Password
                                </label>
                                <input onChange={(e) => getPassword(e)} className="shadow appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker mb-3" id="password" type="password" placeholder='Password' />
                            </div>
                            <div className="flex items-center justify-between">
                                <button className={`bg-pink-400 hover:bg-pink-600 text-white font-bold py-2 px-4 border-0 rounded mr-5 btn ${loading && 'loading'}`} type="submit" disabled={loading}>
                                    Login
                                </button>
                                <p className="inline-block align-baseline font-bold text-sm text-blue hover:text-blue-darker">
                                    Don't have any account? Click <Link href='/register' className='text-pink-400'>Here</Link> to register
                                </p>
                            </div>
                        </form>
                    </div>
                </div>

            </div>


        </>
    )
}
