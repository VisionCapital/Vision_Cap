<template>
	<div class="single-column-copy">
    <div class="wrap">

			<div class="title" v-if="data.fields.title" v-html="data.html('title')">
			</div>

			<div class="copy" v-if="data.fields.copy" v-html="data.html('copy')">
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
		};
	}

};

</script>

<style lang="stylus" scoped>

@import "../../styl/_variables"
.single-column-copy
	@extend .slice
	transition opacity 0.5s
	&.v-enter, &.onpage:not(.inview)
		opacity 0
</style>
