<template>
	<div class="team-cards">

		<div class="wrap" v-if="data.items.length">
			<div v-html="data.html('team_title')"></div>
		</div>

		<div class="card" v-for="(card, idx) in data.items" :key="idx">
			<div class="wrap" >

				<team-member
					ref="teamMember"
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
	
	.card:nth-child(even)
		background $lightgrey

</style>
