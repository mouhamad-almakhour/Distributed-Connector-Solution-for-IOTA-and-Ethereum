const sender = require('dgram');
const Iota = require('@iota/core');
const Extract = require('@iota/extract-json');
let zmq = require('zeromq');
let sock = zmq.socket('sub');
const txconverter = require('@iota/transaction-converter');
var http = require('http');
const fs = require('fs');
const Web3 = require('web3');
var web3 = new Web3();

//var Promise = require('promise');

//const txconverter = require('@iota/transaction-converter');
const converter = require('@iota/converter');
const console = require('console');
//const fs = require('fs');

var sc_ADDRESS = "0x4BcAc6cF676C2DD98A0F119f5bE01FA3b90D9ffC";
var sc_ABI = JSON.parse('[ { "inputs": [], "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [ { "indexed": false, "internalType": "string", "name": "id", "type": "string" } ], "name": "DataStored", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": false, "internalType": "string", "name": "id", "type": "string" } ], "name": "addDevice", "type": "event" }, { "inputs": [ { "internalType": "string", "name": "_id", "type": "string" } ], "name": "getData", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "anonymous": false, "inputs": [ { "indexed": false, "internalType": "string", "name": "id", "type": "string" }, { "indexed": false, "internalType": "uint256", "name": "timestamp", "type": "uint256" } ], "name": "login", "type": "event" }, { "inputs": [ { "internalType": "string", "name": "_id", "type": "string" } ], "name": "login_Device", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "string", "name": "_val", "type": "string" }, { "internalType": "string", "name": "_id", "type": "string" } ], "name": "storeData", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "device_counter", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "name": "DEVICES", "outputs": [ { "internalType": "string", "name": "id", "type": "string" } ], "stateMutability": "view", "type": "function" } ]');

var itte = 0;


sock.connect('tcp://192.168.0.20:5556')
sock.subscribe('tx_trytes');
console.log("Connector : Waiting Data from IOTA...");
console.log('....................................................');
const iota = Iota.composeAPI({
    provider: 'http://192.168.0.20:14265'
});


//http.createServer(function (req, res) {
sock.on('message', msg => {

   
    console.time("Time-Execution");
    const data = msg.toString().split(' ');

    const txobj = txconverter.asTransactionObject(data[1]);

    const writtable_data = JSON.stringify(txobj, null, 4);

    fs.writeFile("C:\GethNode01\Transactions.txt", writtable_data, (err) => {
        if (err) console.log(err);
    });

    const address = 'HEQLOWORLDHELLOWORLDHELLOWORLDHELLOWORLDHELLOWORLDHELLOWORLDHELLOWORLDHELLOWOR99D';
    var tailTransactionHash = txobj.hash;
   
    iota.getBundle(tailTransactionHash)
        .then(bundle => {
                    var message = JSON.parse(Extract.extractJson(bundle));
                    const data1 = JSON.stringify(message);
                    console.log("data received from IOTA: DEVICE NAME " + data1)
                    console.log('Send data to Smart Contract :')
                    adddevice(data1,"0","Active")
   
        })
                    console.timeEnd("Time-Execution");
                    itte++;
                    console.log("number of itteration: " + itte);
                    console.log('Connector : Data sent as a transaction To Smart Contract !');
                    console.log('....................................................');
    
    
});
  

//}).listen(8185);


const adddevice = async (id, val,stat) => {
    var web3 = new Web3();
    var sc_ADDRESS = "0xAA37e82030b021928fdad275d3eC79a599F4Cf8E";
    var sc_ABI = JSON.parse('[ { "inputs": [ { "internalType": "string", "name": "id", "type": "string" }, { "internalType": "string", "name": "val", "type": "string" }, { "internalType": "string", "name": "status", "type": "string" } ], "name": "add_device", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [ { "indexed": false, "internalType": "string", "name": "id", "type": "string" }, { "indexed": false, "internalType": "uint256", "name": "timestamp", "type": "uint256" }, { "indexed": false, "internalType": "string", "name": "status", "type": "string" } ], "name": "DataStored", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": false, "internalType": "string", "name": "id", "type": "string" }, { "indexed": false, "internalType": "uint256", "name": "timestamp", "type": "uint256" }, { "indexed": false, "internalType": "string", "name": "status", "type": "string" } ], "name": "addDevice", "type": "event" }, { "inputs": [ { "internalType": "string", "name": "_id", "type": "string" } ], "name": "getData", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "anonymous": false, "inputs": [ { "indexed": false, "internalType": "string", "name": "id", "type": "string" }, { "indexed": false, "internalType": "uint256", "name": "timestamp", "type": "uint256" }, { "indexed": false, "internalType": "string", "name": "status", "type": "string" } ], "name": "login", "type": "event" }, { "inputs": [ { "internalType": "string", "name": "_id", "type": "string" } ], "name": "login_Device", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "string", "name": "_id", "type": "string" }, { "internalType": "string", "name": "_val", "type": "string" } ], "name": "storeData", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "device_counter", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "name": "DEVICES", "outputs": [ { "internalType": "string", "name": "id", "type": "string" }, { "internalType": "string", "name": "value", "type": "string" }, { "internalType": "string", "name": "status", "type": "string" } ], "stateMutability": "view", "type": "function" } ]');
    web3 = new Web3("HTTP://127.0.0.1:8545")
    const ourSC = new web3.eth.Contract(sc_ABI, sc_ADDRESS)
    const accounts = await web3.eth.getAccounts();
    
    const receipt = await ourSC.methods
        .add_device(id, val, stat)
        .send({ from: accounts[0], gasLimit: '3000000' })
    console.log(" **************** AddDevice Event:*********************** ");

    // console.log(ourSC.events.addDevice().raw);

    ourSC.getPastEvents('addDevice', {
        // filter: { myIndexedParam: [20, 23] }, // Using an array means OR: e.g. 20 or 23
        fromBlock: 'latest',
        toBlock: 'latest'
    }, function (error, events) {
        console.log(events);

    })
        .then(function (events) {
            console.log(events) // same results as the optional callback above

        });
   /* var event = receipt.addDevice({}, {
        fromBlock: 'latest',
        toBlock: 'pending'
    },
        function (error, result) {
            if (!error)
                console.log(result.args);
        });*/

};
