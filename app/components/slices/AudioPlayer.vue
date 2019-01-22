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
			<div class="time elapsed" v-html="currentPrint"></div>
			<div class="progress-bar" ref="progressBar" @click="clickProgress($event)">
				<div class="finished" :style="{width: progress}"></div>
				<div class="loaded"></div>
			</div>
			<div class="time remaining" v-html="durationPrint">remaining time</div>
			<div class="volume-toggle" @click="volumeToggle()">volume</div>
			<div class="volume-slider" ref="volumeBar" @mouseDown="clickVolume($event)" @click="clickVolume($event)">
				<div class="volume-level" :style="{width: `${audioVolume * 100}%`}"></div>
			</div>
		</div>


	</div>
</template>

<script>

import millisec from 'millisec';

export default {

	props: {
		audio: {
			type: Object,
			required: true
		}
	},
	data() {

		return {
			currentPrint: 0.00,
			durationPrint: false,
			durationNum: 0,
			currentNum: 0,
			progress: '0%',
			audioVolume: 0.75
		};
	},
	computed: {

	},
	methods: {
		timeFormat(time) {
			let minutes = '';
			let seconds = '';
			if (millisec(time).getSeconds() < 10) {
				seconds = '0';
			}
			if (millisec(time).getMinutes() < 10) {
				minutes = '0';
			}
			return millisec(time).format(`${minutes}mm:${seconds}ss`);
		},
		volumeSlide() {
		},
		clickVolume(evt) {
			let volPercent = evt.clientX - this.$refs.volumeBar.getBoundingClientRect().left;
			volPercent /= this.$refs.volumeBar.offsetWidth;
			this.$refs.audioFile.volume = volPercent;
			this.audioVolume = volPercent;
		},
		clickProgress(evt) {
			let progPercent = evt.clientX - this.$refs.progressBar.getBoundingClientRect().left;
			progPercent /= this.$refs.progressBar.offsetWidth;
			this.progress = `${progPercent * 100}%`;
			this.$refs.audioFile.currentTime = progPercent * this.durationNum;
			this.setTime(progPercent * this.durationNum);
		},
		setProgress() {
			if (this.durationNum && this.currentNum) {
				this.progress = `${this.currentNum / this.durationNum * this.$refs.progressBar.offsetWidth}px`;
			}
			return;
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
		loaded() {
			this.$refs.audioFile.volume = 0.75;
			this.audioVolume = 0.75;
			this.durationNum = this.$refs.audioFile.duration;
			this.durationPrint = this.timeFormat(this.$refs.audioFile.duration * 1000);
		},
		setTime(timeSeconds) {
			this.currentNum = timeSeconds;
			this.currentPrint = this.timeFormat(timeSeconds * 1000);
		}
	},
	mounted() {
		this.setTime(0);
		this.setProgress();

		this.timeInterval = setInterval(() => {
			if (this.$refs.audioFile && !this.$refs.audioFile.paused) {
				this.setTime(this.$refs.audioFile.currentTime);
				this.setProgress();
			}
		}, 200);
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
