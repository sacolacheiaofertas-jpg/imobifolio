import { GlobalConfig } from "payload"

export const SiteSettings: GlobalConfig = {
  slug: "site-settings",
  label: "Configurações do Site (White-Label)",
  access: {
    read: () => true,
    update: ({ req }) => Boolean(req.user),
  },
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: "Identidade & Marca",
          fields: [
            {
              name: "siteName",
              label: "Nome da Imobiliária / Corretor",
              type: "text",
              required: true,
              defaultValue: "Imobifolio",
            },
            {
              name: "tagline",
              label: "Slogan / Subtítulo",
              type: "text",
              defaultValue: "Imóveis Exclusivos e de Alto Padrão",
            },
            {
              name: "logo",
              label: "Logotipo Personalizado",
              type: "upload",
              relationTo: "media",
            },
            {
              name: "creci",
              label: "CRECI Jurídico / Responsável",
              type: "text",
              defaultValue: "CRECI 12345-J",
            },
          ],
        },
        {
          label: "Contato & WhatsApp",
          fields: [
            {
              name: "whatsappNumber",
              label: "Número de WhatsApp Principal (apenas números com DDD)",
              type: "text",
              required: true,
              defaultValue: "5511999998888",
              admin: {
                description: "Exemplo: 5511999998888 (com DDI 55 e DDD)",
              },
            },
            {
              name: "whatsappDefaultMessage",
              label: "Mensagem Padrão de Contato Geral",
              type: "text",
              defaultValue: "Olá! Vi o site e gostaria de mais informações sobre os imóveis disponíveis.",
            },
            {
              name: "primaryPhone",
              label: "Telefone de Contato (Exibição)",
              type: "text",
              defaultValue: "(11) 99999-8888",
            },
            {
              name: "contactEmail",
              label: "E-mail de Contato",
              type: "email",
              defaultValue: "contato@imobifolio.com.br",
            },
            {
              name: "address",
              label: "Endereço Físico / Cidade Base",
              type: "text",
              defaultValue: "São Paulo - SP, Brasil",
            },
          ],
        },
        {
          label: "Aparência & Cores",
          fields: [
            {
              name: "primaryColor",
              label: "Cor Primária da Marca (Hex)",
              type: "text",
              defaultValue: "#B8860B",
              admin: {
                description: "Código Hexadecimal da cor de destaque da marca (Ex: #B8860B dourado, #0F172A azul marinho, #16A34A verde)",
              },
            },
          ],
        },
      ],
    },
  ],
}
