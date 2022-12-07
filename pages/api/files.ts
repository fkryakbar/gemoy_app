import nextConnect from 'next-connect';
import type { NextApiRequest, NextApiResponse } from "next";
import multer from 'multer';
import path from 'path';

const upload = multer({
  storage: multer.diskStorage({
    destination: './public/uploads',
    filename: (req, file, cb) => cb(null, file.originalname),
  }),
  // fileFilter:function(_req, file, cb){
  //   const filetypes = /jpeg|jpg|png|mp4/;
  //   const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  //   const mimetype = filetypes.test(file.mimetype);
  //   if(mimetype && extname){
  //     return cb(null,true);
  //   } else {
  //     return cb(new Error('Image or mp4 only'));
  //   }
  // }
});

const apiRoute = nextConnect({
  onError(error, req:NextApiRequest, res:NextApiResponse) {
    res.status(501).json({ error: `Sorry something Happened! ${error.message}` });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
});

apiRoute.use(upload.any());

apiRoute.post((req, res) => {
  res.status(200).json({ data: 'success' });
});

export default apiRoute;

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
}