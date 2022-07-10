const Iota = require('@iota/core');
const Converter = require('@iota/converter');
const generate = require('iota-generate-seed');

    // creer une donnée simulant la température aléatoirement
    const Struct = (...keys) => ((...v) => keys.reduce((o, k, i) => { o[k] = v[i]; return o }, {}))
    const Item = Struct('id', 'name', 'value')
    var message = new Array();
    var messageInTrytes = new Array();
    message[4] = new Array();
    messageInTrytes[4]
    var myItems = [
        Item(1,"device1",20),
        Item(2, "device2", 52),
        Item(3, "device3", 44),
        Item(4, "device4", 1)
];
const myObj = [{ id: "device1", name: "device1", value: 10 },
                { id: "device2", name: "device2", value: 55 },
                { id: "device3", name: "device3", value: 78 },
                { id: "device4", name: "device4", value: 4 },
                { id: "device5", name: "device4", value: 89 },
                { id: "device3", name: "device6", value: 25 },
                { id: "device6", name: "device7", value: 30 }]

const iota = Iota.composeAPI({
    provider: 'http://192.168.0.20:14265'
});
const depth = 3;
const minimumWeightMagnitude = 14;
const seed = generate();

setInterval(function () {
   
   
    const address = 'HEQLOWORLDHELLOWORLDHELLOWORLDHELLOWORLDHELLOWORLDHELLOWORLDHELLOWORLDHELLOWOR99D';

    for (var i = 0; i < myObj.length; i++) {
        const m = JSON.stringify(myObj[i].id);
        console.log("***************** lOGIN DEVICE   *********************")
        console.log("Action: login, device : "+ m +" is logged")
        const message = Converter.asciiToTrytes(m)
            console.log("The tryt message is :  " + message + '\n')
        const transfers = [
            {
                value: 0,
                address: address, // Where the data is being sent
                message: message // The message converted into trytes
            }
        ]
        iota
            .prepareTransfers(seed, transfers)
            .then(trytes => iota.sendTrytes(trytes, 3, 14))
            .then(bundle => {
                console.log("************************************************************")
                console.log("Transfer successfully sent")
                console.log("************************************************************")
                bundle.map(tx => console.log(tx))
                console.log("************************************************************")
            })
            .catch(err => {
                console.log(err)
            })
            }
    }
    , 20000);




