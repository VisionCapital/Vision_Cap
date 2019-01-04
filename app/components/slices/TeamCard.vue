<template>
	<div class="team-cards">

		<div class="wrap" v-if="data.items.length">

			<div class="card" v-for="card in data.items">

				<div class="img-wrap">
					<img class="profile-pic" :src="card.profile_image.url" v-if="card.profile_image.url">
				</div>

				<!-- <div class="guy"></div> -->

				<div class="content">

					<div class="copy-container" :class="{'full-copy': copyFull}" ref="copyContainer"
						v-html="data.htmlField(card.profile_copy)">
					</div>

					<div @click="toggleText()" v-if="!shortText" class="copy-cta">
						<p v-if="copyFull === false">read more</p>
						<p v-else>collapse</p>
					</div>

				</div>

			</div>

		</div>

		<div class="wrap" v-else>

			<div class="img-wrap">
				<img class="profile-pic" :src="image[0].url" v-if="image">
			</div>

			<div class="guy"></div>
			<div class="content">

				<div class="name">
					<h2 v-if="heading"
						v-html="heading"/>
				</div>

				<h4 class="position"
					v-if="subheading"
					v-html="subheading"/>

				<div class="copy-container" :class="{'full-copy': copyFull}" ref="copyContainer">
					<p ref="copy" v-if="copy"
						v-html="copy"/>
				</div>

				<div @click="toggleText()" v-if="!shortText" class="copy-cta">
					<p v-if="copyFull === false">read more</p>
					<p v-else>collapse</p>
				</div>

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
			copyFull: false
		};
	},
	methods: {
		toggleText() {
			this.copyFull = !this.copyFull;
		}

	},
	mounted() {
		if (this.$refs.copy && this.$refs.copyContainer.offsetHeight < this.$refs.copy.offsetHeight) {
			this.shortText = false;
		}
	}
};

</script>

<style lang="stylus" scoped>

@import "../../styl/_variables"

.team-cards
	@extend .slice

	.wrap
		margin (100% / 8) auto
		position relative

	.card
		display flex
		justify-content space-between
		pad(2,0)

		&:nth-child(even)
			background $bg

img
	width 20vw

.content
	width 60%
	display inline-block

.copy-cta
	color $blue

.copy-container
	max-height 200px
	overflow hidden
	text-overflow ellipsis
	transition max-height 1s

	&.full-copy
		max-height 100%

.guy
	height 100%
	width 90px


.name
	/deep/
		h2, h3
			margin-top 0
			@extend .heading

</style>
