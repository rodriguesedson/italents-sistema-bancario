import Conta from './Conta.js';

class ContaPoupanca extends Conta {
  rendimento = 0.1;

  constructor(titular) {
    super(titular);
  }

  aplicarRendimento() {
    let valorRendimento = this.saldo * this.rendimento;
    this.saldo += valorRendimento;
  }
}

export default ContaPoupanca;