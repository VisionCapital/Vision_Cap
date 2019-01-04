<template>
	<div class="team-card-slice">
		<div class="wrap">

			<div class="img-wrap">
				<img ref="img" class="profile-pic" :src="image[0].url" v-if="image">
			</div>

			<div class="content" :class="{'collapsed': collapsed}">

				<!-- <img v-if="$store.state.device.mobile && image" class="profile-pic" :src="image[0].url"> -->

				<h2 class="name" v-if="heading"
					v-html="heading"/>

				<h4 class="position" 
					v-if="subheading"
					v-html="subheading"/>

				<div class="copy-container" :class="{'full-copy': !collapsed}" ref="copyContainer">
					<p ref="copy" v-html="copy" > 
					</p>
				</div>

				<!-- <div class="copy-container" :class="{'full-copy': collapsed}" ref="copyContainer">
					<p ref="copy"> 
						{{copy}}
					</p>
				</div> -->

				<div @click="toggleText()" v-if="!shortText" class="copy-cta">
					<p v-if="collapsed">read more</p>
					<p v-else>collapse</p>
				</div>
				<!-- <core-button label="Read More"></core-button> -->

			</div>

		</div>
	</div>
</template>

<script>

import airprops from '../../mixins/airprops';

export default {
	mixins: [ airprops ],
	data() {
		return {
			shortText: true,
			collapsed: true
		};
	},
	methods: {
		toggleText() {
			this.collapsed = !this.collapsed;
		}

	},
	mounted() {
		console.log(this.$refs);
		if (this.$refs.img.offsetHeight < this.$refs.copy.offsetHeight) {
			this.shortText = false;
		}
	}
};

</script>

<style lang="stylus" scoped>

@import "../../styl/_variables"

.team-card-slice
	@extend .slice
	// padding 1px 0
	+above($tablet)
		// margin 0 (100% / 8)
		// width (600% / 8)

	.wrap
		margin-top (100% / 8)
		margin-bottom (100% / 8)
		position relative
		+above($tablet)
			display flex

p
	max-width 100%

/deep/ h4
	margin-bottom 0
	+below($tablet)
		fs(20)

.img-wrap	
	margin-right 6em
	
img
	width 220px
	max-width 100vw
	+below($tablet)
		margin-right 1em
		width 96px
		float left

.content.collapsed
	overflow hidden

.copy-cta
	color $blue
	overflow hidden

.copy-container
	max-height 200px
	overflow hidden
	// text-overflow ellipsis 
	transition max-height 1s
	word-wrap break-word
	+below($tablet)
		max-height 80px
	&.full-copy
		overflow visible
		max-height 100%

/deep/ h2
	margin-top 0
	@extend .heading
	+below($tablet)
		fs(30)

	+above($tablet)
		// width (500% / 8)

</style>
