import PineConeUtils from "./utils/PineConeUtils.js";
import OpenAIUtils from "./utils/OpenAIUtils.js";


const openai = new OpenAIUtils();
const pinecone = new PineConeUtils();


const promptBusqueda = `una casa con mucho sol y arena`;

const busquedaFormatoEmbeddings = await openai.generador_embedings(promptBusqueda);

const propiedadesEncontradas = await pinecone.buscarDatos(busquedaFormatoEmbeddings);

console.log('Propiedades Encontradas:', propiedadesEncontradas);