# Guia de Deploy Rápido: vitrine.imobifolio.com.br
Ambiente: VPS Contabo com CyberPanel (OpenLiteSpeed)

---

### PASSO 1: Emitir o SSL no CyberPanel
1. Acesse seu painel do CyberPanel (`https://IP-DA-VPS:8090`).
2. No menu lateral, clique em **SSL** -> **Manage SSL**.
3. Selecione o site **`vitrine.imobifolio.com.br`** e clique em **Issue SSL**.
*(Certifique-se de que o DNS tipo A para "vitrine" já propagou para o IP da VPS).*

---

### PASSO 2: Configurar o Proxy Reverso no CyberPanel (OpenLiteSpeed)
Para que o CyberPanel direcione o tráfego de `https://vitrine.imobifolio.com.br` para o nosso container Docker:

1. No CyberPanel, vá em **Websites** -> **List Websites**.
2. Clique em **Manage** ao lado de `vitrine.imobifolio.com.br`.
3. Role até a seção de configurações e clique em **vHost Conf** (ou altere o arquivo de regras de rewrite).
4. Adicione as seguintes regras de Proxy Reverso no final do arquivo e salve:

```apache
extprocessor imobifolio_node {
  type                    proxy
  address                 127.0.0.1:3000
  maxConns                100
  pcKeepAliveTimeout      60
  initTimeout             60
  retryTimeout            0
  respBuffer              0
}

context / {
  type                    proxy
  handler                 imobifolio_node
  addDefaultCharset       off
}
```

5. Reinicie o OpenLiteSpeed no menu superior do CyberPanel ou pelo terminal.

---

### PASSO 3: Instalar o Docker na VPS Contabo (se ainda não tiver)
Acesse a VPS via SSH (usando PuTTY, Terminal do Windows ou PowerShell):

```bash
ssh root@IP_DA_SUA_VPS
```

Execute o instalador oficial do Docker:
```bash
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh
```

---

### PASSO 4: Enviar o Projeto e Iniciar
1. Crie uma pasta na VPS:
```bash
mkdir -p /home/imobifolio
cd /home/imobifolio
```

2. Você pode enviar os arquivos do projeto para `/home/imobifolio` via Git ou SFTP (FileZilla).

3. Com os arquivos na pasta, basta rodar um único comando:
```bash
docker compose up -d --build
```

4. Para rodar o seed com os dados brasileiros no banco de produção pela primeira vez:
```bash
docker compose exec app pnpm db:seed
```

Pronto! Seu site estará 100% no ar em **https://vitrine.imobifolio.com.br** com HTTPS ativo, Next.js 15 otimizado e banco PostgreSQL isolado.
