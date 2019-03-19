/*
const lib = require('./lib');
const n = new lib.NFeProcessor();
//console.log(n.processarDocumento())


const x = require('xml4js');

// Most of xml2js options should still work
var options = {};

var fs = require('fs');
var util = require('util');
var parser = new x.Parser(options);

var schema = fs.readFileSync('./resources/PL_009_V4_2016_002_v160b/consStatServ_v4.00.xsd', {encoding: 'utf-8'});
parser.addSchema('http://www.portalfiscal.inf.br/nfe', schema, function (err, importsAndIncludes) {
    // importsAndIncludes contains schemas to be added as well to satisfy all imports and includes found in schema.xsd
    console.log(x.Builder)
    //console.log(err, util.inspect(importsAndIncludes, false, null));
});

*/
const fs = require('fs');

const lib = require('./lib');
const libFactory = require('./lib/factory');

const nfeProc = new lib.NFeProcessor();
const signUtils = new libFactory.Signature();
const XmlHelper = new libFactory.XmlHelper();

let xml = nfeProc.gerarXmlStatusServico('4.00', 2, 'RS');
//console.log('xml', xml);

//Test deserialize:
let obj = XmlHelper.deserializeXml(xml);
//console.log(obj)


let cert = {
    certPath: fs.readFileSync(''),
    keyPath: fs.readFileSync(''),
    pfx: fs.readFileSync(''),
    password: ''
};

//Test assinatura
//let xmlAssinado = signUtils.signXml(xml, 'consStatServ', cert.keyPath);
//console.log('Xml Assinado -->', xmlAssinado)

nfeProc.consultarStatusServico(xml, cert);
