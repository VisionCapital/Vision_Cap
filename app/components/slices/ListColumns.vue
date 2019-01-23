<template>
  <div class="list-columns">
    <div class="wrap">

			<div class="motivation">

				<h2 v-html="$cms.textField(data.fields.reasons_heading)"/>

				<div class="columns">
					<div class="container" v-for="(reason, idx) in data.items" :key="idx">
						<h3 v-html="$cms.textField(reason.heading)" v-if="reason.heading"></h3>
						<ul>
							<li v-for="(item, i) in reason.list_items" :key="'item' + i" v-html="item.text"></li>
						</ul>
					</div>
				</div>

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

.list-columns
	background $bg
	@extend .slice
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

li
	transition opacity 0.5s, transform 0.5s
	.v-enter &, .onpage:not(.inview) &
		opacity 0
		transform translateX(-2rem)

.container
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
			width 45%

</style>
