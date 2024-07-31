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
    let opcao = solicitarNumero('opcao-cadastro');

    switch(opcao) {
      case 1:
        criarContaCorrente();
        break;
      case 2:
        criarContaPoupanca();
        break;
      case 0:
        console.log('Encerrando cadastro. Retornando ao menu inicial.');
        continuar = false;
    }
  } while(continuar);
}

function criarContaCorrente() {
  let titular = solicitarNome('CC');
  let novaContaCorrente = new ContaCorrente(titular);
  //definir número da conta com base no tamanho da lista
  novaContaCorrente.definirNumeroConta('corrente', contasCorrente);
  contasCorrente.push(novaContaCorrente);
  console.log(`
    Número da conta corrente: ${contasCorrente[contasCorrente.length - 1].numero} | Titular: ${titular};
  `)
}

function criarContaPoupanca() {
  let titular = solicitarNome('CP');
  let novaContaPoupanca = new ContaPoupanca(titular);
  //definir número da conta com base no tamanho da lista
  novaContaPoupanca.definirNumeroConta('poupanca', contasPoupanca);
  contasPoupanca.push(novaContaPoupanca);
  console.log(`
    Número da conta poupança: ${contasPoupanca[contasPoupanca.length - 1].numero} | Titular: ${titular};
  `)
}

function solicitarNome(tipoConta) {
  let titular;
  let padraoNumeros = /[0-9]/;
  let continuar = true;

  do {
    //solicitar nome do titular conforme tipo de conta
    if (tipoConta === 'CC') {
      titular = prompt('[CADASTRO DE CONTA] Qual o nome do titular da conta corrente? ');
    } else if (tipoConta === 'CP') {
      titular = prompt('[CADASTRO DE CONTA POUPANÇA] Qual o nome do titular da conta poupança? ');
    }

    //verificar se há caracteres inválidos no nome
    if (padraoNumeros.test(titular)) {
      console.log('Entrada inválida. Informe o nome com letras maiúsculas/minúsculas.');
    //verificar se o nome está em branco
    } else if (titular === '') {
      console.log('Nome em branco. Informe o nome do titular para prosseguir com o cadastro.');
    } else {
      continuar = false;
    }
  } while (continuar);

  return titular;
}

/*
  ACESSAR CONTA
*/
function acessarConta() {
  let numeroConta = prompt('[ACESSO À CONTA] Qual o tipo e o número da conta? ')
  let tipoConta = numeroConta.slice(0, 2);
  
  //acessar conta conforme tipo
  if (tipoConta === 'CC') {
    menuConta(contasCorrente, numeroConta);
  } else {
    menuConta(contasPoupanca, numeroConta);
  }
}

//menu de acesso à conta
function menuConta(listaContas, numeroConta) {
  let continuar = true;

  //pesquisar conta por número de registro
  listaContas.filter(conta => {
    if (numeroConta === conta.numero) {
      console.log('Conta encontrada');

      do {
        console.log(`
          Operações:
            1 - Depositar
            2 - Sacar
            3 - Exibir saldo
            0 - Cancelar
        `);
        let opcao = solicitarNumero('opcao-conta');
        let valor = 0;
    
        switch(Number(opcao)) {
          case 1:
              valor = solicitarNumero('deposito');
              conta.depositar(valor);
            break;
          case 2:
              valor = solicitarNumero('saque');
              conta.sacar(valor);
            break;
          case 3:
              conta.exibirSaldo();
            break;
          case 0:
            console.log('Encerrado operações. Retornando ao menu principal');
            continuar = false;
        }
      } while(continuar);
    } else {
      console.log('Conta não encontrada. Digite o tipo da conta junto ao número - Ex.: CC1 para conta corrente e CP1 para conta poupança');
    }
  })
}

//verificação de validade do ńumero inserido (saque, depósito, opção acesso à conta, opção de cadastro)
function solicitarNumero(operacao) {
  let valor = 0;
  let padraoLetras = /[abc]/;
  let continuar = true;

  do {
    //opção de valor a sacar
    if (operacao === 'saque') {
      valor = +prompt('[SAQUE] Qual o valor a sacar? ');
    //opção de valor a depositar
    } else if (operacao === 'deposito') {
      valor = +prompt('[DEPÓSITO] Qual o valor a depositar? ');
    //opção menu de acesso à conta
    } else if (operacao === 'opcao-conta') {
      let padraoMenu = /[0-3]/
      do {
        valor = +prompt('[ACESSO À CONTA] Qual das operações acima deseja realizar? ');
        if (padraoMenu.test(valor) === false) {
          console.log('Entrada inválida. Escolha entre as opções indicadas.')
        } else {
          continuar = false;
        }
      } while (continuar);
    //opção menu de cadastro
    } else if (operacao === 'opcao-cadastro') {
      let padraoMenu = /[0-2]/
      do {
        valor = +prompt('[CADASTRO DE CONTA] Qual o tipo de conta que deseja criar? ');
        if (padraoMenu.test(valor) === false) {
          console.log('Entrada inválida. Escolha entre as opções indicadas - 0 a 2.');
        } else {
          continuar = false;
        }
      } while (continuar);
    }

    if (padraoLetras.test(valor) || valor < 0) {
      console.log('Entrada inválida. Insira apenas números a partir de 0.');
    } else {
      continuar = false;
    }
  } while (continuar);
  return valor;
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

    let opcao = solicitarOpcaoMenu();

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

function solicitarOpcaoMenu() {
  let opcao;
  let padraoOpcoes = /[0-2]/;
  let continuar = true;

  do {
    opcao = +prompt('Escolha uma das opções acima: ');
    if (padraoOpcoes.test(opcao) === false) {
      console.log('Entrada inválida. Escolha entre as opções de 0 a 2.');
    } else {
      continuar = false;
    }
  } while (continuar);

  return opcao;
}

main();