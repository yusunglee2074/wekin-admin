import { Config, CognitoIdentityCredentials, CognitoIdentity } from 'aws-sdk'
import { CognitoUser, CognitoUserPool, CognitoUserAttribute, AuthenticationDetails } from 'amazon-cognito-identity-js'

const REGION = 'ap-northeast-1'
const IDENTITY_POOL_ID = 'ap-northeast-1:597b2387-a9e1-45c8-9ce1-5af7b371ceb3'    // WekinDevelop
const USER_POOL_ID = 'ap-northeast-1_5UaAz5LrW'   // WekinDevelop
const CLIENT_ID = 'p07s6ucodfjng4o7kvdu3h4da'

Config.region = REGION
Config.credentials = new CognitoIdentityCredentials({
  IdentityPoolId: IDENTITY_POOL_ID
})
const poolData = {
  UserPoolId: USER_POOL_ID,
  ClientId: CLIENT_ID
}
const userPool = new CognitoUserPool(poolData)

const getCognitoIdentifyCredentials = (session) => {
  return new CognitoIdentityCredentials({
    IdentityPoolId: IDENTITY_POOL_ID,
    Logins: {
      'cognito-idp.ap-northeast-1.amazonaws.com/ap-northeast-1_5UaAz5LrW': session.getIdToken().getJwtToken()
    },
    RoleArn: 'arn:aws:iam::864235215043:role/wekin_dev_database'
  })
}
export default {
  test () {
    console.log('test in cognito')
    var cognitoidentity = new CognitoIdentity()
    cognitoidentity.createIdentityPool('params', function (err, data) {
      if (err) console.log(err, err.stack) // an error occurred
      else console.log(data)           // successful response
    })
  },
  cognitoAttribute (name, value) {
    return new CognitoUserAttribute({
      Name: name,
      Value: value
    })
  },
  signOut () {
    const cognitoUser = userPool.getCurrentUser()
    cognitoUser.signOut()
  },
  signUp (userName, userPassword, attributeList) {
    userPool.signUp(userName, userPassword, attributeList, null, (err, result) => {
      if (err) {
        window.alert(err)
        return
      }
      // const cognitoUser = result.user
      // TODO: 가입 후 동작 코드 ...
    })
  },
  signIn (userName, userPassword) {
    const authenticationDetails = new AuthenticationDetails({
      Username: userName,
      Password: userPassword
    })
    const cognitoUser = new CognitoUser({
      Username: userName,
      Pool: userPool
    })
    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: (session) => {
        console.log('access token + ' + session.getAccessToken().getJwtToken())
        Config.credentials = getCognitoIdentifyCredentials(session)
        // TODO: 로그인 후 동작 코드 ..
      },
      onFailure: (err) => {
        if (err) {
          // TODO: 로그인 실패 동작 코드 ..
        }
      }
    })
  },
  getCurrentUser () {
    const cognitoUser = userPool.getCurrentUser()

    return new Promise((resolve, reject) => {
      if (cognitoUser != null) {
        cognitoUser.getSession((err, session) => {
          if (err) {
            reject(false)
          }
          Config.credentials = getCognitoIdentifyCredentials(session)
          cognitoUser.getUserAttributes((err, attributes) => {
            if (err) {
              reject(false)
            } else {
              resolve({session, attributes})
            }
          })
        })
      }
    })
  }
}
