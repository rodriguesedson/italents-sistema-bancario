class Conta {
  titular;
  numero;
  saldo = 0;

  constructor(titular) {
    this.titular = titular;
  }

  definirNumeroConta(tipoConta, listaContas) {
    if(tipoConta === 'corrente') {
      this.numero = `CC${listaContas.length + 1}`;
    } else if (tipoConta === 'poupanca') {
      this.numero = `CP${listaContas.length + 1}`;
    }
  }

  depositar(valor) {
    this.saldo += valor;
    console.log(`Novo saldo: ${this.saldo}`);
  }

  sacar(valor) {
    this.saldo -= valor;
    console.log(`Novo saldo: ${this.saldo}`);
  }

  exibirSaldo() {
    console.log(`
      Conta: ${this.numero}
      Titular: ${this.titular}
      Saldo atual: ${this.saldo}
    `);
  }
}

export default Conta;