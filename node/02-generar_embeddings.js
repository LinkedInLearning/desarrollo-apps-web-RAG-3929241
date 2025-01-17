import OpenAIUtils from "./utils/OpenAIUtils.js";

const openAIUtils = new OpenAIUtils();

/// Array con propiedades
const propiedades = [

    {
      "id": "1",
      "titulo": "Impresionante mansion frente al mar con jardín privado",
      "ubicacion": "Playa",
      "tamano": "Grande",
      "metrosCuadrados": 400,
      "habitaciones": 6,
      "banos": 5,
      "precio": 1200000
    },
    {
      "id": "f203bf50-0ced-47a0-89af-2327a65bc9af",
      "titulo": "Casa de lujo con vistas panorámicas en la montana",
      "ubicacion": "Montana",
      "tamano": "Grande",
      "metrosCuadrados": 350,
      "habitaciones": 5,
      "banos": 4,
      "precio": 900000
    }

  ];

  const procesarListaEmbeddings = async () => {

    // Crea el valor que almacenaremos y le da formato de embeddings
    for (const propiedad of propiedades) {

      const texto = `${propiedad.titulo} , ubicación en la ${propiedad.ubicacion} con ${propiedad.habitaciones} habitaciones y ${propiedad.banos} baños. Tiene un tamaño ${propiedad.tamano} de ${propiedad.metrosCuadrados} metros cuadrados y un precio de ${propiedad.precio} euros.`;

      const embedding = await openAIUtils.generador_embedings(texto);

      return embedding;
    }

  }

  console.log( await procesarListaEmbeddings() );