import { S3, Config, CognitoIdentityCredentials } from 'aws-sdk'

var albumBucketName = 'wekin'
var bucketRegion = 'ap-northeast-2'
var IdentityPoolId = 'ap-northeast-1:fff9f7ff-1244-4790-9e50-a56c5b49aea2'

function addPhoto (albumName, files) {
  console.log(files)
  Config.region = bucketRegion
  Config.credentials = new CognitoIdentityCredentials({IdentityPoolId: IdentityPoolId})
  Config.accessKeyId = 'AKIAJX4PRNCNCQKTA5AA'
  Config.secretAccessKey = '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'
  // Config.update({
  //   region: bucketRegion,
  //   credentials: new CognitoIdentityCredentials({
  //     IdentityPoolId: IdentityPoolId
  //   })
  // })

  var s3 = new S3({
    apiVersion: '2006-03-01',
    params: {Bucket: albumBucketName}
  })

  // var files = document.getElementById('photoupload').files
  if (!files.length) {
    return window.alert('Please choose a file to upload first.')
  }
  var file = files[0]
  var fileName = file.name
  var albumPhotosKey = encodeURIComponent(albumName) + '//'

  var photoKey = albumPhotosKey + fileName
  s3.upload({
    Key: photoKey,
    Body: file,
    ACL: 'public-read'
  }, function (err, data) {
    if (err) {
      return window.alert(err)
    }
    window.alert('Successfully uploaded photo.')
  })
}

exports.addPhoto = addPhoto
