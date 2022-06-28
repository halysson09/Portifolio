function calcular(operador, valor1, valor2, porcentagem) {
    if (operador == '/' && (valor1 == 0 || valor2 == 0)) {
        var resultado = 'Juvenil';
        return resultado;
    }
    if (porcentagem) {
        var resultado = (valor1 / 100) * valor2;
    } else {
        if (operador == '+')
            var resultado = valor1 + valor2;
        else {
            if (operador == '-')
                var resultado = valor1 - valor2;
            else {
                if (operador == '*') {
                    if (valor1.toString().substring(0, 2) == '0.' && valor2.toString().substring(0, 2) == '0.')
                        var resultado = (valor1 * valor2).toFixed(valor1.toString().length - 2 + valor2.toString().length - 2);
                    else
                        var resultado = (valor1 * valor2);
                } else
                    var resultado = (valor1 / valor2)/*.toPrecision(13)*/;
            }
        }
    }


    return resultado.toString().replace('.', ',');
}

function montarCalculo(valor, tipo) { // Função para montar o cálculo na tab calculadora.
    var visor = document.getElementById('visor').innerText;
    var primeiroNumero = document.getElementById('primeiroNumero').innerText;
    var segundoNumero = document.getElementById('segundoNumero').innerText;
    var operador = document.getElementById('operador').innerText;
    var resultadoCalcular = '';
    var total = document.getElementById('total').innerText;

    if (valor == 'C') {  // Limpa o visor e todos os campos escondidos.
        document.getElementById('visor').innerText = '0';
        document.getElementById('primeiroNumero').innerText = '';
        document.getElementById('segundoNumero').innerText = '';
        document.getElementById('operador').innerText = '';
        document.getElementById('total').innerText = '';
        return;
    }
    if (valor == '<-') {
        if (primeiroNumero == '')
            return;
        if (visor == 'Juvenil') {
            montarCalculo('C', 'operador');
            return;
        }
        if (operador == '') {
            if (primeiroNumero != '0' && primeiroNumero.length > 1) {
                document.getElementById('visor').innerText = visor.substring(0, visor.length - 1);
                document.getElementById('primeiroNumero').innerText = visor.substring(0, visor.length - 1);
            } else {
                document.getElementById('visor').innerText = '0';
                document.getElementById('primeiroNumero').innerText = '';
                document.getElementById('total').innerText = '';
            }
        } else {
            if (segundoNumero != '0' && segundoNumero.length > 1) {
                document.getElementById('visor').innerText = visor.substring(0, visor.length - 1);
                document.getElementById('segundoNumero').innerText = segundoNumero.substring(0, segundoNumero.length - 1);
            } else if (segundoNumero == '' && operador != '') {
                document.getElementById('visor').innerText = visor.substring(0, visor.length - 1);
                document.getElementById('operador').innerText = '';
            } else {
                document.getElementById('visor').innerText = primeiroNumero + operador;
                document.getElementById('segundoNumero').innerText = '';
            }
        }
        return;
    }
    if (primeiroNumero == '') { // Adiciona o primeiro número se não for 0.
        if (tipo == 'numero' && valor != '0' && valor != ',') {
            document.getElementById('primeiroNumero').innerText = valor;
            document.getElementById('visor').innerText = valor;
        } else if (valor == ',') {
            document.getElementById('primeiroNumero').innerText = '0' + valor;
            document.getElementById('visor').innerText = '0' + valor;
        } else if (valor != '=' && valor != '') {

            document.getElementById('primeiroNumero').innerText = '0';
            document.getElementById('operador').innerText = valor;
            document.getElementById('visor').innerText += valor;
        }
        return;
    }
    if (operador == '') { // Acrescenta outro número se o operador e o total estiver vazio.
        if (tipo == 'numero') {
            if (total == '') { // Se não é pra reiniciar ainda...
                if ((valor == ',' && primeiroNumero.indexOf(',') == -1) || valor != ',') { // ... e já tiver vírgula, não põe outra.
                    if (primeiroNumero.length >= 18)
                        return;
                    document.getElementById('primeiroNumero').innerText += valor;
                    document.getElementById('visor').innerText += valor;
                }
                return;
            } else { // Se pode reiniciar, substitui pelo novo número (reinicializando a conta).
                document.getElementById('total').innerText = '';
                if (valor == ',') {
                    document.getElementById('primeiroNumero').innerText = 0 + valor;
                    document.getElementById('visor').innerText = 0 + valor;
                } else {
                    document.getElementById('primeiroNumero').innerText = valor;
                    document.getElementById('visor').innerText = valor;
                }
                return;
            }
        } else { // Se for operador, acrescenta ele no visor.
            if (valor !== '=') {
                if (valor == '%') {
                    montarCalculo('C', 'operador');
                    return;
                }
                document.getElementById('operador').innerText = valor;
                document.getElementById('visor').innerText += valor;
                return;
            }
        }
    } else { // Se já tiver operador
        if (tipo == 'numero') {
            if ((segundoNumero == '' && valor != ',') || segundoNumero != '') {
                if (segundoNumero.length >= 18)
                    return;
                if (!(segundoNumero == '0' && valor == '0')) { // Não adiciona mais de 1 zero.
                    if (segundoNumero == '0' && valor != ',') { // Substitui o zero por outro número na primeira casa do segundoNumero.
                        document.getElementById('segundoNumero').innerText = valor;
                        document.getElementById('visor').innerText = valor;
                    } else {
                        if ((valor == ',' && segundoNumero.indexOf(',') == -1) || valor != ',') { // se já tiver vírgula, não põe outra ou põe números.
                            document.getElementById('segundoNumero').innerText += valor;
                            document.getElementById('visor').innerText += valor;
                        }
                    }
                }
            } else {
                // ... ou adiciona "0," na primeira casa.
                document.getElementById('segundoNumero').innerText += 0 + valor;
                document.getElementById('visor').innerText += 0 + valor;
            }
            return;
        }
        if (segundoNumero == '') { // Se já tiver operador e vier outro operador, substitui o mesmo.
            if (valor == '=') {
                resultadoCalcular = calcular(operador, parseFloat(primeiroNumero.replace(',', '.')), parseFloat(primeiroNumero.replace(',', '.')));
                document.getElementById('primeiroNumero').innerText = resultadoCalcular;
                document.getElementById('visor').innerText = resultadoCalcular;
                document.getElementById('operador').innerText = '';
                document.getElementById('total').innerText = resultadoCalcular;
            } else {
                document.getElementById('operador').innerText = valor;
                document.getElementById('visor').innerText = visor.substring(0, visor.length - 1) + valor;
            }
        } else { // Se já tiver o segundo número, mostra o resultado e limpa o segundo número.
            if (valor == '%') {
                resultadoCalcular = calcular(operador, parseFloat(primeiroNumero.replace(',', '.')), parseFloat(segundoNumero.replace(',', '.')), true);
                document.getElementById('segundoNumero').innerText = resultadoCalcular;
                document.getElementById('visor').innerText = primeiroNumero + operador + resultadoCalcular;
            }
            else {
                resultadoCalcular = calcular(operador, parseFloat(primeiroNumero.replace(',', '.')), parseFloat(segundoNumero.replace(',', '.')), false);
                document.getElementById('primeiroNumero').innerText = resultadoCalcular;
                document.getElementById('segundoNumero').innerText = '';
                if (valor == '=' || valor == '%') { // Se for o sinal de = , calcula a conta e limpa o operador.
                    document.getElementById('visor').innerText = resultadoCalcular;
                    document.getElementById('operador').innerText = '';
                    document.getElementById('total').innerText = resultadoCalcular;
                } else { // Se não, mostra o resultado + o novo operador.
                    document.getElementById('visor').innerText = resultadoCalcular + valor;
                    document.getElementById('operador').innerText = valor;
                }
            }


        }
    }
}