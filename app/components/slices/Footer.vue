<template>
	<div class="footer">
		<footer>

			<div class="content">

				<logo fill="#fff"
					class="logo"/>

				<ul v-if="splitCopy">
					<li v-for="(line, idx) in splitCopy"
						:key="idx"
						v-html="line"/>
				</ul>

			</div>

		</footer>
	</div>
</template>

<script>

import airprops from '../../mixins/airprops';
import Logo from '../svg/Logo.vue';

export default {

	mixins: [ airprops ],

	components: {
		Logo
	},

	data() {
		return {
			splitCopy: null
		};
	},

	created() {
		if (this.copy) {
			this.splitCopy = this.copy.split(/\n/);
		}
	}

};
</script>

<style lang="stylus" scoped>

@import "../../styl/_variables"

.footer
	background $w
	position relative
	overflow hidden

.content
	/deep/
		ul
			list-style none
			padding 0

		li
			margin 0

</style>
