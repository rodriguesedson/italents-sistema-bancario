import Conta from './Conta.js';

class ContaCorrente extends Conta {
  juros = 0.05;

  constructor(titular) {
    super(titular);
  }

  aplicarJuros() {
    let valorJuros = this.saldo * this.juros;
    this.saldo += valorJuros;
  }
}

export default ContaCorrente;