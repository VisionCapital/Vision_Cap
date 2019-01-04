<template>
	<div class="close-outer" @click="$emit('click')">
		<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" :stroke="fill">
			<path d="M1 1l28 28"/>
			<path d="M29 1L1 29"/>
		</svg>
	</div>
</template>

<script>

export default {
	props: {
		fill: {
			default: '#fff'
		}
	}
};

</script>

<style lang="stylus" scoped>

@import '../../styl/_variables';
@import '../../styl/_ease';

.close-outer {
	cursor: pointer;
	height 30px
	width 30px
	right 30px
	// height: unit(65);
	position: fixed;
	// right: unit(98);
	// top: unit(108);
	// width: unit(65);
	z-index: 2;

	@include below($tablet) {
		// height: mobile-unit(120);
		// right: mobile-unit(96);
		// top: mobile-unit(80);
		// width: mobile-unit(120);
		z-index: 3;
	}
}

svg {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
}

path {
	stroke-width: 2;
	stroke-dasharray: 40 40;

	.v-enter &,
	.v-leave-to & {
		stroke-dashoffset: 40;

		&:nth-child(2) {
			stroke-dashoffset: -40;
		}
	}

	.v-enter-to &,
	.v-leave & {
		stroke-dashoffset: 0;
	}

	.v-enter-active &,
	.v-leave-active & {
		transition: stroke-dashoffset 280ms $easeOutQuint;
	}

	.v-enter-active & {
		&:nth-child(1) {
			transition-delay: 750ms;
		}

		&:nth-child(2) {
			transition-delay: 600ms;
		}
	}

	.v-leave-active & {
		&:nth-child(1) {
			transition-delay: 50ms;
		}
	}
}

</style>
