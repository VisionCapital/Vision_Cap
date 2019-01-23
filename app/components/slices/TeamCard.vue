<template>
	<div class="team-cards">

		<header>
			<div class="wrap heading-wrap" v-if="data.items.length && data.fields.team_title[0].text">
				<div class="heading" v-html="data.html('team_title')"></div>
			</div>
		</header>

		<div class="card" v-for="(card, idx) in data.items" :key="idx">
			<div class="wrap">
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
			let members = this.$refs.teamMember;
			for (let member of members) {
				member.checkImgHeight();
			}
		},
		checkScroll(scrollTop) {
			for (let i = this.$refs.teamMember.length - 1; i > -1; i--) {
				if (scrollTop + this.deviceHeight * 0.75 > this.$refs.teamMember[i].$el.offsetTop) {
					this.sidx = i;
					return;
				}
			}
		}
	},
	mounted() {
		window.addEventListener('resize', this.resize);

		this.scrollInterval = setInterval(() => {
			this.checkScroll(Math.abs(this.page.scroll.pos));
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

	/deep/ header
		background $bg
		padding 1px 0

	.card
		&:nth-of-type(odd)
			background $bg

		&:nth-of-type(even)
			background $lightgrey

.heading /deep/ h2
	font-family $cormorant-semibold
	mgn(2,0)

</style>
