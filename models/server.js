import express from 'express';
import cors from 'cors';
import { dbConnect } from '../database/config.js';
import empleados from '../routes/empleados.js';
import empresas from '../routes/empresas.js';
import usuarios from '../routes/usuarios.js';
import ausentismos from '../routes/ausentismo.js';
import code from '../routes/codes.js';
import fileupload from 'express-fileupload';

class Server{
    constructor(){
        this.app = express();
        this.port = process.env.PORT || 4500
        this.dbConnect()
        this.middlewares()
        this.routes()
    }
    async dbConnect(){
        await dbConnect();
    }
    routes(){
        this.app.use("/api/empleado",empleados)
        this.app.use("/api/empresa",empresas)
        this.app.use("/api/usuario",usuarios)
        this.app.use("/api/ausentismo",ausentismos)
        this.app.use("/api/code",code)
    }
    middlewares(){
        this.app.use(cors())
        this.app.use(express.json())
        this.app.use(fileupload({
            useTempFiles: true,
            tempFileDir: '/tmp/',
            createParentPath: true
        }));
    }
    listen(){
        this.app.listen(this.port, ()=>{
            console.log(`El servidor escuchando en el puerto ${this.port}`);
        })
    }
    
}

export default Server; 