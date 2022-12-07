import type { NextApiRequest, NextApiResponse } from 'next'
import { Database } from '../../lib/mongodb'
import bcrypt from 'bcryptjs'



export default async function handler(req:NextApiRequest, res:NextApiResponse){

    if(req.method?.toLowerCase() == 'post' ){
        if(req.body.username && req.body.password && req.body.confirmpassword ){
            if(req.body.password == req.body.confirmpassword){
                const Users = Database('users');
                (await Users).find({username:req.body.username.toLowerCase().replace(/\s+/g, '')}).toArray().then(async (result)=>{
                    if(result.length > 0){
                        res.json({
                            code:400,
                            message:"Username has taken",
                            
                        })
                    }else{
                        const salt = await bcrypt.genSalt(10);
                        const hashed = await bcrypt.hash(String(req.body.password), salt);
                        (await Users).insertOne({
                            username:req.body.username.toLowerCase().replace(/\s+/g, ''),
                            password:hashed,
                            lastModified:new Date()
                        }).then((e)=>{
                            res.json({
                                code:200,
                                message:'Account Created. You can login in login page',
                                data:e
                            })
                        })
                    }
                })
                

            }else{
                res.json({
                    code:400,
                    message:"Invalid password confirmation"
                })
            }

        }else{
            res.json({
                code:400,
                message:"Field cannot be empty"
            })
        }
        

    }else{
        res.json({
            message:req.method
        })
    }
}