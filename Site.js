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

function montarCalculo(valor, tipo) { // Fun��o para montar o c�lculo na tab calculadora.
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
    if (primeiroNumero == '') { // Adiciona o primeiro n�mero se n�o for 0.
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
    if (operador == '') { // Acrescenta outro n�mero se o operador e o total estiver vazio.
        if (tipo == 'numero') {
            if (total == '') { // Se n�o � pra reiniciar ainda...
                if ((valor == ',' && primeiroNumero.indexOf(',') == -1) || valor != ',') { // ... e j� tiver v�rgula, n�o p�e outra.
                    if (primeiroNumero.length >= 18)
                        return;
                    document.getElementById('primeiroNumero').innerText += valor;
                    document.getElementById('visor').innerText += valor;
                }
                return;
            } else { // Se pode reiniciar, substitui pelo novo n�mero (reinicializando a conta).
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
    } else { // Se j� tiver operador
        if (tipo == 'numero') {
            if ((segundoNumero == '' && valor != ',') || segundoNumero != '') {
                if (segundoNumero.length >= 18)
                    return;
                if (!(segundoNumero == '0' && valor == '0')) { // N�o adiciona mais de 1 zero.
                    if (segundoNumero == '0' && valor != ',') { // Substitui o zero por outro n�mero na primeira casa do segundoNumero.
                        document.getElementById('segundoNumero').innerText = valor;
                        document.getElementById('visor').innerText = valor;
                    } else {
                        if ((valor == ',' && segundoNumero.indexOf(',') == -1) || valor != ',') { // se j� tiver v�rgula, n�o p�e outra ou p�e n�meros.
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
        if (segundoNumero == '') { // Se j� tiver operador e vier outro operador, substitui o mesmo.
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
        } else { // Se j� tiver o segundo n�mero, mostra o resultado e limpa o segundo n�mero.
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
                } else { // Se n�o, mostra o resultado + o novo operador.
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
            document.querySelector("#btn-Igual").classList.add('btn-active');
            break;
        case 'Escape':
            document.querySelector("#btn-C").click();
            document.querySelector("#btn-C").classList.add('btn-active');
            break;
        case 'Backspace':
            document.querySelector("#btn-Apagar").click();
            document.querySelector("#btn-Apagar").classList.add('btn-active');
            break;
        case '/':
            document.querySelector("#btn-Dividir").click();
            document.querySelector("#btn-Dividir").classList.add('btn-active');
            break;
        case '*':
            document.querySelector("#btn-Vezes").click();
            document.querySelector("#btn-Vezes").classList.add('btn-active');
            break;
        case '%':
            document.querySelector("#btn-Porcentagem").click();
            document.querySelector("#btn-Porcentagem").classList.add('btn-active');
            break;
        case '-':
            document.querySelector("#btn-Menos").click();
            document.querySelector("#btn-Menos").classList.add('btn-active');
            break;
        case '+':
            document.querySelector("#btn-Mais").click();
            document.querySelector("#btn-Mais").classList.add('btn-active');
            break;
        case ',':
            document.querySelector("#btn-Virgula").click();
            document.querySelector("#btn-Virgula").classList.add('btn-active');
            break;
        case '0':
            document.querySelector("#btn-0").click();
            document.querySelector("#btn-0").classList.add('btn-active');
            break;
        case '1':
            document.querySelector("#btn-1").click();
            document.querySelector("#btn-1").classList.add('btn-active');
            break;
        case '2':
            document.querySelector("#btn-2").click();
            document.querySelector("#btn-2").classList.add('btn-active');
            break;
        case '3':
            document.querySelector("#btn-3").click();
            document.querySelector("#btn-3").classList.add('btn-active');
            break;
        case '4':
            document.querySelector("#btn-4").click();
            document.querySelector("#btn-4").classList.add('btn-active');
            break;
        case '5':
            document.querySelector("#btn-5").click();
            document.querySelector("#btn-5").classList.add('btn-active');
            break;
        case '6':
            document.querySelector("#btn-6").click();
            document.querySelector("#btn-6").classList.add('btn-active');
            break;
        case '7':
            document.querySelector("#btn-7").click();
            document.querySelector("#btn-7").classList.add('btn-active');
            break;
        case '8':
            document.querySelector("#btn-8").click();
            document.querySelector("#btn-8").classList.add('btn-active');
            break;
        case '9':
            document.querySelector("#btn-9").click();
            document.querySelector("#btn-9").classList.add('btn-active');
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
            document.querySelector("#btn-Igual").classList.remove('btn-active');
            break;
        case 'Escape':
            document.querySelector("#btn-C").classList.remove('btn-active');
            break;
        case 'Backspace':
            document.querySelector("#btn-Apagar").classList.remove('btn-active');
            break;
        case '/':
            document.querySelector("#btn-Dividir").classList.remove('btn-active');
            break;
        case '*':
            document.querySelector("#btn-Vezes").classList.remove('btn-active');
            break;
        case '%':
            document.querySelector("#btn-Porcentagem").classList.remove('btn-active');
            break;
        case '-':
            document.querySelector("#btn-Menos").classList.remove('btn-active');
            break;
        case '+':
            document.querySelector("#btn-Mais").classList.remove('btn-active');
            break;
        case ',':
            document.querySelector("#btn-Virgula").classList.remove('btn-active');
            break;
        case '0':
            document.querySelector("#btn-0").classList.remove('btn-active');
            break;
        case '1':
            document.querySelector("#btn-1").classList.remove('btn-active');
            break;
        case '2':
            document.querySelector("#btn-2").classList.remove('btn-active');
            break;
        case '3':
            document.querySelector("#btn-3").classList.remove('btn-active');
            break;
        case '4':
            document.querySelector("#btn-4").classList.remove('btn-active');
            break;
        case '5':
            document.querySelector("#btn-5").classList.remove('btn-active');
            break;
        case '6':
            document.querySelector("#btn-6").classList.remove('btn-active');
            break;
        case '7':
            document.querySelector("#btn-7").classList.remove('btn-active');
            break;
        case '8':
            document.querySelector("#btn-8").classList.remove('btn-active');
            break;
        case '9':
            document.querySelector("#btn-9").classList.remove('btn-active');
            break;
        default:
            return;
    }
});
function validaCamposFormulario(nome, genero, steam, origin) {
    if (nome == '' || genero == '' || steam == '' || origin == '') {
        alert('Macaco');
        return false;
    }
    //var padraoData = /^[0-9]{2}/[0-9]{2}/[0-9]{4}$/;
    //if (!padraoData.test(cadastro)) {
    //    alert("Digite a data no formato dd/mm/aaaa");
    //    return false;
    //}
    return true;
}
function proximoRegistro() {
    var proximoId = 0;
    var registrosId = document.getElementsByClassName('registros');

    for (let i = 0; i < registrosId.length; i++) {
        if (proximoId < parseInt(registrosId[i].id))
            proximoId = parseInt(registrosId[i].id);
    }
    return (proximoId + 1).toString();
}