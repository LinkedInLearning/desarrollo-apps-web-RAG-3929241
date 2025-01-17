import OpenAIUtils from "./utils/OpenAIUtils.js";
import PineConeUtils from "./utils/PineConeUtils.js";

const openAIUtils = new OpenAIUtils();
const pinecone = new PineConeUtils();

import fs from 'fs';

/// Array con propiedades
const propiedades = JSON.parse(fs.readFileSync('data/propiedades.json', 'utf-8'));

const procesarListaEmbeddings = async () => {

  // Crea el valor que almacenaremos y le da formato de embeddings
  for (const propiedad of propiedades) {

    const texto = `${propiedad.titulo} , ubicación en la ${propiedad.ubicacion} con ${propiedad.habitaciones} habitaciones y ${propiedad.banos} baños. Tiene un tamaño ${propiedad.tamano} de ${propiedad.metrosCuadrados} metros cuadrados y un precio de ${propiedad.precio} euros.`;

    let embedding = await openAIUtils.generador_embedings(texto);
    propiedad.values = embedding;
  }

  // crea uno nuevo array con el formato que espera Pinecone
  const productosFormatoEmbedding = propiedades.map((producto) => {
    return {
        id: producto.id,
        values: producto.values,
        metadata: { titulo: producto.titulo },
      };
  });

  // retorna el array listo para almacenar
  return productosFormatoEmbedding

}

const guardarDatos =  async () => {
  const datosProcesados = await procesarListaEmbeddings();
  pinecone.almacenarDatos(datosProcesados);
}

guardarDatos();