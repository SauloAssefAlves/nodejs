import fs from "fs";
import chalk from "chalk";

function trataErro(erro) {
  throw new Error(chalk.red(erro.code, "Não há arquivo no diretório"));
}

//async e await
async function pegaArquivo(caminhoArquivo) {
  try {
    const encoding = "utf-8";
    const texto = await fs.promises.readFile(caminhoArquivo, encoding);
    console.log(chalk.green(texto));
  } catch (erro) {
    trataErro(erro);
  } finally {
    console.log(chalk.yellow("operação concluída"));
  }

}

//promisses com then()
// function pegaArquivo(caminhoArquivo) {
//   const encoding = "utf-8";
//   fs.promises.readFile(caminhoArquivo, encoding).then((response) => {
//     console.log("AQUI", chalk.green(response));
//   }).catch(trataErro)
// }

// function pegaArquivo(caminhoDoArquivo) {
//   const encoding = "utf-8";
//   fs.readFile(caminhoDoArquivo, encoding, (erro, texto) => {
//     if (erro) {
//       trataErro(erro);
//     }
//     console.log(chalk.green(texto));
//   });
// }

pegaArquivo("./arquivos/texto.md");
pegaArquivo("./arquivos/");
