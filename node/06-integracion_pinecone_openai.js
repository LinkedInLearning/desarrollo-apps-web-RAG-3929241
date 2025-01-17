import { Pinecone } from '@pinecone-database/pinecone'
import OpenAI from "openai";

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

const prompt = openai.redactarPrompt(usuario);

const sugerencia_ChatGPT = await openai.sugerenciaPropiedades(prompt);

const promptBusqueda = pinecone.promptBusqueda(sugerencia_ChatGPT);

const busquedaFormatoEmbeddings = await openai.generador_embedings(promptBusqueda);

const propiedadesEncontradas = await pinecone.buscarDatos(busquedaFormatoEmbeddings);


console.log(sugerencia_ChatGPT, propiedadesEncontradas);