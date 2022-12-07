import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import React, { useEffect, useState } from 'react'
import jwt from 'jsonwebtoken'
import Head from 'next/head';
import Navigation from '../../components/Navigation';
import axios from 'axios';
import { useRouter } from 'next/router';
import Navbar from '../../components/Navbar';
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import dynamic from "next/dynamic";
import { marked } from 'marked';
import { getCookie } from 'cookies-next';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content';
import Favicon from '../../components/Favicon';


const MDEditor = dynamic(
    () => import("@uiw/react-md-editor"),
    { ssr: false }
);

export const getServerSideProps: GetServerSideProps = async (context) => {
    const token = context.req.headers.cookie;
    const decoded: any = jwt.verify(token?.split('=')[1]!, 'helpme', function (err, decoded) {
        return decoded;
    });
    if (!decoded) {
        return {
            redirect: {
                destination: '/login',
                permanent: false
            }
        }
    }
    return {
        props: { decoded }
    }
}


export default function Index({ decoded }: InferGetServerSidePropsType<typeof getServerSideProps>) {
    const [value, setValue] = useState("");
    const [title, setTitle] = useState("");
    const [files, setFile] = useState([]);
    const [caption, setCaption] = useState("")
    const [apiMessage, setApiMessage] = useState('');
    const [showMessageSuccess, setShowMessageSuccess] = useState(false);
    const [showMessageError, setShowMessageError] = useState(false);
    const [progress, setProgress] = useState(0);
    const [showProgress, setShowProgress] = useState(false);
    const [Loading, setLoading] = useState(false);
    const [albumData, setAlbumData] = useState([])
    const [isFetching, setIsFetching] = useState([true, 'fetching data...'])
    const [isDelete, setIsDelete] = useState(false)

    const router = useRouter()
    const username = decoded.username;

    let Album = []

    const logout = async (e: any) => {
        const api = await axios.post('/api/logout');
        if (api.data.code == 200) {
            router.push("/dashboard")
        }
    }

    const getTitle = (e: any) => {
        setTitle(e.target.value)
    }

    const getFile = (e: any) => {
        setFile(e.target.files)
    }

    const getCaption = (e: any) => {
        setValue(e);
        setCaption(marked.parse(e))
    }

    const upload = async (e: any) => {
        setLoading(true)
        setShowMessageError(false);
        setShowMessageSuccess(false)
        e.preventDefault()
        const data: any = files
        const dataOfFile: any[] = []
        const fileName: any[] = []
        for (let file of data) {
            let newFile = new File([file], String(new Date().getTime()) + ' - ' + file['name'], { type: file.type })
            dataOfFile.push(newFile)
            fileName.push({ filename: newFile.name, filetype: newFile.type })

        }
        const api = await axios.post('/api/album', {
            title: title,
            files: fileName,
            caption: caption
        })
        if (api.data.code == 200) {
            for (let file of dataOfFile) {
                const api = await axios.post('/api/files', {
                    'files': file,
                }, {
                    headers: { 'content-type': 'multipart/form-data' }, onUploadProgress: progressEvent => {
                        setProgress((progressEvent.loaded / progressEvent.total!) * 100)
                        setShowProgress(true)
                    }
                })
            }
            setApiMessage(api.data.message)
            setShowMessageSuccess(true)
            setShowProgress(false)
            setLoading(false)
            e.target.reset();
            setValue('')
        } else {
            setApiMessage(api.data.message)
            setShowMessageError(true)
            setLoading(false)
        }




    }
    const fetchBlog = async () => {
        const api = await axios.get('/api/album', {
            headers: {
                token: getCookie('token')
            }
        })

        if (api.data.code == 200) {
            setAlbumData(api.data.data)
            setIsFetching([false, ''])
        } else {
            setIsFetching([true, "you don'n have any Album yet"])
        }
        Album = render()



    }
    useEffect(() => {
        fetchBlog()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [Loading])
    const deleteAlbum = (id: any) => {
        setIsDelete(true)
        const MySwal = withReactContent(Swal)
        MySwal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
        }).then(async (result) => {
            if (result.isConfirmed) {
                const api = await axios.delete('/api/album', { data: { albumId: id } });
                if (api.data.code == 200) {
                    Swal.fire(
                        'Deleted!',
                        'Your album has been deleted.',
                        'success'
                    )
                    fetchBlog()
                } else {
                    Swal.fire(
                        'Failed',
                        `${api.data.message}`,
                        'error'
                    )
                }


            }
        })
    }
    Album = render()
    function render() {
        return albumData.map((data: any, index) => {
            return (
                <li key={index}>
                    <a>
                        <p>
                            {data.title}
                        </p>
                        <button className='float-right text-red-600' onClick={() => deleteAlbum(data._id)}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                            </svg>

                        </button>

                    </a>
                </li>
            )
        })
    }

    return (
        <>
            <Head>
                <title>Dashboard</title>
                <Favicon />
                <meta name="msapplication-TileColor" content="#FFC0CB" />
                <meta name="theme-color" content="#FFC0CB"></meta>
            </Head>
            <Navbar data={1}></Navbar>
            <div className='container m-auto w-[92%] max-w-xl'>
                <Navigation link="dashboard" />
                <div className='mt-5'>
                    <div className="bg-white border-2 rounded-md px-8 pt-6 pb-8 mb-4 flex flex-col">
                        <div className='flex justify-between mb-3' >
                            <span className='font-bold inline'>{username}</span>
                            <span className='float-right'>
                                <label htmlFor="logout" className="btn btn-sm bg-pink-400 hover:bg-pink-600 border-0">Logout</label>
                            </span>
                        </div>
                        <hr />
                        <label htmlFor='addpost' className='btn btn-sm bg-pink-400 hover:bg-pink-600 border-0 mt-4' >+ Add Album</label>
                        {
                            albumData.length > 0 ? (
                                <ul className="menu mt-5 bg-base-100 w-full">
                                    {Album}
                                </ul>

                            ) : null
                        }

                        {isFetching ? (
                            <p className='text-center text-slate-600 mt-5'>{isFetching[1]}</p>
                        ) : null}
                    </div>
                </div>

            </div>

            <input type="checkbox" id="logout" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Logout?</h3>
                    <p className="py-4">Are you sure to logout?</p>
                    <div className="modal-action">
                        <label htmlFor="logout" className="btn bg-green-400 hover:bg-green-600 border-0">Cancel</label>
                        <label htmlFor="logout" className="btn bg-red-400 hover:bg-red-600 border-0" onClick={(e) => logout(e)}>Logout</label>
                    </div>
                </div>
            </div>

            <input type="checkbox" id="addpost" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box">
                    <form action="" onSubmit={(e) => upload(e)} method='post' encType='multipart/form-data'>
                        <h3 className="font-bold text-lg">New Album</h3>

                        <div className="form-control w-full mb-3">
                            <label className="label">
                                <span className="label-text">Album title</span>
                            </label>
                            <input type="text" onChange={(e) => getTitle(e)} placeholder="Type here" className="input input-bordered w-full" />
                        </div>
                        <div className="form-control w-full mb-3">
                            <label className="label">
                                <span className="label-text">Upload Images</span>
                            </label>
                            <input type="file" accept="image/png, image/jpeg,image/jpg, video/mp4," onChange={(e) => getFile(e)} className="file-input file-input-bordered w-full " multiple />
                        </div>
                        <div className="form-control w-full mb-3">
                            <label className="label">
                                <span className="label-text">Caption</span>
                            </label>
                            <MDEditor autoFocus={false} hideToolbar={true} preview="edit" value={value} onChange={(e) => getCaption(e)} />
                        </div>
                        {
                            showMessageError ? (
                                <div className="alert alert-error shadow-lg mb-3">
                                    <div>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                        <span>{apiMessage}</span>
                                    </div>
                                </div>

                            ) : null
                        }
                        {
                            showMessageSuccess ? (
                                <div className="alert alert-success shadow-lg mb-3">
                                    <div>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                        <span>{apiMessage}</span>
                                    </div>
                                </div>

                            ) : null
                        }
                        {
                            showProgress ? (
                                <progress className="progress progress-success w-full" value={progress} max="100"></progress>
                            ) : null
                        }
                        <div className="form-control w-full mb-3">
                            <button type='submit' disabled={Loading} className={`bg-pink-400 hover:bg-pink-700 rounded-lg py-3 btn border-none ${Loading && 'loading'} `}>Upload</button>
                        </div>
                    </form>

                    <div className="modal-action">
                        <label htmlFor="addpost" className="btn bg-pink-400 hover:bg-pink-600 border-0">Close</label>
                    </div>
                </div>
            </div>


        </>
    )
}

