import { Feature } from '@/payload-types'
import { Payload } from 'payload'

type FeatureCategory = Feature['category']

// Comodidades internas
const interiorFeatures = [
  { name: 'Piso em Porcelanato' },
  { name: 'Bancadas em Quartzo / Granito' },
  { name: 'Eletrodomésticos Inox Embutidos' },
  { name: 'Closet Amplo na Suíte' },
  { name: 'Lareira Ecológica' },
  { name: 'Conceito Aberto Integrado' },
  { name: 'Pé-Direito Duplo' },
  { name: 'Ar-Condicionado Split em Todos os Ambientes' },
  { name: 'Iluminação em LED Embutida' },
  { name: 'Cozinha Gourmet Planejada' },
  { name: 'Automação Residencial' },
  { name: 'Home Office / Escritório Privativo' },
  { name: 'Suíte Master com Hidromassagem' },
  { name: 'Lavanderia Independente' },
  { name: 'Varanda Integrada com Fechamento em Vidro' },
]

// Comodidades externas
const exteriorFeatures = [
  { name: 'Piscina Privativa com Deck Molhado' },
  { name: 'Churrasqueira a Carvão' },
  { name: 'Espaço Gourmet Externo' },
  { name: 'Quintal Gramado com Jardim' },
  { name: 'Garagem Coberta para 3+ Carros' },
  { name: 'Jardim Paisagístico' },
  { name: 'Vista Panorâmica para o Mar' },
  { name: 'Vista Livre para a Cidade' },
  { name: 'Energia Solar Fotovoltaica' },
  { name: 'Terraço Rooftop com Jacuzzi' },
]

// Comodidades de condomínio
const communityFeatures = [
  { name: 'Condomínio Fechado de Alto Padrão' },
  { name: 'Portaria e Segurança Armada 24h' },
  { name: 'Piscina Aquecida Coberta' },
  { name: 'Playground Infantil' },
  { name: 'Quadra de Beach Tennis' },
  { name: 'Quadra Poliesportiva' },
  { name: 'Espaço Pet / Pet Place' },
  { name: 'Salão de Festas Climatizado' },
  { name: 'Academia Completa / Espaço Fitness' },
  { name: 'Coworking Exclusivo para Moradores' },
  { name: 'Brinquedoteca Equipada' },
]

// Outros
const otherFeatures = [
  { name: 'Recém Reformado' },
  { name: 'Pronto para Morar (Porteira Fechada)' },
  { name: 'Alto Padrão de Acabamento' },
  { name: 'Elevador Privativo com Biometria' },
]

const allFeatures = [
  ...interiorFeatures.map((f) => ({ ...f, category: 'interior' as FeatureCategory })),
  ...exteriorFeatures.map((f) => ({ ...f, category: 'exterior' as FeatureCategory })),
  ...communityFeatures.map((f) => ({ ...f, category: 'community' as FeatureCategory })),
  ...otherFeatures.map((f) => ({ ...f, category: 'other' as FeatureCategory })),
]

export const seedFeatures = async (payload: Payload) => {
  for (const feature of allFeatures) {
    await payload.create({
      collection: 'features',
      data: feature,
    })
  }
  console.log(`Created ${allFeatures.length} Brazilian features`)
}
