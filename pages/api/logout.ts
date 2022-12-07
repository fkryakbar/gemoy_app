import type { NextApiRequest, NextApiResponse } from 'next'
import { removeCookies } from 'cookies-next';
export default async function handler(req:NextApiRequest, res:NextApiResponse) {
    removeCookies('token', {req,res})
    res.json({
        code:200,

    })

}