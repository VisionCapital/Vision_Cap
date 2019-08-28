<template>
  <div class="flexible-slice">
    <div class="wrap">

			<div class="content">


			</div>

    </div>
  </div>
</template>


<script>

import airprops from '../../mixins/airprops';

export default {
	mixins: [ airprops ]
};

</script>

<style lang="stylus" scoped>

@import "../../styl/_variables"

.flexible-slice
	background $bg
	@extend $slice
	overflow hidden
	pad(0, 0, 1)

	.wrap
		position relative
		pad(2, 0, 0)

a
	width auto
	&:before, &:after
		display none

h2
	font-family $cormorant-medium

h2, h3
	transition opacity 0.5s, transform 0.5s
	.v-enter &, .onpage:not(.inview) &
		opacity 0
		transform translateY(2rem)

/deep/ li
	transition opacity 0.5s, transform 0.5s
	.v-enter &, .onpage:not(.inview) &
		opacity 0
		transform translateX(-2rem)

.container

	&:nth-child(odd)
		pad(0,2,0,0)
	for i in 1..20
		&:nth-child({i}) li, &:nth-child({i}) h4
			transition-delay 0.2s * i

.columns
	position relative
	+above($tablet)
		display flex
		flex-wrap wrap
		justify-content space-between
	h3
		font-family $cormorant-semibold
		color $blue
	>div
		+above($tablet)
			width 50%

</style>
