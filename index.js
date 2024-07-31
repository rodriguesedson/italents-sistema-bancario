import ContaCorrente from './ContaCorrente.js';
import ContaPoupanca from './ContaPoupanca.js';
import promptSync from 'prompt-sync';

const prompt = promptSync();
let contasCorrente = [];
let contasPoupanca = [];

/*
  CRIAÇÃO DA CONTA
*/
function criarConta() {
  let continuar = true;
  do {
    console.log(`
      1 - Conta Corrente;
      2 - Conta Poupança;
      0 - Cancelar;
    `);
    let opcao = +prompt('Qual o tipo de conta que deseja criar? ');
    switch(opcao) {
      case 1:
        criarContaCorrente();
        break;
      case 2:
        criarContaPoupanca();
        break;
      case 0:
        console.log('Retornando ao menu inicial');
        continuar = false;
    }
  } while(continuar);
}

function criarContaCorrente() {
  let titular = prompt('Qual o nome do titular da conta corrente? ');
  let novaContaCorrente = new ContaCorrente(titular);
  novaContaCorrente.definirNumeroConta('corrente', contasCorrente);
  contasCorrente.push(novaContaCorrente);
  console.log(`
    Número da conta: ${contasCorrente[contasCorrente.length - 1].numero} | Titular: ${titular};
  `)
}

function criarContaPoupanca() {
  let titular = prompt('Qual o nome do titular da conta poupança? ');
  let novaContaPoupanca = new ContaPoupanca(titular);
  novaContaPoupanca.definirNumeroConta('poupanca', contasPoupanca);
  contasPoupanca.push(novaContaPoupanca);
}

/*
  ACESSAR CONTA
*/
function acessarConta() {
  let numeroConta = prompt('Qual o tipo e o número da conta? ')
  let tipoConta = numeroConta.slice(0, 1);
  if (tipoConta === 'CC') {
    menuConta(contasCorrente, numeroConta);
  } else {
    menuConta(contasPoupanca, numeroConta);
  }
}

function menuConta(listaContas, numeroConta) {
  let continuar = true;
  do {
    console.log(`
      Operações:
        1 - Depositar
        2 - Sacar
        3 - Exibir saldo
        0 - Cancelar
    `);
    let opcao = +prompt('Qual das operações acima deseja realizar? ');

    switch(opcao) {
      case 1:
        listaContas.filter(conta => {
          if (conta.numero === numeroConta) {
            let valor = +prompt('Qual o valor a depositar? ');
            conta.depositar(valor);
          }
        });
        break;
      case 2:
        listaContas.filter(conta => {
          if (conta.numero === numeroConta) {
            let valor = +prompt('Qual o valor a sacar? ');
            conta.sacar(valor);
          }
        })
        break;
      case 3:
        listaContas.filter(conta => {
          conta.exibirSaldo();
        })
        break;
      case 0:
        console.log('Encerrado operações. Retornando ao menu principal');
        continuar = false;
    }
  } while(continuar);
}

/*
  MENU DO SISTEMA
*/
function main() {
  //menu criar conta ou acessar conta
  let continuar = true;
  do {
    console.log('Bem vindo ao sistema do banco Banco');
    console.log(`
      Banco Banco
      1 - Criar conta;
      2 - Acessar conta;
      0 - Encerrar acesso;
    `);

    let opcao = +prompt('Escolha uma das opções acima: ');
    switch(opcao) {
      case 1:
        criarConta();
        break;
      case 2:
        acessarConta();
        break;
      case 0:
        console.log('Encerrando sistema...');
        continuar = false;
    }
  } while(continuar);
}

main();