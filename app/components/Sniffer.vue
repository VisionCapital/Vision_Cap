<template>
	<div ref="canary"/>
</template>

<script>
export default {
	data() {
		let device = {
			platform: navigator.platform,
			// mobile: null,
			lerp: !/(Edge|Trident|Android|iOS|iPhone|iPod|iPad)/i.test(navigator.userAgent),
			// mobile: null,
			mobile: /(Android|iOS|iPhone|iPod|iPad)/i.test(navigator.userAgent),

			win: {
				x: window.innerWidth,
				y: window.innerHeight
			},
			portrait: window.innerWidth < window.innerHeight,
			mouse: null,
			touch: null
		};

		switch (navigator.platform) {
			case 'iPhone':
			case 'iPad':
			case 'linux armv7l':
			case 'Linux armv8l':
				device.touch = true;
				device.mobile = true;
				break;
			default:
				break;
		}

		return {
			device
		};
	},

	watch: {
		device: {
			handler(device) {
				this.$store.dispatch('updateDevice', device);
			},
			immediate: true,
			deep: true
		}
	},

	created() {
		window.addEventListener('touchstart', this.touchstart, { passive: true });
		// window.addEventListener('mousedown', this.mousestart, { passive: true });
		window.addEventListener('mousemove', this.mousestart, { passive: true });
		window.addEventListener('resize', this.resize, { passive: true });
		window.addEventListener('mousedown', this.mousestart, { passive: true });
	},

	mounted() {
		this.$nextTick(this.resize);
		// this.resize();
		setTimeout(this.resize, 1000);
	},

	beforeDestroy() {
		window.removeEventListener('touchstart', this.touchstart, { passive: true });
		// window.removeEventListener('mousedown', this.mousestart, { passive: true });
		window.removeEventListener('mousemove', this.mousestart, { passive: true });
		window.removeEventListener('resize', this.resize, { passive: true });
	},


	methods: {
		touchstart() {
			this.device.touch = true;
			window.removeEventListener('touchstart', this.touchstart, { passive: true });
			window.removeEventListener('mousedown', this.mousestart, { passive: true });
			window.removeEventListener('mousemove', this.mousestart, { passive: true });
		},

		mousestart() {
			this.device.mouse = true;
			window.removeEventListener('mousedown', this.mousestart, { passive: true });
			window.removeEventListener('mousemove', this.mousestart, { passive: true });
		},

		resize() {
			this.device.win = {
				x: window.innerWidth,
				y: window.innerHeight
			};
			this.device.portrait = window.innerWidth < window.innerHeight;
			this.isMobile();
		},

		isMobile() {
			let style = window.getComputedStyle(this.$refs.canary);
			this.device.mobile = style.display === 'block';
		}
	}

};
</script>

<style lang="stylus" scoped>

@import '../styl/_variables'

div
	display none
	pointer-events none
	position absolute

	// abs()
	// background: $b
	// position fixed
	// z-index 100

	+below($tablet)
		display block

</style>