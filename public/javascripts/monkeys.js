//Executar ao iniciar o arquivo
$(document).ready(function () {
    incluirResources();
})

//Inclusão de cabeçalho via jquery
function incluirResources() {

    $.get("cabecalho.html", function (data, status) {
        $('#topo').html(data);
    });

}