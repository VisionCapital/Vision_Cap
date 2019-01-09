<template>
	<div class="team-cards">

		<div class="wrap" v-if="data.items.length">

			<div v-html="data.html('team_title')"></div>

			<div class="card" v-for="(card, idx) in data.items" :key="idx">

				<team-member
					ref="teamMember"
					:data="data"
					:card="card"
				/>

			</div>

		</div>

	</div>
</template>

<script>

import airprops from '../../mixins/airprops';
import TeamMember from './TeamMember.vue';
export default {

	mixins: [ airprops ],
	components: {
		TeamMember
	},
	methods: {
		resize() {
			let members = this.$refs.teamMember;
			for (let member of members) {
				member.checkImgHeight();
			}
		}
	},
	mounted() {
		window.addEventListener('resize', this.resize);
	},
	destroy() {
		window.removeEventListener('resize', this.resize);
	}
};

</script>

<style lang="stylus" scoped>

@import "../../styl/_variables"

.team-cards
	@extend .slice
	// padding 1px 0
	+above($tablet)
		// margin 0 (100% / 8)
		// width (600% / 8)

	.wrap
		margin-top (100% / 8)
		margin-bottom (100% / 8)
		position relative

	.card:nth-child(even)
		background $bg

</style>
