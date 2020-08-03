export default {
	// 异步操作
	updateInfo (context, payload) {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				context.commit('alertLog')
				// console.log(payload), resolve('返回数据')
			}, 1000)
		})
	}
}