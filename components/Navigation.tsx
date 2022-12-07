import Link from 'next/link'
import React from 'react'

function Navigation(props: any) {
    return (
        <div className='bg-white border-2 rounded-lg py-8 px-2 mt-5'>
            <div className=' text-center'>
                <h1 className='font-extrabold text-5xl'>Gemoy</h1>
            </div>
            <ul className='mt-5'>
                <li className='float-left min-[400px]:mx-5 max-[400px]:mx-2'>
                    <Link className={props.link == 'home' ? 'font-semibold' : ''} href="/">Recent</Link>
                </li>
                {props.link != 'dashboard' &&
                    <li className='float-left  min-[400px]:mx-5 max-[400px]:mx-2'>
                        <Link className={props.link == 'login' ? 'font-semibold' : ''} href="/login">Login</Link>
                    </li>

                }
                {props.link == 'dashboard' &&
                    <li className='float-left  min-[400px]:mx-5 max-[400px]:mx-2'>
                        <Link className={props.link == 'dashboard' ? 'font-semibold' : ''} href="/dashboard">Dashboard</Link>
                    </li>
                }
                <li className='float-left min-[400px]:mx-5 max-[400px]:mx-2'>
                    <Link className={props.link == 'about' ? 'font-semibold' : ''} href="/about">About this App</Link>
                </li>
            </ul>
        </div>
    )
}

export default Navigation