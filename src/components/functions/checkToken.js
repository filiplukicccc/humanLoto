// export default function checkToken(token) {
// 	if (typeof window != 'undefined') {
// 		if (token.token != '') {
// 			return token
// 		} else if (window.localStorage.getItem('info')) {
// 			let token = JSON.parse(window.localStorage.getItem('info'))
// 			return token
// 		} else {
// 			return token
// 		}
// 	} else {
// 		return token
// 	}
// }



export default function checkToken(token) {
	if (token == undefined) {
		token = {}
	}
	if (window.localStorage.getItem('info')) {
		let token = JSON.parse(window.localStorage.getItem('info'))
		return token
	} else return token
}