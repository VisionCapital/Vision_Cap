<template>
	<canvas></canvas>
</template>

<script>

// All properties of this object are optional

export default {
	props: [],
	components: {},
	computed: {},
	data() {

		return {
			name: 'HeroBackground',
			running: false,
			w: 0,
			h: 0
		};

	},
	methods: {
		render() {

			this.context.fillStyle = '#ff0000';
			this.context.fillRect(this.w / 2 - 50, this.h / 2 - 50, 100, 100);

			if (this.running) {
				requestAnimationFrame(this.render);
			}

		},
		resize() {

			this.w = this.$el.offsetWidth;
			this.h = this.$el.offsetHeight;
			this.$el.width = this.w;
			this.$el.height = this.h;

		},
		pause() {

			this.running = false;

		},
		start() {

			this.running = true;
			requestAnimationFrame(this.render);

		}
	},
	created() {},
	mounted() {

		this.context = this.$el.getContext('2d');
		this.resize();
		this.start();
		window.addEventListener('resize', this.resize);

	},
	beforeDestroy() {

		this.pause();
		window.removeEventListener('resize', this.resize);

	}
};

</script>

<style lang="sass" scoped>

canvas {
	position: absolute;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
}

</style>
