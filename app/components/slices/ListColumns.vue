<template>
  <div class="list-columns">
    <div class="wrap">

			<div class="motivation">

				<h2 v-html="$cms.textField(data.fields.reasons_heading)"/>

				<div class="columns">
					<div v-for="(reason, idx) in data.items" :key="idx">
						<h4 v-html="$cms.textField(reason.heading)" v-if="reason.heading"></h4>
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
// import LerpScroll from '../../js/lerp-scroll.js';

export default {
	mixins: [ airprops ]
};
</script>

<style lang="stylus" scoped>

@import "../../styl/_variables"

.list-columns
	@extend .slice
	pad(0,0,3,0)
	overflow hidden
	.wrap
		position relative
		pad(3, 0, 0);

a
	width auto
	&:before, &:after
		display none

.columns
	position relative
	+above($tablet)
		display flex
		flex-wrap wrap
		justify-content space-between
	h4
		color $blue
	>div
		+above($tablet)
			width 45%

</style>
