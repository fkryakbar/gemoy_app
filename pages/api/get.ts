import { NextApiRequest, NextApiResponse } from "next";
import { Database } from '../../lib/mongodb';
export default async function handler(req:NextApiRequest, res:NextApiResponse){
    const Post = Database('posts');
    (await Post).aggregate([{$sort:{_id:-1}}]).toArray().then((result)=>{
        if(result){
            res.json({
                code:200,
                message:'Success',
                data:result
            })
        }else{
            res.json({
                code:400,
                message: 'Failed'
            })
        }
    })
}