<template>
	<div class="team-member">

      <div class="img-wrap">
        <img class="profile-pic" ref="img" @load="checkImgHeight()" :src="card.profile_image.url" v-if="card.profile_image">
      </div>

      <div class="content" >

				<div  class="copy-container" ref="copyContainer">
					<div ref="copy"
						v-html="data.htmlField(card.profile_copy)">
					</div>
				</div>

        <div @click="toggleText()" v-if="longCopy" class="copy-cta">
          <p v-if="collapsed">read more</p>
          <p v-else>collapse</p>
        </div>

      </div>


	</div>
</template>

<script>

export default {
	props: [
		'data',
		'card'
	],
	data() {
		return {
			longCopy: false,
			collapsed: true,
			imgHeight: 374
		};
	},
	computed: {
		maxCopyHeight() {
			if (this.longCopy && this.collapsed) {
				return `${this.imgHeight - 36}px`;
			} else if (this.longCopy && !this.collapsed) {
				return '100%';
			}
			return `${this.imgHeight}px`;
		}
	},
	methods: {
		checkImgHeight() {
			this.imgHeight = this.$refs.img.offsetHeight;
			if (this.$refs.copy && this.imgHeight < this.$refs.copy.offsetHeight) {
				this.longCopy = true;
			}
			this.$refs.copyContainer.style.maxHeight = this.maxCopyHeight;
		},
		toggleText() {
			this.collapsed = !this.collapsed;
			this.$refs.copyContainer.style.maxHeight = this.maxCopyHeight;
		}

	},
	mounted() {

	}
};

</script>

<style lang="stylus" scoped>

@import "../../styl/_variables"

.team-member
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

// .content.collapsed
// 	overflow hidden

.copy-cta
	color $blue
	// overflow hidden

.copy-container
	// max-height 200px
	// overflow hidden
	// text-overflow ellipsis
	transition max-height 1s
	word-wrap break-word
	// +below($tablet)
	// 	max-height 80px

	&.full-copy
		overflow visible
		max-height 100%

	/deep/
		h2, h3, h4, p
			&:first-child
				margin-top 0

		h2, h3
			@extend .heading
			margin-left 0
			+below($tablet)
				fs(30)

</style>
