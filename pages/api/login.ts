// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken';
import { setCookie } from 'cookies-next';
import {Database} from '../../lib/mongodb';
import bcrypt from 'bcryptjs'
dotenv.config()
const KEY = process.env.SECRET_KEY


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const username = req.body.username;
  const password = req.body.password;

  if(username && password){
    (await Database('users')).findOne({username:username}).then(async (result)=>{
      if(result){
        const user_id = result._id;
        bcrypt.compare(String(password), result!.password, function(err, result) {
          if(result){
            jwt.sign({username:username,id:user_id},KEY!,{expiresIn:'1h'}, (err, token)=>{
              setCookie('token', token, { req, res, maxAge: 60 * 60 * 24, httpOnly:true });
              res.status(200).json({
                  code:200,
                  message:'Success',
              })
            })
          }else{
            res.status(200).json({
              code:400,
              message:"Invalid Username or password"
            })
          }
        });
      }else{
        res.status(200).json({
          code:400,
          message:"Invalid Username or password"
        })
      }
    })



    
  }else{
    res.status(200).json({
        code:400,
        message:"All Field Required"
    })
  }
}
