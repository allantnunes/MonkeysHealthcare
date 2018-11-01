// leitura dos dados do Arduino
const SerialPort = require('serialport');
const Readline = SerialPort.parsers.Readline;

// Acesso ao banco de dados SQL Server
var Connection = require('tedious').Connection;
var Request = require('tedious').Request;
var TYPES = require('tedious').TYPES;

//require('events').EventEmitter.prototype._maxListeners = 100;
require('events').EventEmitter.defaultMaxListeners = 15;

var cfg = {
    "host": "monkeys-healthcare.database.windows.net", // server name do banco de dados
    "user": "bandtec", // login ("bandtec")
    "pass": "MonkeysBusiness02", // senha do banco de dados
    "db": "monkeys-healthcare" // nome da base de dados
};

var config = {
    server: cfg.host,
    userName: cfg.user,
    password: cfg.pass,
    options: {
        debug: {
            packet: true,
            data: true,
            payload: true,
            token: false,
            log: true
        },
        database: cfg.db,
        encrypt: true
    }
};

var connection = new Connection(config);

function registrarLeitura(temperatura, umidade, arduino) {
    return new Promise(function (resolve, reject) {
        
        // console.log(`t: ${temperatura}`);
        // console.log(`u: ${umidade}`);
        // console.log(`a: ${arduino}`);

        request = new Request("INSERT INTO coleta (temp, umi, Data, Hora, FK_arduino) VALUES(@temperatura ,@umidade,cast (DATEADD(HOUR, -3,CONVERT(smalldatetime, CURRENT_TIMESTAMP))as date),DATEADD(HOUR, -3, convert(varchar(5), getdate(), 108)),@arduino)", function (err, linhas) {

            if (err) {
                // console.log(`Erro ao tentar gravar no banco: ${err} `);
                reject();
            } else {
                // console.log(`Registro salvo com sucesso. Linhas afetadas: ${linhas}`);
                resolve(true);
            }
        });

        request.addParameter('temperatura', TYPES.Decimal, temperatura);
        request.addParameter('umidade', TYPES.Decimal, umidade);
        request.addParameter('arduino', TYPES.Numeric, arduino);

        connection.execSql(request);
    })
}
// conectar com o banco
    var temp = 24;
    var umi = 53;
connection.on('connect', function (err) {
    if (err)
    console.log("erro na conexão: " + err)
    else
    console.log("banco conectado!")
    // serial.SetConnection();
    
                    setInterval(() => {
                        
                        registrarLeitura(temp, umi, Number("1"))
                        .then((retorno) => {
                            return registrarLeitura((temp + Math.random() * 7), (umi - Math.random() * 4), Number(2))
                            
                        })
                        .then((retorno) => {
                            return registrarLeitura((temp - Math.random() * 7), (umi - Math.random() * 40), Number(3))
                            
                        })
                        .then((retorno) => {
                            return registrarLeitura((temp + Math.random() * 3), (umi - Math.random() * 9), Number(4))
                            
                        })
                        .then((retorno) => {
                            registrarLeitura((temp + Math.random() * 4), (umi - Math.random() * 5), Number(5))
                            
                        });

                    }, 120000);
 });

// Função identificar arduino

class ArduinoDataRead {

    constructor() {
        this.listData = [];
    }

    get List() {
        return this.listData;
    }

    SetConnection() {

        SerialPort.list().then(listSerialDevices => {

            let listArduinoSerial = listSerialDevices.filter(serialDevice => {
                return serialDevice.vendorId == 2341 && serialDevice.productId == 43;
            });

            if (listArduinoSerial.length != 1) {
                throw new Error("The Arduino was not connected or has many boards connceted");
            }

            console.log("Arduino found in the com %s", listArduinoSerial[0].comName);

            return listArduinoSerial[0].comName;

        }).then(arduinoCom => {

            let arduino = new SerialPort(arduinoCom, { baudRate: 9600 });

            const parser = new Readline();
            arduino.pipe(parser);

            parser.on('data', (valor) => {
                // this.listData.push(parseFloat(data.split(':')));
                this.listData.push(valor)
                var coleta = valor.split(':');
                var temp = coleta[0];
                var umi = coleta[1];
                const dia = "CONVERT(date, SYSDATETIME())";
                const hora = "CONVERT (time, SYSDATETIME())";
                //console.log(temp + " - " + umi);

                // registrarLeitura(temp, umi, Number("1"))
                //     .then((retorno) => {
                //         return registrarLeitura((temp + Math.random() * 7), (umi - Math.random() * 4), Number(2))
                        
                //     })
                //     .then((retorno) => {
                //         return registrarLeitura((temp - Math.random() * 7), (umi - Math.random() * 40), Number(3))
                        
                //     })
                //     .then((retorno) => {
                //         return registrarLeitura((temp + Math.random() * 3), (umi - Math.random() * 9), Number(4))
                        
                //     })
                //     .then((retorno) => {
                //         registrarLeitura((temp + Math.random() * 4), (umi - Math.random() * 5), Number(5))
                        
                //     });

            });

        }).catch(error => console.log(error));
    }
}

const serial = new ArduinoDataRead();

// serial.SetConnection();
module.exports.ArduinoData = { List: serial.List } 
