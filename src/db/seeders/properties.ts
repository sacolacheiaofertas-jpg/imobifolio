import { heatingTypeOptions } from "@/config/collections/Properties/heating-options"
import { propertyTypeOptions } from "@/config/collections/Properties/property-type-options"
import { Property } from "@/payload-types"
import { local } from "@/repository"
import { fakerPT_BR as faker } from "@faker-js/faker"
import { Payload } from "payload"

const brazilianStreetsByState: Record<string, string[]> = {
  SP: [
    "Rua Oscar Freire, 1420",
    "Alameda Gabriel Monteiro da Silva, 650",
    "Rua Haddock Lobo, 980",
    "Alameda dos Jaúnas, 240",
    "Rua dos Pinheiros, 730",
    "Rua Bela Cintra, 1200",
    "Rua Fradique Coutinho, 480",
    "Av. Brigadeiro Faria Lima, 3200",
    "Rua Tucuna, 810",
    "Alameda Rio Negro, 1050",
    "Rua Harmonia, 310",
    "Rua Normandia, 150",
  ],
  RJ: [
    "Av. Vieira Souto, 620",
    "Av. Delfim Moreira, 380",
    "Rua Dias Ferreira, 290",
    "Av. Atlântica, 1900",
    "Av. Lúcio Costa, 3800",
    "Rua Barão da Torre, 420",
    "Av. das Américas, 8500",
    "Rua Visconde de Pirajá, 550",
    "Rua Garcia D'Ávila, 180",
    "Rua Cupertino Durão, 95",
  ],
  PR: [
    "Rua Gutemberg, 340",
    "Av. Batel, 1680",
    "Rua Comendador Araújo, 720",
    "Rua Prof. Pedro Viriato Parigot de Souza, 2400",
    "Rua Buenos Aires, 460",
    "Rua Pasteur, 310",
  ],
  SC: [
    "Av. dos Búzios, 750",
    "Av. Atlântica, 4200",
    "Av. Brasil, 2400",
    "Avenida Pequeno Príncipe, 1650",
    "Rua das Gaivotas, 420",
    "Rua 4000, 180",
  ],
  MG: [
    "Rua Tomé de Souza, 820",
    "Av. Getúlio Vargas, 1400",
    "Rua Rio Verde, 350",
    "Rua Alvarenga Peixoto, 610",
  ],
  DF: [
    "SQS 108 Bloco C, 302",
    "SQN 214 Bloco F, 501",
    "SHIS QL 12 Conjunto 4, Casa 15",
    "CCSW 05 Lote 3, Bloco A",
  ],
}

const titlePrefixes = [
  "Apartamento de Alto Padrão",
  "Cobertura Duplex com Vista Panorâmica",
  "Casa Contemporânea em Condomínio Fechado",
  "Mansão com Piscina e Área Gourmet",
  "Sobrado Triplex com Acabamento Premium",
  "Apartamento Garden com Terraço Privativo",
  "Studio Mobiliado e Decorado",
  "Residência de Luxo Frente Mar",
  "Cobertura Linear Exclusiva",
  "Casa com Arquitetura Assinada",
  "Apartamento com Varanda Gourmet",
  "Terreno Pronto para Construir",
]

const brazilianDescriptions = [
  "Imóvel espetacular com acabamento refinado, projeto luminotécnico completo e integração perfeita entre os ambientes. Ampla varanda gourmet climatizada, suíte master com hidromassagem e marcenaria de alta qualidade em todos os cômodos.",
  "Localização nobre em rua tranquila e arborizada. Living para múltiplos ambientes com pé-direito duplo, cozinha planejada com ilha em quartzo e área externa privativa com piscina e churrasqueira para receber amigos e família.",
  "Totalmente reformado com conceito aberto, piso em porcelanato acetinado e sistema de automação residencial. Condomínio com infraestrutura completa de lazer e segurança armada 24 horas.",
  "Vista privilegiada e definitiva, ensolarado e muito arejado. Suítes confortáveis com persianas integradas elétricas, home office privativo e vagas de garagem demarcadas com ponto para carro elétrico.",
  "Uma verdadeira obra de arte contemporânea. Fachada imponente, paisagismo consolidado, materiais nobres e sustentabilidade com energia fotovoltaica instalada.",
]

export async function seedProperties(payload: Payload): Promise<void> {
  const locations = await local.location.getAll()
  const features = await payload.find({ collection: "features", limit: 100 })
  const media = await payload.find({
    collection: "media",
    limit: 100,
    where: {
      filename: {
        contains: "property_",
      },
    },
  })
  const agents = await payload.find({ collection: "agents", limit: 100 })

  const sampleProperties: Omit<Property, "id" | "updatedAt" | "createdAt">[] = Array.from(
    { length: 60 },
    () => {
      const location = faker.helpers.arrayElement(locations).original
      const stateAbbr = location.state_abbr || "SP"
      const streetList = brazilianStreetsByState[stateAbbr] || brazilianStreetsByState["SP"]
      const street = faker.helpers.arrayElement(streetList)

      const prefix = faker.helpers.arrayElement(titlePrefixes)
      const title = `${prefix} em ${location.city}`
      const description = faker.helpers.arrayElement(brazilianDescriptions)

      // Preços realistas em Reais (R$ 380.000 a R$ 8.900.000)
      const price = faker.helpers.weightedArrayElement([
        { weight: 3, value: faker.number.int({ min: 380000, max: 750000 }) },
        { weight: 4, value: faker.number.int({ min: 780000, max: 1600000 }) },
        { weight: 3, value: faker.number.int({ min: 1650000, max: 3500000 }) },
        { weight: 2, value: faker.number.int({ min: 3600000, max: 8900000 }) },
      ])

      const propType = faker.helpers.arrayElement(propertyTypeOptions).value

      return {
        title,
        description,
        street,
        location: location.id,
        address: {
          street,
          city: location.city || "São Paulo",
          state: location.state_name || "São Paulo",
          state_abbr: location.state_abbr || "SP",
          zip: location.zip || "01414-001",
          full_address: `${street}, ${location.city || "São Paulo"} - ${location.state_abbr || "SP"}, CEP ${location.zip || ""}`,
        },
        price,
        listingStatus: faker.helpers.weightedArrayElement([
          { weight: 6, value: "forsale" },
          { weight: 2, value: "contract" },
          { weight: 2, value: "pending" },
          { weight: 1, value: "sold" },
        ]),
        features: faker.helpers.arrayElements(
          features.docs.map((feature) => feature.id),
          { min: 4, max: 10 },
        ),
        details: {
          bedrooms: faker.number.int({ min: 1, max: 5 }),
          bathrooms: faker.number.int({ min: 1, max: 6 }),
          squareFeet: faker.number.int({ min: 45, max: 650 }), // Em metros quadrados
          lotSize: faker.number.int({ min: 100, max: 1200 }),
          yearBuilt: faker.number.int({ min: 2012, max: 2026 }),
          propertyType: propType,
          heatingType: faker.helpers.arrayElement(heatingTypeOptions).value,
        },
        photos: faker.helpers.arrayElements(
          media.docs.map((photo) => photo.id),
          { min: 5, max: 7 },
        ),
        agent: faker.helpers.arrayElement(agents.docs).id,
      }
    },
  )

  for (const property of sampleProperties) {
    await local.property.create(property)
  }

  console.log(`Seeded ${sampleProperties.length} Brazilian properties successfully`)
}
