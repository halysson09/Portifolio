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
                if (Array.from(primeiroNumero).pop() == ',') {
                    document.getElementById('visor').innerText = primeiroNumero.substring(0, primeiroNumero.length - 1) + valor;
                    document.getElementById('primeiroNumero').innerText = primeiroNumero.substring(0, primeiroNumero.length - 1);
                } else 
                    document.getElementById('visor').innerText += valor;

                document.getElementById('operador').innerText = valor;
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

document.addEventListener("keydown", function pressionarTecla(tecla) {
    if (event.defaultPrevented)
        return;// Do nothing if the event was already processed

    switch (tecla.key) {
        case 'Enter':
            document.querySelector("#btn-Igual").click();
            document.querySelector("#btn-Igual").style.backgroundColor = '#F2F9FB';
            break;
        case 'Escape':
            document.querySelector("#btn-C").click();
            document.querySelector("#btn-C").style.backgroundColor = '#F2F9FB';
            break;
        case 'Backspace':
            document.querySelector("#btn-Apagar").click();
            document.querySelector("#btn-Apagar").style.backgroundColor = '#F2F9FB';
            break;
        case '/':
            document.querySelector("#btn-Dividir").click();
            document.querySelector("#btn-Dividir").style.backgroundColor = '#F2F9FB';
            break;
        case '*':
            document.querySelector("#btn-Vezes").click();
            document.querySelector("#btn-Vezes").style.backgroundColor = '#F2F9FB';
            break;
        case '%':
            document.querySelector("#btn-Porcentagem").click();
            document.querySelector("#btn-Porcentagem").style.backgroundColor = '#F2F9FB';
            break;
        case '-':
            document.querySelector("#btn-Menos").click();
            document.querySelector("#btn-Menos").style.backgroundColor = '#F2F9FB';
            break;
        case '+':
            document.querySelector("#btn-Mais").click();
            document.querySelector("#btn-Mais").style.backgroundColor = '#F2F9FB';
            break;
        case ',':
            document.querySelector("#btn-Virgula").click();
            document.querySelector("#btn-Virgula").style.backgroundColor = '#F2F9FB';
            break;
        case '0':
            document.querySelector("#btn-0").click();
            document.querySelector("#btn-0").style.backgroundColor = '#F2F9FB';
            break;
        case '1':
            document.querySelector("#btn-1").click();
            document.querySelector("#btn-1").style.backgroundColor = '#F2F9FB';
            break;
        case '2':
            document.querySelector("#btn-2").click();
            document.querySelector("#btn-2").style.backgroundColor = '#F2F9FB';
            break;
        case '3':
            document.querySelector("#btn-3").click();
            document.querySelector("#btn-3").style.backgroundColor = '#F2F9FB';
            break;
        case '4':
            document.querySelector("#btn-4").click();
            document.querySelector("#btn-4").style.backgroundColor = '#F2F9FB';
            break;
        case '5':
            document.querySelector("#btn-5").click();
            document.querySelector("#btn-5").style.backgroundColor = '#F2F9FB';
            break;
        case '6':
            document.querySelector("#btn-6").click();
            document.querySelector("#btn-6").style.backgroundColor = '#F2F9FB';
            break;
        case '7':
            document.querySelector("#btn-7").click();
            document.querySelector("#btn-7").style.backgroundColor = '#F2F9FB';
            break;
        case '8':
            document.querySelector("#btn-8").click();
            document.querySelector("#btn-8").style.backgroundColor = '#F2F9FB';
            break;
        case '9':
            document.querySelector("#btn-9").click();
            document.querySelector("#btn-9").style.backgroundColor = '#F2F9FB';
            break;
        default:
            return;// Quit when this doesn't handle the key event.
    }

});
document.addEventListener("keyup", function pressionarTecla(tecla) {
    if (event.defaultPrevented)
        return;
    switch (tecla.key) {
        case 'Enter':
            document.querySelector("#btn-Igual").style.backgroundColor = '#98CFE4';
            break;
        case 'Escape':
            document.querySelector("#btn-C").style.backgroundColor = '#98CFE4';
            break;
        case 'Backspace':
            document.querySelector("#btn-Apagar").style.backgroundColor = '#98CFE4';
            break;
        case '/':
            document.querySelector("#btn-Dividir").style.backgroundColor = '#98CFE4';
            break;
        case '*':
            document.querySelector("#btn-Vezes").style.backgroundColor = '#98CFE4';
            break;
        case '%':
            document.querySelector("#btn-Porcentagem").style.backgroundColor = '#98CFE4';
            break;
        case '-':
            document.querySelector("#btn-Menos").style.backgroundColor = '#98CFE4';
            break;
        case '+':
            document.querySelector("#btn-Mais").style.backgroundColor = '#98CFE4';
            break;
        case ',':
            document.querySelector("#btn-Virgula").style.backgroundColor = '#98CFE4';
            break;
        case '0':
            document.querySelector("#btn-0").style.backgroundColor = '#98CFE4';
            break;
        case '1':
            document.querySelector("#btn-1").style.backgroundColor = '#98CFE4';
            break;
        case '2':
            document.querySelector("#btn-2").style.backgroundColor = '#98CFE4';
            break;
        case '3':
            document.querySelector("#btn-3").style.backgroundColor = '#98CFE4';
            break;
        case '4':
            document.querySelector("#btn-4").style.backgroundColor = '#98CFE4';
            break;
        case '5':
            document.querySelector("#btn-5").style.backgroundColor = '#98CFE4';
            break;
        case '6':
            document.querySelector("#btn-6").style.backgroundColor = '#98CFE4';
            break;
        case '7':
            document.querySelector("#btn-7").style.backgroundColor = '#98CFE4';
            break;
        case '8':
            document.querySelector("#btn-8").style.backgroundColor = '#98CFE4';
            break;
        case '9':
            document.querySelector("#btn-9").style.backgroundColor = '#98CFE4';
            break;
        default:
            return;
    }
});