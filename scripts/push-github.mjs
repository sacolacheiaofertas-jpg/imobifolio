import git from "isomorphic-git"
import http from "isomorphic-git/http/node"
import fs from "fs"
import path from "path"

const dir = process.cwd()

async function pushToGitHub() {
  const token = process.env.GITHUB_TOKEN
  if (!token) {
    console.error("Token não definido")
    process.exit(1)
  }

  console.log("1. Inicializando repositório Git local...")
  try {
    await git.init({ fs, dir, defaultBranch: "main" })
  } catch (e) {}

  console.log("2. Adicionando arquivos do projeto...")
  const files = await listFiles(dir)
  console.log(`Encontrados ${files.length} arquivos. Adicionando...`)

  for (const file of files) {
    try {
      await git.add({ fs, dir, filepath: file })
    } catch (err) {
      console.warn("Aviso ao adicionar:", file, err.message)
    }
  }

  console.log("3. Criando commit de lançamento...")
  try {
    const sha = await git.commit({
      fs,
      dir,
      author: {
        name: "sacolacheiaofertas-jpg",
        email: "sacolacheiaofertas-jpg@users.noreply.github.com",
      },
      message: "feat: Imobifolio launch for Vercel deployment with Brazilian properties and white-label settings",
    })
    console.log("Commit:", sha)
  } catch (err) {
    console.log("Commit notice:", err.message)
  }

  console.log("4. Configurando branch e remote origin...")
  const remoteUrl = "https://github.com/sacolacheiaofertas-jpg/imobifolio.git"

  try {
    await git.deleteRemote({ fs, dir, remote: "origin" })
  } catch (e) {}

  await git.addRemote({
    fs,
    dir,
    remote: "origin",
    url: remoteUrl,
  })

  console.log("5. Enviando código para o GitHub (Push)...")
  const pushResult = await git.push({
    fs,
    http,
    dir,
    remote: "origin",
    ref: "main",
    force: true,
    onAuth: () => ({
      username: token,
      password: "",
    }),
  })

  console.log("Push concluído com sucesso!", pushResult)
}

async function listFiles(currentDir, relativePath = "") {
  const entries = await fs.promises.readdir(currentDir, { withFileTypes: true })
  let results = []

  const ignoredRoot = new Set([
    "node_modules",
    ".git",
    ".next",
    ".pgdata",
    "media",
    "public/media",
    "imobifolio-deploy.zip",
    "imobifolio-deploy.tar.gz",
    ".env",
  ])

  for (const entry of entries) {
    const rel = relativePath ? `${relativePath}/${entry.name}` : entry.name

    if (!relativePath && ignoredRoot.has(entry.name)) continue
    if (entry.name === "node_modules" || entry.name === ".git") continue
    if (entry.name.endsWith(".zip") || entry.name.endsWith(".tar.gz") || entry.name.endsWith(".log")) continue

    const fullPath = path.join(currentDir, entry.name)

    if (entry.isDirectory()) {
      const sub = await listFiles(fullPath, rel)
      results = results.concat(sub)
    } else {
      results.push(rel)
    }
  }

  return results
}

pushToGitHub().catch((err) => {
  console.error("Falha ao subir código:", err)
  process.exit(1)
})
