import { Pinecone } from '@pinecone-database/pinecone'

import dotenv from "dotenv";
dotenv.config();

const pineConeApiKey = process.env.PINECONE_API_KEY;


class PineConeUtils {

    constructor() {
        this.pinecone = new Pinecone(
            {
                apiKey: pineConeApiKey,
            }
        );
        this.index = this.pinecone.index('mi-app-rag');
    }

    async almacenarDatos(data) {
        try {
            await this.index.upsert(data);
            console.log(`datos almacenados en Pinecone`);
        } catch (error) {
            console.error('Error al almacenar embeddings en Pinecone:', error);
        }
    }

    async buscarDatos(queryFormatoEmbeddings) {
        try {

            const queryResponse = await this.index.query({
                vector: queryFormatoEmbeddings, // El embedding con la busqueda
                topK: 3, // Número de entradas similares que quieres devolver
                includeValues: false, // Incluir valores de los vectores (opcional)
                includeMetadata: true, // Incluir los metadatos (nombre, descripción)
            });

            return queryResponse.matches; // Resultados más cercanos


        } catch (error) {
            console.error('Error al buscar:', error);
            return [];
        }
    }

    promptBusqueda = (preferencias) => {
        return `Propiedad en la ${preferencias.ubicacion} de tamaño ${preferencias.tamano} y un precio de ${preferencias.precio}.`;
    }

}

export default PineConeUtils;