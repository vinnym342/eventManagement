import api from './init'

const appId = 'ae1ef20d281d4f008fc885a3e51b923f'
let handleErrors
export function init(handleError) {
    handleErrors = handleError
}

export function signIn({ email, password }) {
  console.log('asd')
    return api.post(`/auth`, {
		"email": email,
		"password": password
})
  .then(res => {
    console.log("res",res)
    return res.data
  })
  .catch(error => {
    console.log("res",error)
    throw Error(error.response.data.error)})
}

export function register({ email, password }) {
    return api.post(`/auth/register`, {
	"userData": {
		"email": email,
		"password": password
	}
})
  .then(res => res.data)
  .catch(error => {
    throw Error(error.response.data.error)})
}
// export function register({ email, password }) {
//     return api.post('/auth/register', {
//         email,
//         password
//     }).then(res => res.data)
// }
