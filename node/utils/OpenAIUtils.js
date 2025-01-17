import OpenAI from "openai";
import axios from 'axios';

import dotenv from "dotenv";
dotenv.config();

const openAIApiKey = process.env.OPENAI_API_KEY;

class OpenAIUtils {
    constructor() {
        this.openai = new OpenAI({ openAIApiKey });
    }

    async consulta_chatGPT() {

        const consultaOpenAI_chatGPT = await this.openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                { role: "system", content: "Hablas en español, todas tus respuestas estan en rima continua. Crea respuestas breves de 2 párrafos o menos" },
                {
                    role: "user",
                    content: "Cuéntame como preparar un huevo benedictino",
                },
            ],
        });

        return consultaOpenAI_chatGPT.choices[0].message;

    }

    async generador_embedings(texto) {
        try {
            const response = await axios.post(
                'https://api.openai.com/v1/embeddings',
                {
                    model: 'text-embedding-3-small',
                    input: texto,
                },
                {
                    headers: {
                        Authorization: `Bearer ${openAIApiKey}`,
                    },
                }
            );

            const embedding = response.data.data[0].embedding;
            return embedding

        } catch (error) {
            console.error('Error al generar embedding:', error);
            return null;
        }


    }


    async sugerenciaPropiedades(prompt) {
        const completion = await this.openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                {
                    role: "system",
                    content: `Eres un sistema de asesoría de bienes raíces, analizas las caracteristicas de una persona y sugieres la propiedad que mejor se ajuste a sus necesecidades, respondes con 4 parámetros:

                    - ubicacion: con una sugerencia entre montaña, playa o ciudad
                    - tamano: con una sugerencia del tamaño de la propiedad entre grande, mediano o pequeño
                    - precio: con una sugerencia de precio en euros
                    - sugerencia: un breve texto con los detalles de la recomendación enfocados en los intereses del usuario.
                    usa un formato similar a "Una propiedad cerca de [ubicacion] de tamaño [tamano] puede interesarte por [beneficios]".

                    Devuelve una respuesta en formato JSON con los 4 parámetros solicitados` },
                {
                    role: "user",
                    content: prompt,
                },
            ],
            response_format: {
                "type": "json_object"
            },
            max_completion_tokens: 120,
        });

        const respuestaJson = JSON.parse(completion.choices[0].message.content);

        return respuestaJson;
    }

    redactarPrompt = (datosUsuario) => {
        return `Analiza qué tipo de propiedad se ajusta a las necesidades de una persona de ${datosUsuario.edad} años, ${datosUsuario.estadoCivil}, con ${datosUsuario.hijos} hijos, con un presupuesto ${datosUsuario.presupuesto} y cuyos intereses son: ${datosUsuario.intereses}`;
    }


}

export default OpenAIUtils;