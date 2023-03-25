import { NextApiRequest, NextApiResponse } from "next";
import usuariosController from '../controllers/usuariosController';

export default async function conductores(req : NextApiRequest, res : NextApiResponse) {
  switch (req.method) {
    case 'GET':
        try {
            const results : any = await usuariosController.getAll(); 
            res.status(200).json(results); 
          } catch (error: any) {
            res.status(500).send(error.message); 
          }
        ;
        
      break;
    case 'POST':
        try {
            const results = await usuariosController.create(req.body); 
            res.status(200).json(results); 
          } catch (error: any) {
            res.status(500).send(error.message); 
          }
        ;
      
      break;
    default:
        return res.status(400).json({ message: "Method are not supported" });
  }
}



