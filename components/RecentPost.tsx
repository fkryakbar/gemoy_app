import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import dumpImage from '../public/images/43654.jpg'
import Image from 'next/image'
import 'swiper/css';
import axios from 'axios';
import moment from 'moment';

moment.updateLocale('en', {
    relativeTime: {
        future: "in %s",
        past: "%s ago",
        s: "seconds",
        m: "1 minute",
        mm: "%d minutes",
        h: "1 hour",
        hh: "%d hours",
        d: "1 day",
        dd: "%d days",
        M: "1 month",
        MM: "%d months",
        y: "1 year",
        yy: "%d years"
    }
});


function RecentPost() {
    const [albums, setAlbums] = useState([])



    const fetchAlbum = async () => {
        const api = await axios.get('/api/get');
        setAlbums(api.data.data)
    }

    useEffect(() => {
        fetchAlbum()
    }, [])
    const render = () => {
        if (albums.length > 0) {
            return albums.map((album: any, index) => {
                return (

                    <div key={index} className='bg-white border-2 rounded-lg mt-5'>
                        <div className='mx-3 my-5'>
                            <h1 className='font-bold text-2xl text-slate-700'>{album.title}</h1>
                            <p className='text-sm text-slate-600'>{album.username}</p>
                        </div>
                        <Swiper
                            spaceBetween={0}
                            slidesPerView={1}
                        >
                            {
                                album.files.map((image: any, index: any) => {
                                    if (image.filetype == 'image/png' || image.filetype == 'image/jpg' || image.filetype == 'image/jpeg') {
                                        return (
                                            <SwiperSlide key={index}><img src={`${image.link}`} width={572} height={357.5} alt="" style={{ width: '100%', height: 'auto' }} /></SwiperSlide>
                                        )
                                    } else if (image.filetype == 'video/mp4') {
                                        return (
                                            <SwiperSlide key={index} className='py-10 bg-slate-200'>
                                                <video width="100%" height="100%" controls>
                                                    <source src={`uploads/${image.link}`} type="video/mp4" />
                                                </video>

                                            </SwiperSlide>
                                        )
                                    }
                                })
                            }

                        </Swiper>

                        <div className='mx-3 my-5'>
                            <p className='text-sm text-slate-600 font-bold float-left'>{album.username}</p>
                            <p className='text-sm text-slate-600 float-right'>{moment(album.lastModified).format('hh:mm - D/M/YYYY')}</p> <br></br>
                            <div className='text-base text-slate-600'>{<div dangerouslySetInnerHTML={{ __html: album.caption }} />}</div>
                        </div>
                    </div>

                )
            })
        } else {
            return (
                <div className='bg-white border-2 rounded-lg p-5 mt-5'>
                    <p className='text-slate-400 text-center'>Album is Empty</p>
                </div>
            )
        }
    }
    const PostEl = render()

    return (
        <div>
            {PostEl}
        </div>
    )

}

export default RecentPost