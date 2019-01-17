<template>
<div class="map-background">
	<div class="annotations-wrap-wrap">
			<div class="annotations-wrap">
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
			</div>
			</div>
			

	<GmapMap
		class="map-frame"
		:center="{lat: center.lat, lng: center.lng}"
		:zoom="16"
		:options="{
			styles: mapStyles,
			scrollwheel: false,
			disableDefaultUI: true,
			zoomControl: $store.state.device.mobile ? false : true,
			zoomControlOptions: {
				position:	6
			},
		}"
	>
		<GmapMarker
			:icon="{url: require('../../images/map-icon.png')}"
			:position="{lat: markerCenter.lat, lng: markerCenter.lng}"
		/>
	</GmapMap>
</div>
</template>

<script>

import airprops from '../../mixins/airprops';
import Vue from 'vue';
import * as VueGoogleMaps from 'vue2-google-maps';
import TweenMax from 'gsap/TweenMax';

Vue.use(VueGoogleMaps, {
	load: {
		key: 'AIzaSyCU94afFT36d12eC2eqBXR-FxkiwjpQlyo'
	}
});

export default {
	mixins: [ airprops ],
	props: [
		'inview'
	],
	watch: {
		inview(newVal) {
			if (newVal) {
				TweenMax.from(this.markerCenter, 1, {
					lat: this.data.fields.map_lat_lng.latitude + 0.0005,
					delay: 0.3
				});
			}
		}
	},
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
			}
		];

		return {
			center: {
				lat: this.data.fields.map_lat_lng.latitude,
				lng: this.data.fields.map_lat_lng.longitude
			},
			markerCenter: {
				lat: this.data.fields.map_lat_lng.latitude,
				lng: this.data.fields.map_lat_lng.longitude
			},
			mapStyles
		};
	},
	mounted() {
		// doesn't really work but I don't know how else to manipulate this element
		// TweenMax.from(this.markerCenter, 1, { lat: this.data.fields.map_lat_lng.latitude + 0.0005, delay: 2 });
	}
};
</script>

<style lang="stylus" scoped>

@import "../../styl/_variables"


.map-background
	background-color $lightgrey
.annotations-wrap-wrap
	@extend .slice .wrap

.annotations-wrap
	margin-left auto
	width 50%
	+below($notebook)
		width 100%
		display block
	+above($notebook)
		float left

.annotations

	+below($notebook)
		text-align center
		p
			min-width 100%
			

	/deep/ h2,
	/deep/ h3
		+below($notebook)
			fs(30)
			padding 0 5%

	+above($notebook)

		.cta
			pad(1,0)
			width 100%
			//width (200%/ 6)

			.button
				width 100%

	+below($notebook)

		.cta-mobile
			text-align center
			display inline-block

.map-frame
	width 50%
	left 50%
	height 36vw
	transition width 1s
	.v-enter &, .onpage:not(.inview) &
		width 0
	+below($tablet)
		height 75vw
	+below($notebook)
		width 100%
		left 0
/deep/ .gmnoprint
	right auto

//--------------------------------------------------
h4, p, a div
	transition transform 0.5s, opacity 0.5s
	opacity 1
	transform translateY(0)
	
	.v-enter &, .onpage:not(.inview) &
		opacity 0
		transform translateY(2rem)

p
	max-width 80%
	transition-delay 0.3s
h4
	transition-delay 0.2s
	color $blue
a div
	transition-delay 0.4s

</style>