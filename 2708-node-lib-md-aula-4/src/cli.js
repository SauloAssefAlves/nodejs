import chalk from "chalk";
import fs from "fs";
import pegaArquivo from "./index.js";
import listaValidada from "./http-validacao.js";

const caminho = process.argv;

function imporimeLista(valida, result, identificador = "") {
  if (valida) {
    console.log(
      chalk.yellow("lista validada"),
      chalk.black.bgGreen(identificador),
      listaValidada(result)
    );
  } else {
    console.log(
      chalk.yellow("lista de links"),
      chalk.black.bgGreen(identificador),
      result
    );
  }
}

async function processaTexto(argumentos) {
  const caminho = argumentos[2];
  const valida = argumentos[3] === "--valida";

  try {
    fs.lstatSync(caminho);
  } catch (erro) {
    if (erro.code === "ENOENT") {
      console.log(chalk.red("Arquivo ou diretorio não existe"));
      return;
    }
  }

  if (fs.lstatSync(caminho).isFile()) {
    const resultado = await pegaArquivo(caminho);
    imporimeLista(valida, resultado);
  } else if (fs.lstatSync(caminho).isDirectory()) {
    const arquivos = await fs.promises.readdir(caminho);
    arquivos.forEach(async (nomeDeArquivo) => {
      const lista = await pegaArquivo(`${caminho}/${nomeDeArquivo}`);
      imporimeLista(valida, lista, nomeDeArquivo);
    });
  }
}

processaTexto(caminho);
