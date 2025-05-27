import express, { json } from "express";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath, pathToFileURL } from "url";

// Permitimos la conexión con el .env
dotenv.config();
const PORT = process.env.PORT;


// Iniciamos express
const app = express();

// Obtenemos la dirección de los elementos
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Aumentar el límite de carga a 10 MB
app.use(json()); // Parear JSON en las solicitudes



// Permite mostrar la página web segun la ruta
app.use(express.static(path.join(__dirname)));



app.get("/", async (req,res) =>{

    var Solicitud = await fetch(`https://www.thesportsdb.com/api/v1/json/123/searchteams.php?t=Arsenal`, {
            method: "GET",  // Cambiar a POST
            headers: {
                "Content-Type": "application/json"  // Especificamos que los datos están en formato JSON
            }     
    });
    
    var Respuesta_Servidor = await Solicitud.json();


    res.status(200).json({
            Estado: 200,
            Respuesta: {
                Logo:Respuesta_Servidor.strLogo,
                Descripcion: Respuesta_Servidor.strDescriptionEN
            }
    });

});




// Iniciar Servidor
app.listen(PORT, () => {
    console.log(`Servidor Activo http://localhost:${PORT}`);
});
