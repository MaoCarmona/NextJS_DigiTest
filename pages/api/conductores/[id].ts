import { NextApiRequest, NextApiResponse } from "next";
import conductoresController from '../controllers/conductoresController';

// eslint-disable-next-line import/no-anonymous-default-export
export default async function (req: NextApiRequest, res: NextApiResponse) {
  switch (req.method){
      case "GET":
        try {
            const results = await conductoresController.getById(req.query.id); 
            res.status(200).json(results); 
          } catch (error: any) {
            res.status(500).send(error.message); 
          };
          
        break;
      case 'PUT':
        try {
          const results = await conductoresController.update(req.query.id,req.body);
          res.status(200).json(results); 
        } catch (error: any) {
          res.status(500).send(error.message); 
        };
          
        break;
      case 'DELETE':
        try {
          const results = await conductoresController.deleteById(req.query.id); 
          res.status(200).json(results); 
        } catch (error: any) {
          res.status(500).send(error.message); 
        };
          
        break;
      default:
        return res.status(400).json({ message: "Method are not supported" });
  }
}