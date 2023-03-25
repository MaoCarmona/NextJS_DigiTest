import { NextApiRequest, NextApiResponse } from "next";
import viajesController from '../controllers/viajesController';

export default async function conductores(req : NextApiRequest, res : NextApiResponse) {
  switch (req.method) {
    case 'GET':
        try {
            const results : any = await viajesController.getAllCompleted(); 
            res.status(200).json(results); 
          } catch (error: any) {
            res.status(500).send(error.message); 
          }
        ;
        
      break;
    case 'POST':
        try {
            const results = await viajesController.create(req.body); 
            res.status(200).json(results); 
          } catch (error: any) {
            res.status(500).send(error.message); 
          }
        ;
      
      break;
      case 'PUT':
        try {
            const results = await viajesController.updateToComplete(req.query.id,req.body); 
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



