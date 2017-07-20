import { DynamoDB, Config } from 'aws-sdk'

// AWS.config.update({
//   region: 'ap-northeast-1',
//   endpoint: 'http://localhost:8080'
// })
var testdocClient = null
exports.init = (params) => {
  testdocClient = new DynamoDB.DocumentClient({
    region: 'ap-northeast-1',
    accessKeyId: 'AKIAJX4PRNCNCQKTA5AA',
    secretAccessKey: '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'
    /*
    credentials: {
      sessionToken: params
    }
    */
  })
}

var dynamodb = new DynamoDB({
  region: 'ap-northeast-1',
  // endpoint: 'http://localhost:8080',
  accessKeyId: 'AKIAJX4PRNCNCQKTA5AA',
  secretAccessKey: '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'
})
var docClient = new DynamoDB.DocumentClient({
  region: 'ap-northeast-1',
  // endpoint: 'http://localhost:8080',
  accessKeyId: 'AKIAJX4PRNCNCQKTA5AA',
  secretAccessKey: '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'
})

exports.createTable = (params) => {
  Config.endpoint = 'http://localhost:8080'
  Config.region = 'ap-northeast-1'
  Config.accessKeyId = 'AKIAJX4PRNCNCQKTA5AA'
  Config.secretAccessKey = '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'
  dynamodb.createTable(params, globalCallback)
}

exports.createItem = (params) => {
  params.Item['uid'] = generateUUID()
  return new Promise((resolve, reject) => {
    docClient.put(params, (err, data) => {
      err ? reject(err) : resolve(data)
    })
  })
}

exports.readItem = (params) => {
  docClient.get(params, globalCallback)
}

exports.queryItem = (params) => {
  docClient.query(params, globalCallback)
}

exports.scanItems = (params) => {
  return new Promise((resolve, reject) => {
    testdocClient.scan(params, (err, data) => {
      err ? reject(err) : resolve(data)
    })
  })
}

let globalCallback = (err, data) => {
  if (err) {
    console.error('Error JSON:', JSON.stringify(err, null, 2))
  } else {
    console.log('success:', JSON.stringify(data, null, 2))
  }
}
let generateUUID = () => {
  var d = new Date().getTime()
  if (window.performance && typeof window.performance.now === 'function') {
    d += window.performance.now() // use high-precision timer if available
  }
  var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (d + Math.random() * 16) % 16 | 0
    d = Math.floor(d / 16)
    return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16)
  })
  return uuid
}
