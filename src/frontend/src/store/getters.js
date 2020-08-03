export default {
		powerCounter(state) {
			return state.counter * state.counter;
    },
    

		// complexUse(state, getters) {
		// 	return function(nums) {
		// 		return state.counter + getters.powerCounter + nums;
		// 	};
		// }
		complexUse(state, getters) {
			return nums => state.counter + getters.powerCounter + nums;
		}
};
