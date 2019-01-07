<template>
	<div class="cube-logo">
		<div class="cube-logo-inner">
			<div></div>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
		</div>
	</div>
</template>

<script>

// All properties of this object are optional

export default {
	props: [],
	components: {},
	computed: {},
	data() {
		return {
			name: 'CubeLogo',
			rot: 0
		};
	},
	methods: {
		update() {
			this.rot++;
			requestAnimationFrame(this.update);
		}
	},
	created() {},
	mounted() {

		// requestAnimationFrame(this.update);
	},
	beforeDestroy() {}
};

</script>

<style lang="scss" scoped>

.cube-logo {
	perspective: 2000px;
	transform-style: preserve-3d;
	transform-origin: 50% 50% 50%;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
}

.cube-logo-inner {
	transform-style: preserve-3d;
	transform-origin: 50% 50% 50%;
	width: 200px;
	height: 200px;

	position: absolute;
	top: 50%;
	left: 50%;

	transform: rotateY(-40deg) rotateZ(45deg);

	>div {
		position: absolute;
		top: 0;
		left: 0;
		width: 200px;
		height: 200px;
		backface-visibility: hidden;
		transform-origin: 50% 50% 50%;
		// mix-blend-mode: overlay;

		&:nth-child(1) {
			transform: translate3d(0, 0, -200px);
			background-color: rgba(#006CFF, 1);
		}

		&:nth-child(2) {
			transform: translate3d(0, -100px, -100px) rotateX(90deg);
			background-color: rgba(#00D7FF, 0.5);
		}

		&:nth-child(3) {
			transform: translate3d(0, 100px, -100px) rotateX(90deg);
			background-color: rgba(#0000BF, 0.5);
		}

		&:nth-child(4) {
			transform: translate3d(-100px, 0, -100px) rotateY(90deg);
			background-color: rgba(0, 0, 255, 0.5);
		}

		&:nth-child(5) {
			transform: translate3d(100px, 0, -100px) rotateY(90deg);
			background-color: rgba(#003EA6, 0.5);
		}
	}
}

</style>
