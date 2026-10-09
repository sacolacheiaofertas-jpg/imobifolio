import { specializations } from "@/config/helpers/specializations"
import { fakerPT_BR as faker } from "@faker-js/faker"
import { Payload } from "payload"

const brazilianAgentsData = [
  { firstName: "Roberto", lastName: "Silveira", title: "Especialista em Alto Padrão", state: "SP" },
  { firstName: "Camila", lastName: "Albuquerque", title: "Consultora Imobiliária", state: "SP" },
  { firstName: "Rodrigo", lastName: "Fontes", title: "Diretor Comercial", state: "RJ" },
  { firstName: "Juliana", lastName: "Meirelles", title: "Especialista em Coberturas e Vista Mar", state: "RJ" },
  { firstName: "Marcelo", lastName: "Bittencourt", title: "Consultor de Investimentos Imobiliários", state: "SC" },
  { firstName: "Luciana", lastName: "Fagundes", title: "Especialista em Imóveis de Luxo", state: "SC" },
  { firstName: "André", lastName: "Carvalho", title: "Corretor de Imóveis Residenciais", state: "PR" },
  { firstName: "Beatriz", lastName: "Vasconcelos", title: "Consultora de Lançamentos", state: "PR" },
  { firstName: "Felipe", lastName: "Nogueira", title: "Especialista em Condomínios Fechados", state: "SP" },
  { firstName: "Gabriela", lastName: "Mendonça", title: "Gestora de Vendas e Locações", state: "MG" },
]

export const seedAgents = async (payload: Payload) => {
  const media = await payload.find({
    collection: "media",
    where: {
      filename: {
        contains: "agent",
      },
    },
    limit: 100,
  })

  const profilePhoto = () => faker.helpers.arrayElement(media.docs).id

  for (let i = 0; i < brazilianAgentsData.length; i++) {
    const agent = brazilianAgentsData[i]
    const creciNum = faker.number.int({ min: 10000, max: 99999 })
    const phoneDdd = agent.state === "SP" ? "11" : agent.state === "RJ" ? "21" : agent.state === "SC" ? "48" : agent.state === "PR" ? "41" : "31"
    const phoneNum = `(${phoneDdd}) 9${faker.number.int({ min: 8000, max: 9999 })}-${faker.number.int({ min: 1000, max: 9999 })}`

    const cleanEmail = `${agent.firstName}.${agent.lastName}`
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9.]/g, "")

    await payload.create({
      collection: "agents",
      data: {
        email: `corretor${i + 1}@imobiliaria.com.br`,
        password: "corretor123",
        first_name: agent.firstName,
        last_name: agent.lastName,
        phone: phoneNum,
        contact_email: `${cleanEmail}@imobiliaria.com.br`,
        licenses: [
          {
            license_number: `CRECI ${creciNum}-F`,
            state: agent.state,
          },
        ],
        title: agent.title,
        profilePhoto: profilePhoto(),
        specializations: faker.helpers.arrayElements(specializations).map((s) => s.value),
      },
    })
  }

  console.log(`Seeded ${brazilianAgentsData.length} Brazilian agents`)
}
