import fs from "fs";
import chalk from "chalk";

function extrairLinks(texto) {
  const regex = /\[([^[\]]*?)\]\((https?:\/\/[^\s?#.].[^\s]*)\)/gm;

  const capturas = [...texto.matchAll(regex)];
  const resultados = capturas.map((cap) => ({
    [cap[1]]: cap[2],
  }));
  return resultados.length !== 0 ? resultados : "Não a links no arquivo";
}

function trataErro(erro) {
  throw new Error(chalk.red(erro.code, "Não há arquivo no diretório"));
}

//async e await
async function pegaArquivo(caminhoArquivo) {
  try {
    const encoding = "utf-8";
    const texto = await fs.promises.readFile(caminhoArquivo, encoding);
    return extrairLinks(texto);
  } catch (erro) {
    trataErro(erro);
  } finally {
    console.log(chalk.yellow("operação concluída"));
  }
}

export default pegaArquivo;

// \[([^[\]]*?)\]\((https?:\/\/[^\s?#.].[^\s]*)\)
