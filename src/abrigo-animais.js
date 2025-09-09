class AbrigoAnimais {

  encontraPessoas(brinquedosPessoa1, brinquedosPessoa2, ordemAnimais) {
  }
    constructor() {
        this.animaisDisponiveis = {
            'Rex': { tipo: 'cão', brinquedos: ['RATO', 'BOLA'] },
            'Mimi': { tipo: 'gato', brinquedos: ['BOLA', 'LASER'] },
            'Fofo': { tipo: 'gato', brinquedos: ['BOLA', 'RATO', 'LASER'] },
            'Zero': { tipo: 'gato', brinquedos: ['RATO', 'BOLA'] },
            'Bola': { tipo: 'cão', brinquedos: ['CAIXA', 'NOVELO'] },
            'Bebe': { tipo: 'cão', brinquedos: ['LASER', 'RATO', 'BOLA'] },
            'Loco': { tipo: 'jabuti', brinquedos: ['SKATE', 'RATO'] }
        };

        this.brinquedosValidos = new Set(['RATO', 'BOLA', 'LASER', 'CAIXA', 'NOVELO', 'SKATE']);
    }

    validaAnimais(animais) {
        if (animais.length === 0)
            return 'Animal inválido';
        const nomesAnimaisDisponiveis = Object.keys(this.animaisDisponiveis);
        const animaisSet = new Set();

        for (const animal of animais) {
            if (!nomesAnimaisDisponiveis.includes(animal) || animaisSet.has(animal)) {
                return 'Animal inválido';
            }
            animaisSet.add(animal);
        }
        return null;
    }

    validaBrinquedos(brinquedos) {
        const brinquedosSet = new Set();
        for (const brinquedo of brinquedos) {
            if (!this.brinquedosValidos.has(brinquedo) || brinquedosSet.has(brinquedo)) {
                return 'Brinquedo inválido';
            }
            brinquedosSet.add(brinquedo);
        }
        return null;
    }

    estaApto(brinquedosPessoa, animal, adocoesPessoa) {
        const dadosAnimal = this.animaisDisponiveis[animal];

        if (dadosAnimal.tipo === 'gato' && adocoesPessoa.some(adocao => this.animaisDisponiveis[adocao].tipo === 'gato')) {
            return false;
        }

        if (animal === 'Loco') {
    return adocoesPessoa.length > 0 && dadosAnimal.brinquedos.every(b => brinquedosPessoa.includes(b));
}

        let indexBrinquedo = -1;
        for (const brinquedo of dadosAnimal.brinquedos) {
            const pos = brinquedosPessoa.indexOf(brinquedo, indexBrinquedo + 1);
            if (pos === -1) {
                return false;
            }
            indexBrinquedo = pos;
        }
        return true;
    }

    encontraPessoas(brinquedosPessoa1Str, brinquedosPessoa2Str, animaisStr) {
        const brinquedosPessoa1 = brinquedosPessoa1Str.split(',');
        const brinquedosPessoa2 = brinquedosPessoa2Str.split(',');
        const animais = animaisStr.split(',');

        const erroAnimais = this.validaAnimais(animais);
        if (erroAnimais) return { erro: erroAnimais };

        const erroBrinquedos1 = this.validaBrinquedos(brinquedosPessoa1);
        if (erroBrinquedos1) return { erro: erroBrinquedos1 };

        const erroBrinquedos2 = this.validaBrinquedos(brinquedosPessoa2);
        if (erroBrinquedos2) return { erro: erroBrinquedos2 };

        const adocoes = {
            pessoa1: [],
            pessoa2: []
        };
        const resultadoFinal = {};

       for (const animal of animais) {
    const aptoPessoa1 =
        adocoes.pessoa1.length < 3 &&
        this.estaApto(brinquedosPessoa1, animal, adocoes.pessoa1);

    const aptoPessoa2 =
        adocoes.pessoa2.length < 3 &&
        this.estaApto(brinquedosPessoa2, animal, adocoes.pessoa2);

    if (aptoPessoa1 && !aptoPessoa2) {
        adocoes.pessoa1.push(animal);
        resultadoFinal[animal] = 'pessoa 1';
    } else if (!aptoPessoa1 && aptoPessoa2) {
        adocoes.pessoa2.push(animal);
        resultadoFinal[animal] = 'pessoa 2';
    } else if (aptoPessoa1 && aptoPessoa2) {
        resultadoFinal[animal] = 'abrigo';
    } else {
        resultadoFinal[animal] = 'abrigo';
    }
}

        const listaFormatada = Object.keys(resultadoFinal)
            .sort()
            .map(animal => `${animal} - ${resultadoFinal[animal]}`);

        return { lista: listaFormatada };
    }
}

export { AbrigoAnimais as AbrigoAnimais };