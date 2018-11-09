function funcaoEnviar() {
    var cep = document.getElementById("Cep").value;
    var endereço = document.getElementById("ende").value;
    var localidade = document.getElementById("local").value;

    console.log("teste")
    if (cep == "") {
        alert("Insira o cep corretamente");
    };
    if (endereço == "") {
        alert("Insira o edereço correto");
    };
    if (localidade == "") {
        alert("Insira corretamente o local");
    };

};
