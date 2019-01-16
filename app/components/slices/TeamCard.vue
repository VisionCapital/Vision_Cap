<template>
	<div class="team-cards">

		<div class="wrap" v-if="data.items.length">
			<div v-html="data.html('team_title')"></div>
		</div>

		<div class="card" v-for="(card, idx) in data.items" :key="idx">
			<div class="wrap" >
				<transition appear>
					<team-member
						:class="[ 'onpage', { inview : sidx >= idx }]"
						ref="teamMember"
						:card="card"
					/>
				</transition>
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
	props: [
		'lastScrollTop'
	],
	data() {
		return {
			sidx: -1
		};
	},
	computed: {
		deviceHeight() {
			return this.$store.state.device.win.y;
		}
	},
	methods: {
		resize() {
			// console.log(this.page.scroll.pos + this.deviceHeight * 0.75);
			// console.log(this.$refs.teamMember[1].$el.offsetTop);
			// console.log('=================');
			let members = this.$refs.teamMember;
			for (let member of members) {
				member.checkImgHeight();
			}
		},
		checkScroll(scrollTop) {
			// console.log(scrollTop + this.deviceHeight * 0.75);
			// console.log(this.$refs.teamMember[1].$el.offsetTop);
			// console.log('=================');
			for (let i = this.$refs.teamMember.length - 1; i > -1; i--) {
				if (scrollTop + this.deviceHeight * 0.75 > this.$refs.teamMember[i].$el.offsetTop) {
					this.sidx = i;
					return;
				}
			}
		}
	},
	mounted() {
		console.log(this.page.scroll);
		window.addEventListener('resize', this.resize);

		this.scrollInterval = setInterval(() => {
			this.checkScroll(this.lastScrollTop);
		}, 500);

	},
	destroy() {
		window.removeEventListener('resize', this.resize);
		clearInterval(this.scrollInterval);
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
