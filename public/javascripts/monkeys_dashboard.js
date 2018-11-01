//Executar ao iniciar o arquivo
$(document).ready(function () {

    //Função de troca dos LABS ao mudar LOCALIDADE
    $('#localidades').change(function () {

        selecionado = parseInt($('#localidades option:selected').val());

        var httpLab = new XMLHttpRequest();
        httpLab.open("GET", 'http://localhost:3000/banco/lab/' + selecionado, false);
        httpLab.send(null);

        var objLab = JSON.parse(httpLab.responseText);

        var arrayLab = [];
        var arrayLabId = [];

        var labs = document.getElementById("labs");
        labs.textContent = "";

        for (var i = 0; i < objLab.length; i++) {
            arrayLab[i] = objLab[i].desc_loc;
            arrayLabId[i] = objLab[i].id_loclab;

            if (i == 0) {
                var labPadrao = document.createElement("option");
                labPadrao.textContent = "Selecione um Laboratório"
                labPadrao.value = null;
                labPadrao.disabled = true;
                labPadrao.selected = true;

                labs.appendChild(labPadrao);
            }

            var lab = document.createElement("option");
            var optLab = arrayLab[i]
            var optLabId = arrayLabId[i]
            lab.textContent = optLab;
            lab.value = optLabId;

            labs.appendChild(lab);
        }

    })

    //Função de alterar Chart quando mudar o Lab
    $('#labs').change(function () {

        var labSelecionado = parseInt($('#labs option:selected').val());
        var httpSensor = new XMLHttpRequest();
        httpSensor.open('GET', 'http://localhost:3000/banco/arduinoNome/' + labSelecionado, false);
        httpSensor.send(null);
        var objSensor = JSON.parse(httpSensor.responseText);
        document.getElementById('nomeArduino').innerHTML = objSensor[0].nm_arduino;

        atualizaChartComParametro(labSelecionado);

    })
});

function atualizaChartComParametro(laboratorio) {

    if(isNaN(laboratorio)){
        return;
    }

    var httpTemp = new XMLHttpRequest();
    httpTemp.open('GET', 'http://localhost:3000/banco/arduinoTemp/' + laboratorio, false);
    httpTemp.send(null);

    var objTemp = JSON.parse(httpTemp.responseText);
    objTemp = objTemp.reverse();

    var httpUmi = new XMLHttpRequest();
    httpUmi.open('GET', 'http://localhost:3000/banco/arduinoUmi/' + laboratorio, false);
    httpUmi.send(null);

    var objUmi = JSON.parse(httpUmi.responseText);
    objUmi = objUmi.reverse();

    var httpTime = new XMLHttpRequest();
    httpTime.open('GET', 'http://localhost:3000/banco/arduinoTime/' + laboratorio, false);
    httpTime.send(null);

    var objTime = JSON.parse(httpTime.responseText);
    objTime = objTime.reverse();

    var arrayTemp = [];
    var arrayUmi = [];
    var arrayTime = [];

    for (var i = 0; i < objTemp.length; i++) {

        arrayTemp[i] = objTemp[i].temp;
        arrayUmi[i] = objUmi[i].umi;
        arrayTime[i] = objTime[i].time;

    }

    chartTemp.data.datasets[0].data = arrayTemp;
    chartUmi.data.datasets[0].data = arrayUmi;
    chartTemp.data.labels = arrayTime;
    chartUmi.data.labels = arrayTime;
    chartTemp.update();
    chartUmi.update();

    // ANALYTICS TEMPERATURA
    var maxTemp = -999;
    var minTemp = 999;
    var somaTemp = 0;
    for (var i = 0; i < arrayTemp.length; i++) {
        somaTemp += parseInt(arrayTemp[i]);
        if (arrayTemp[i] > maxTemp) {
            maxTemp = arrayTemp[i];
        }
        if (arrayTemp[i] < minTemp) {
            minTemp = arrayTemp[i];
        }
    }
    var mediaTemp = somaTemp / parseInt(arrayTemp.length);
    document.getElementById('mediaTemp').innerHTML = parseFloat(mediaTemp.toFixed(1)) + "<b> ºC</b>";
    if (minTemp != 999) {
        document.getElementById('minTemp').innerHTML = parseFloat(minTemp.toFixed(1)) + "<b> ºC</b>";
    }
    if (maxTemp != -999) {
        document.getElementById('maxTemp').innerHTML = parseFloat(maxTemp.toFixed(1)) + "<b> ºC</b>";
    }

    // ANALYTICS UMIDADE
    var maxUmi = -999;
    var minUmi = 999;
    var somaUmi = 0;
    for (var i = 0; i < arrayUmi.length; i++) {
        somaUmi += parseInt(arrayUmi[i]);
        if (arrayUmi[i] > maxUmi) {
            maxUmi = arrayUmi[i];
        }
        if (arrayUmi[i] < minUmi) {
            minUmi = arrayUmi[i];
        }
    }
    var mediaUmi = somaUmi / parseInt(arrayUmi.length);
    document.getElementById('mediaUmi').innerHTML = parseFloat(mediaUmi.toFixed(1)) + "<b> %</b>";
    if (minUmi != 999) {
        document.getElementById('minUmi').innerHTML = parseFloat(minUmi.toFixed(1)) + "<b> %</b>";
    }
    if (maxUmi != -999) {
        document.getElementById('maxUmi').innerHTML = parseFloat(maxUmi.toFixed(1)) + "<b> %</b>";
    }

    if (arrayTemp[arrayTemp.length - 1] != undefined) {
        document.getElementById('tempDashboard').innerHTML = arrayTemp[arrayTemp.length - 1] + 'ºC'
    }
    if (arrayUmi[arrayTemp.length - 1] != undefined) {
        document.getElementById('umiDashboard').innerHTML = arrayUmi[arrayUmi.length - 1] + '%'
    }
}

//Criação Char TEMPERATURA
var ctxTemp = document.getElementById('chartTemp').getContext('2d');
var cfgChartTemp =
{
    type: 'line',
    data: {
        datasets: [{
            label: "Temperatura",
            borderColor: 'rgb(255, 0, 0)'
        }]
    },
    options: {
        animation: {
            duration: 0
        },
        scales: {
            yAxes: [{
                display: true,
                scaleLabel: {
                    display: true,
                    labelString: 'Graus Celsius'
                },
                ticks: {
                    beginAtZero: true,
                    steps: 5,
                    stepValue: 5,
                    max: 40
                }
            }]
        }
    }
};
var chartTemp = new Chart(ctxTemp, cfgChartTemp);

//Criação Chart UMIDADE
var ctxUmi = document.getElementById('chartUmi').getContext('2d');
var cfgChartUmi =
{
    type: 'line',
    data: {
        datasets: [{
            label: "Umidade",
            borderColor: 'rgb(0, 0, 255)'
        }]
    },
    options: {
        animation: {
            duration: 0
        },
        scales: {
            yAxes: [{
                display: true,
                scaleLabel: {
                    display: true,
                    labelString: 'Porcentagem'
                },
                ticks: {
                    beginAtZero: true,
                    steps: 10,
                    stepValue: 5,
                    max: 100
                }
            }]
        }
    }
};
var chartUmi = new Chart(ctxUmi, cfgChartUmi);

function popSelects() {
    var httplocalidade = new XMLHttpRequest();
    httplocalidade.open('GET', 'http://localhost:3000/banco/localidade', false);
    httplocalidade.send(null);

    var objlocalidade = JSON.parse(httplocalidade.responseText);

    var arrayLoc = [];
    var arrayId_Loc = [];

    var localidades = document.getElementById("localidades");

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

setInterval(() => {
    atualizaChartComParametro(parseInt($('#labs option:selected').val()));
}, 5000);