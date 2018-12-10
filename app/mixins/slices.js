export default {
	methods: {
		moduleComponent(componentName) {
			for (let component in this.$options.components) {
				if (componentName === component) {
					return componentName;
				}
			}
			return 'NoSlice';
		}
	}
};
