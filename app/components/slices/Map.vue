<template>
	<div class="map">
		<div class="wrap">

			<div class="annotations">

				<div class="copy">
					<h2 v-if="heading"
						v-html="heading"/>
					<p v-if="subheading"
						v-html="subheading"/>
				</div>

				<div class="cta" v-if="$store.state.device.win.x > 1024">
				<h4 v-html="data.text('map_title')"/>
				<p v-html="data.text('map_location')"/>
					<a :href="data.fields.map_link.url" target="_blank">
						<div v-html="data.text('map_link_title')"/>
					</a>
				</div>

				<div class="cta-mobile" v-if="$store.state.device.win.x < 1024">
				<h4 v-html="data.text('map_title')"/>
				<p v-html="data.text('map_location')"/>
				</div>

			</div>

			<GmapMap
				class="map-frame"
				:center="{lat: lat, lng: lng}"
				:zoom="16"
				:options="{styles: mapStyles}"
			>
				<GmapMarker
					:position="{lat: lat, lng: lng}"
				/>
			</GmapMap>

		</div>
	</div>
</template>

<script>

import airprops from '../../mixins/airprops';
import Vue from 'vue';
import * as VueGoogleMaps from 'vue2-google-maps';

Vue.use(VueGoogleMaps, {
	load: {
		key: 'AIzaSyCU94afFT36d12eC2eqBXR-FxkiwjpQlyo'
	}
});

export default {
	mixins: [ airprops ],
	data() {

		let mapStyles = [
			{
				'featureType': 'water',
				'elementType': 'geometry',
				'stylers': [
					{ 'color': '#e9e9e9' },
					{ 'lightness': 17 }
				]
			},
			{
				'featureType': 'landscape',
				'elementType': 'geometry',
				'stylers': [
					{ 'color': '#f5f5f5' },
					{ 'lightness': 20 }
				]
			},
			{
				'featureType': 'road.highway',
				'elementType': 'geometry.fill',
				'stylers': [
					{ 'color': '#ffffff' },
					{ 'lightness': 17 }
				]
			},
			{
				'featureType': 'road.highway',
				'elementType': 'geometry.stroke',
				'stylers': [
					{ 'color': '#ffffff' },
					{ 'lightness': 29 },
					{ 'weight': 0.2 }
				]
			},
			{
				'featureType': 'road.arterial',
				'elementType': 'geometry',
				'stylers': [
					{ 'color': '#ffffff' },
					{ 'lightness': 18 }
				]
			},
			{
				'featureType': 'road.local',
				'elementType': 'geometry',
				'stylers': [
					{ 'color': '#ffffff' },
					{ 'lightness': 16 }
				]
			},
			{
				'featureType': 'poi',
				'elementType': 'geometry',
				'stylers': [
					{ 'color': '#f5f5f5' },
					{ 'lightness': 21 }
				]
			},
			{
				'featureType': 'poi.park',
				'elementType': 'geometry',
				'stylers': [
					{ 'color': '#dedede' },
					{ 'lightness': 21 }
				]
			},
			{
				'elementType': 'labels.text.stroke',
				'stylers': [
					{ 'visibility': 'on' },
					{ 'color': '#ffffff' },
					{ 'lightness': 16 }
				]
			},
			{
				'elementType': 'labels.text.fill',
				'stylers': [
					{ 'saturation': 36 },
					{ 'color': '#333333' },
					{ 'lightness': 40 }
				]
			},
			{
				'elementType': 'labels.icon',
				'stylers': [
					{ 'visibility': 'off' }
				]
			},
			{
				'featureType': 'transit',
				'elementType': 'geometry',
				'stylers': [
					{ 'color': '#f2f2f2' },
					{ 'lightness': 19 }
				]
			},
			{
				'featureType': 'administrative',
				'elementType': 'geometry.fill',
				'stylers': [
					{ 'color': '#fefefe' },
					{ 'lightness': 20 }
				]
			},
			{
				'featureType': 'administrative',
				'elementType': 'geometry.stroke',
				'stylers': [
					{ 'color': '#fefefe' },
					{ 'lightness': 17 },
					{ 'weight': 1.2 }
				]
			},
			{
				'disableDefaultUI': true
			}
		];

		return {
			lat: this.data.fields.map_lat_lng.latitude,
			lng: this.data.fields.map_lat_lng.longitude,
			mapStyles
		};
	}
};
</script>

<style lang="stylus" scoped>

@import "../../styl/_variables"

.wrap

	width auto
	display flex
	background-color $lightgrey
	margin 0 0 0 auto

p
	max-width 80%
h4
	color $blue

.map-frame
	width 100%
	height 30rem
.map-ratio
	overflow hidden
	padding-bottom 50%
	position relative
	width 100%
	+below($notebook)
		padding-bottom 75%

	/deep/ iframe,
	/deep/ img
		left 0
		position absolute
		top 0
		width 100%

	/deep/ iframe
		height 100%

.wrap
	display flex
	justify-content space-between
	+below($notebook)
		flex-direction column

.annotations
	display flex
	width auto
	flex-direction column
	justify-content center
	+above($notebook)//laptop
		margin-left 11%
	+above($laptop)//laptop-large
		margin-left 13%
	+above($laptop-large)//desktop
		margin-left 17%
	+above($desktop)//ultra
		margin-left 22.5%

	+below($notebook)
		text-align center
		p
			min-width 100%

	/deep/ h2,
	/deep/ h3
		+below($notebook)
			fs(30)
			padding 0 5%

	+above($tablet)
		text-align left


		.cta
			pad(1,0)
			//width (200%/ 6)


			.button
				width 100%

	+above($mobile)

		.cta-mobile
			text-align center
			display inline-block

	
</style>