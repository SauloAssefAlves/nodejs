import fs from "fs";
import chalk from "chalk";

function extrairLinks(texto) {
  const regex = /\[([^[\]]*?)\]\((https?:\/\/[^\s?#.].[^\s]*)\)/gm;

  const capturas = [...texto.matchAll(regex)];
  const resultados = capturas.map((cap) => ({
    [cap[1]]: cap[2],
  }));
  return resultados;
}

function trataErro(erro) {
  throw new Error(chalk.red(erro.code, "Não há arquivo no diretório"));
}

//async e await
async function pegaArquivo(caminhoArquivo) {
  try {
    const encoding = "utf-8";
    const texto = await fs.promises.readFile(caminhoArquivo, encoding);
    console.log(extrairLinks(texto));
  } catch (erro) {
    trataErro(erro);
  } finally {
    console.log(chalk.yellow("operação concluída"));
  }
}

pegaArquivo("./arquivos/texto.md");

// \[([^[\]]*?)\]\((https?:\/\/[^\s?#.].[^\s]*)\)
