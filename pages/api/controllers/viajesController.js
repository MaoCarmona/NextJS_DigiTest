import { v4 as uuid } from "uuid";
import { connection } from "../../../utils/configDatabase";

const getAllCompleted = () => {
  try {
    const results = new Promise((resolve, reject) => {
      connection.query(`SELECT * FROM viajes WHERE conductor_id IS NOT NULL`, (err, results) => {
        if (err) {
          return reject(err);
        }
        resolve(results);
      });
    });
    return results;
  } catch (err) {
    throw new Error(`Error al obtener los viajes: ${err.message}`);
  }
};


const create = async (viaje) => {
    try {
        const id =uuid()
        const query = 'INSERT INTO viajes (id, inicio_latitud, inicio_longitud, destino_latitud, destino_longitud, pasajero_id,fecha_creacion) VALUES (?,?,?,?,?,?,CURRENT_TIMESTAMP); ';
        const values = [id, viaje.inicio_latitud, viaje.inicio_longitud, viaje.destino_latitud, viaje.destino_longitud, viaje.pasajero_id];
        const result = await new Promise((resolve, reject) => {
        connection.query(query, values, (err, result) => {
          if (err) {
            return reject(err);
          }
          resolve(result);
        });
      });
      return "200 OK : Solicitud de viaje creada";
    } catch (err) {
      throw new Error(`Error al crear la solicitud: ${err.message}`);
    }
  };
  
  const updateToComplete = async (id, viaje) => {
    const conductor_id = viaje.conductorid;
    if (!conductor_id) {
        return "400 El ID del conductor es requerido ";
    } else {
    try {
        const query = `UPDATE viajes SET conductor_id = ? WHERE id = ? ;`;
        const values = [conductor_id, id]
      const result = await new Promise((resolve, reject) => {
        connection.query(query, values, (err, result) => {
          if (err) {
            return reject(err);
          }
          resolve(result);
        });
        
      });
      if (result.affectedRows === 0) {
        throw new Error(`El viaje no existe`);
      }
      return "200 OK : El viaje ha sido completado"
    } catch (err) {
      throw new Error(`Error al completar el viaje: ${err.message}`);
    }
    }
  };

  export default {
    getAllCompleted,
    create,
    updateToComplete,
  };