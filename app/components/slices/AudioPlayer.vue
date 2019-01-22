<template>
	<div class="audio-component">

		<audio
			ref="audioFile"
			v-if="audio"
			@loadeddata="loaded()"
			:src="audio.url">
			<p>Your browser does not support ths audio file, here is a <a :href="audio.url">link to the audio</a> instead</p>
		</audio>

		<div v-if="audio" class="audio-container">
			<div class="play-button" @click="playToggle()">play</div>
			<div class="time elapsed" v-html="currentTime"></div>
			<div class="progress-bar">
				<div class="finished"></div>
				<div class="loaded"></div>
			</div>
			<div class="time remaining" v-html="timeLeft">remaining time</div>
			<div class="volume-toggle">volume toggle</div>
			<div class="volume-slider">slider</div>
		</div>


	</div>
</template>

<script>

export default {

	props: {
		audio: {
			type: Object,
			required: true
		}
	},
	data() {

		return {
			currentTime: 0.00,
			duration: 0
		};
	},
	computed: {
		timeLeft() {
			if (!isNaN(this.duration)) {
				console.log(this.duration);
			}
			return;
		}
	},
	methods: {
		loaded() {
			this.duration = this.$refs.audioFile.duration;
		},
		playToggle() {
			console.log(this.$refs);
			if (this.$refs.audioFile.paused) {
				this.$refs.audioFile.play();
			} else {
				this.$refs.audioFile.pause();
			}
		},
		setTime(numberElapsed) {
			this.date.setSeconds(numberElapsed);
			this.currentTime = this.date.toISOString().substr(11, 8);
		}
	},
	mounted() {
		this.date = new Date(null);
		this.date.setSeconds(0);
		this.setTime(0);

		this.timeInterval = setInterval(() => {
			if (this.$refs.audioFile) {
				if (!this.$refs.audioFile.paused) {
					this.setTime(this.$refs.audioFile.currentTime);
				}
			}
		}, 500);
		this.duration = this.$refs.audioFile.duration;
		console.log(this.$refs.audioFile.duration);
		console.log(this.$refs.audioFile.duration);

	},
	destroy() {
		clearInterval(this.timeInterval);
	}

};

</script>

<style lang="stylus" scoped>

@import "../../styl/_variables"

.audio-container
	height 60px
	background $grey
	width 100%
	color $blue
	display flex
	align-items center
	justify-content space-between

.progress-bar
	width 300px
	background $copy
	height 10px
</style>
