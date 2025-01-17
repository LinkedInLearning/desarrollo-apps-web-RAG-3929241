import OpenAIUtils from "./utils/OpenAIUtils.js";

const openai = new OpenAIUtils();

const consultaBasica = await openai.consulta_chatGPT();

console.log(consultaBasica)