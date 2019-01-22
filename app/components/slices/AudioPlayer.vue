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
			<div class="progress-bar" ref="progressBar">
				<div class="finished" :style="{width: progress}"></div>
				<div class="loaded"></div>
			</div>
			<div class="time remaining" v-html="durationTime">remaining time</div>
			<div class="volume-toggle" @click="volumeToggle()">volume</div>
			<div class="volume-slider">
				<div class="volume-level"></div>
			</div>
		</div>


	</div>
</template>

<script>

// import millisec from 'millisec';

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
			durationTime: false,
			durationNum: 0,
			currentNum: 0,
			progress: '0%'
		};
	},
	computed: {

	},
	methods: {
		volumeSlide() {
		},
		setProgress() {
			console.log('setProgress');
			if (this.durationNum && this.currentNum) {
				this.progress = `${this.currentNum / this.durationNum * this.$refs.progressBar.offsetWidth}%`;
				// console.log(percentTime);
			}
			return;
		},
		loaded() {
			this.durationNum = this.$refs.audioFile.duration;
			let durationDate = new Date(null);
			durationDate.setSeconds(this.durationNum);
			this.durationTime = durationDate.toISOString().substr(11, 8);
		},
		volumeToggle() {
			this.$refs.audioFile.muted = !this.$refs.audioFile.muted;
		},
		playToggle() {
			if (this.$refs.audioFile.paused) {
				this.$refs.audioFile.play();
			} else {
				this.$refs.audioFile.pause();
			}
		},
		setTime(numberElapsed) {
			this.currentNum = numberElapsed;
			this.date.setSeconds(numberElapsed);
			this.currentTime = this.date.toISOString().substr(11, 8);
		}
	},
	mounted() {
		this.date = new Date(null);
		this.date.setSeconds(0);
		this.setTime(0);
		this.setProgress();

		this.timeInterval = setInterval(() => {
			if (this.$refs.audioFile) {
				if (!this.$refs.audioFile.paused) {
					this.setTime(this.$refs.audioFile.currentTime);
					this.setProgress();
				}
			}
		}, 500);
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
	pad(0,1)

.progress-bar
	width 300px
	background $copy
	height 10px
	position relative

.finished
	height 100%
	background $blue

.volume-slider
	position relative
	height 10px
	width 60px
	background $copy

.volume-level 
	height 100%
	width 10px
	background $blue
</style>
