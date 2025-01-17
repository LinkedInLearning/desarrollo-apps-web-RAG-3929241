import { Pinecone } from '@pinecone-database/pinecone'
import OpenAI from "openai";
import express from 'express';
import bodyParser from 'body-parser';

import PineConeUtils from "./utils/PineConeUtils.js";
import OpenAIUtils from "./utils/OpenAIUtils.js";

const openai = new OpenAIUtils();
const pinecone = new PineConeUtils();


const usuario = {
    edad: 45,
    estadoCivil: "casado",
    hijos: 4,
    presupuesto: "medio",
    intereses: " quiero una vida tranquila cerca del mar",
};

const busquedaRAG = async (usuario) => {
    const prompt = openai.redactarPrompt(usuario);

    const sugerencia_ChatGPT = await openai.sugerenciaPropiedades(prompt);

    const promptBusqueda = pinecone.promptBusqueda(sugerencia_ChatGPT);

    const busquedaFormatoEmbeddings = await openai.generador_embedings(promptBusqueda);

    const propiedadesEncontradas = await pinecone.buscarDatos(busquedaFormatoEmbeddings);

    const respuesta = {
        sugerenciaIA: sugerencia_ChatGPT,
        propiedadesEncontradas: propiedadesEncontradas
    }

    return respuesta;

}


const app = express();
const port = 3000;

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
    extended: false
}));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});


app.get('/', (req, res) => {
    res.send('Hola mundo');
});


app.post('/busqueda', async (req, res) => {

    const usuario = req.body;

    busquedaRAG(usuario).then((respuesta) => {
        res.json(respuesta);
    }).catch((error) => {
        res.status(500)
        res.json(error);
    });

});



app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});