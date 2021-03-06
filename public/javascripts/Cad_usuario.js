$(document).ready(function () {
    $('#telefone').mask('(00)00000-0000')
    $('#').mask('00/00/0000')
})


function validar() {
    var nome = formuser.nome.value;
    var email = formuser.email.value;
    var usuario = formuser.usuario.value;
    var senha = formuser.senha.value;
    var senha1 = formuser.senha1.value;

    if (nome == "") {
        alert('Preencha o campo nome!');
        formuser.nome.focus();
        return false;
    }

    if (email == "" || email.indexOf('@') == -1) {
        alert('Preencha o campo E-mail!');
        formuser.email.focus();
        return false;
    }



    if (usuario == "" || usuario.length < 5) {
        alert('preencha com letras e numeros, minimo 5 caracteres!');
        formuser.usuario.focus();
        return false;
    }

    if (senha == "" || senha.length <= 5) {
        alert('Preencha o campo senha com minimo 6 caracteres!');
        formuser.senha.focus();
        return false;
    }

    if (senha != senha1) {
        alert('As senhas divergem, Preencha corretamente!');
        formuser.senha.focus();
        return false;
    }

    if (senha == senha1) {
        alert('Parabéns, cadastro concluido!');
        formuser.senha.senha1.focus();
        return false;
    }
}
function limpa_formulário_cep() {
    //Limpa valores do formulário de cep.
    document.getElementById('rua').value = ("");
    document.getElementById('bairro').value = ("");
    document.getElementById('cidade').value = ("");
    document.getElementById('uf').value = ("");

}

function meu_callback(conteudo) {
    if (!("erro" in conteudo)) {
        //Atualiza os campos com os valores.
        document.getElementById('rua').value = (conteudo.logradouro);
        document.getElementById('bairro').value = (conteudo.bairro);
        document.getElementById('cidade').value = (conteudo.localidade);
        document.getElementById('uf').value = (conteudo.uf);

    } //end if.
    else {
        //CEP não Encontrado.
        limpa_formulário_cep();
        alert("CEP não encontrado.");
    }
}

function pesquisacep(valor) {

    //Nova variável "cep" somente com dígitos.
    var cep = valor.replace(/\D/g, '');

    //Verifica se campo cep possui valor informado.
    if (cep != "") {

        //Expressão regular para validar o CEP.
        var validacep = /^[0-9]{8}$/;

        //Valida o formato do CEP.
        if (validacep.test(cep)) {

            //Preenche os campos com "..." enquanto consulta webservice.
            document.getElementById('rua').value = "...";
            document.getElementById('bairro').value = "...";
            document.getElementById('cidade').value = "...";
            document.getElementById('uf').value = "...";


            //Cria um elemento javascript.
            var script = document.createElement('script');

            //Sincroniza com o callback.
            script.src = 'https://viacep.com.br/ws/' + cep + '/json/?callback=meu_callback';

            //Insere script no documento e carrega o conteúdo.
            document.body.appendChild(script);

        } //end if.
        else {
            //cep é inválido.
            limpa_formulário_cep();
            alert("Formato de CEP inválido.");
        }
    } //end if.
    else {
        //cep sem valor, limpa formulário.
        limpa_formulário_cep();
    }
};
function verificarCPF(c) {
    var i;
    s = c;
    var c = s.substr(0, 9);
    var dv = s.substr(9, 2);
    var d1 = 0;
    var v = false;

    for (i = 0; i < 9; i++) {
        d1 += c.charAt(i) * (10 - i);
    }
    if (d1 == 0) {
        alert("CPF Inválido")
        v = true;
        return false;
    }
    d1 = 11 - (d1 % 11);
    if (d1 > 9) d1 = 0;
    if (dv.charAt(0) != d1) {
        alert("CPF Inválido")
        v = true;
        return false;
    }

    d1 *= 2;
    for (i = 0; i < 9; i++) {
        d1 += c.charAt(i) * (11 - i);
    }
    d1 = 11 - (d1 % 11);
    if (d1 > 9) d1 = 0;
    if (dv.charAt(1) != d1) {
        alert("CPF Inválido")
        v = true;
        return false;
    }
    if (!v) {
        alert("CPF Válido")
    }
}

function popLocalidade() {
    var httplocalidade = new XMLHttpRequest();
    httplocalidade.open('GET', 'http://localhost:3000/banco/localidade', false);
    httplocalidade.send(null);

    var objlocalidade = JSON.parse(httplocalidade.responseText);
    console.log(objlocalidade);

    var arrayLoc = [];
    var arrayId_Loc = [];

    var localidades = document.getElementById("localidadesUsuario");

    for (var i = 0; i < objlocalidade.length; i++) {

        arrayLoc[i] = objlocalidade[i].nm_lab;
        arrayId_Loc[i] = objlocalidade[i].id_loc;

        var loc = document.createElement("option");
        var optloc = arrayLoc[i]
        var optlocid = arrayId_Loc[i]
        loc.textContent = optloc;
        loc.value = optlocid;

        localidades.appendChild(loc);
    }

}

