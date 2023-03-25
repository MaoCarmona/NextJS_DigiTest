import { NextApiRequest, NextApiResponse } from "next";
import conductoresController from '../controllers/conductoresController';

export default async function conductores(req : NextApiRequest, res : NextApiResponse) {
  switch (req.method) {
    case 'GET':
        try {
            const results = await conductoresController.getDisponibles(); 
            res.status(200).json(results); 
          } catch (error: any) {
            res.status(500).send(error.message); 
          }
        ;
        
      break;
      default:
        return res.status(400).json({ message: "Method are not supported" });
        break;
  }
}