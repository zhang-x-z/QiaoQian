// 定义module分开管理states
export default {
	state: {
		name: 'YUKI',
		age: 26
	},
	getters: {
		test1(state) {
			return state.age;
		},
		test2(state, getters, rootState) {
			return getters.test1 + state.name + rootState.counter;
		}
	}
};