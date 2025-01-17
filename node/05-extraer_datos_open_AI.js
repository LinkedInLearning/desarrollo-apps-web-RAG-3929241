import OpenAIUtils from "./utils/OpenAIUtils.js";

const openai = new OpenAIUtils();

const usuario = {
    edad: 25,
    estadoCivil: "soltero",
    hijos: 0,
    presupuesto: "medio",
    intereses: "Café, el dinero y las compras",
};

const prompt = openai.redactarPrompt(usuario);

const sugerencia_ChatGPT = await openai.sugerenciaPropiedades(prompt);

console.log(sugerencia_ChatGPT);