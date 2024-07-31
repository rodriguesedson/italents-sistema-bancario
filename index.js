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
  let titular = prompt('Qual o nome do titular da conta corrente? ');
  let novaContaCorrente = new ContaCorrente(titular);
  //definir número da conta com base no tamanho da lista
  novaContaCorrente.definirNumeroConta('corrente', contasCorrente);
  contasCorrente.push(novaContaCorrente);
  console.log(`
    Número da conta corrente: ${contasCorrente[contasCorrente.length - 1].numero} | Titular: ${titular};
  `)
}

function criarContaPoupanca() {
  let titular = prompt('Qual o nome do titular da conta poupança? ');
  let novaContaPoupanca = new ContaPoupanca(titular);
  //definir número da conta com base no tamanho da lista
  novaContaPoupanca.definirNumeroConta('poupanca', contasPoupanca);
  contasPoupanca.push(novaContaPoupanca);
  console.log(`
    Número da conta poupança: ${contasPoupanca[contasPoupanca.length - 1].numero} | Titular: ${titular};
  `)
}

function solicitarNome() {
  
}

/*
  ACESSAR CONTA
*/
function acessarConta() {
  let numeroConta = prompt('Qual o tipo e o número da conta? ')
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
      valor = +prompt('Qual o valor a sacar? ');
    //opção de valor a depositar
    } else if (operacao === 'deposito') {
      valor = +prompt('Qual o valor a depositar? ');
    //opção menu de acesso à conta
    } else if (operacao === 'opcao-conta') {
      let padraoMenu = /[0-3]/
      do {
        valor = +prompt('Qual das operações acima deseja realizar? ');
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
        valor = +prompt('Qual o tipo de conta que deseja criar? ');
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