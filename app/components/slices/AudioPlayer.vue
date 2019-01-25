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
			<div class="play-button" @click="playToggle()">{{ playText }}</div>
			<div class="time elapsed" v-html="currentPrint"></div>
			<div class="progress-bar" 
				ref="progressBar" 
				@mousedown="progDown"
				@click="clickProgress($event)"
			>
				<div class="finished" :style="{width: progress}"></div>
				<div class="loaded"></div>
			</div>
			<div class="time remaining" v-html="durationPrint">remaining time</div>
			<div class="volume-toggle" @click="volumeToggle()">volume</div>
			<div class="volume-slider" 
				v-if="!$store.state.device.mobile"
				ref="volumeBar" 
				@mousedown="volDown"
				@touchstart="touchDown"
				@click="clickVolume($event)"
			>
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
			audioVolume: 0,
			playText: 'play'
		};
	},
	computed: {
	},
	watch: {
		audioVolume() {
			if (this.$refs.audioFile) {
				this.$refs.audioFile.volume = this.audioVolume;
			}
		}
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
		progDown() {
			window.addEventListener('mousemove', this.progSlide);
			window.addEventListener('mouseup', this.progUp);
		},
		progSlide(evt) {
			let box = this.$refs.progressBar.getBoundingClientRect();
			let mx = evt.pageX;
			let bx = box.left;
			let bw = box.width;

			let amt = Math.max(0, Math.min(bw, mx - bx)) / bw;
			this.progress = `${amt * 100}%`;
			this.$refs.audioFile.currentTime = amt * this.durationNum;
		},
		progUp() {
			window.removeEventListener('mousemove', this.progSlide);
			window.removeEventListener('mouseup', this.progUp);
		},
		volDown() {
			window.addEventListener('mousemove', this.volumeSlide);
			window.addEventListener('mouseup', this.volUp);
		},
		volumeSlide(evt) {

			let box = this.$refs.volumeBar.getBoundingClientRect();
			let mx = evt.pageX;
			let bx = box.left;
			let bw = box.width;

			let amt = Math.max(0, Math.min(bw, mx - bx)) / bw;
			this.audioVolume = amt;
		},
		volUp() {
			window.removeEventListener('mousemove', this.volumeSlide);
			window.removeEventListener('mouseup', this.volUp);
		},
		touchDown() {
			window.addEventListener('touchmove', this.touchSlide);
			window.addEventListener('touchend', this.touchUp);
		},
		touchSlide(evt) {
			let box = this.$refs.volumeBar.getBoundingClientRect();
			let mx = evt.changedTouches[0].pageX;
			let bx = box.left;
			let bw = box.width;

			let amt = Math.max(0, Math.min(bw, mx - bx)) / bw;
			this.audioVolume = amt;
		},
		touchUp() {
			window.removeEventListener('touchmove', this.touchSlide);
			window.removeEventListener('touchend', this.touchUp);
		},
		clickVolume(evt) {

			let volPercent = evt.clientX - this.$refs.volumeBar.getBoundingClientRect().left;
			volPercent /= this.$refs.volumeBar.offsetWidth;

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
				this.playText = 'pause';
			} else {
				this.$refs.audioFile.pause();
				this.playText = 'play';
			}
		},
		loaded() {
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

.audio-component
	transition transform 0.5s $easeOutCubic, opacity 0.5s	
	&.v-enter, &.v-leave-to
		transform translate(100%,0)
		opacity 0

.audio-container
	height 36px
	background #eee
	width 100%
	color $blue
	display flex
	align-items center
	justify-content space-between
	pad(0,.5)
	fs(12);
	>*
		mgn(0,.25)

.play-button, .volume-toggle
	cursor pointer

.progress-bar
	width 60%
	background #d5d5d5
	height 6px
	position relative
	+below($notebook)
		width 50%
.finished
	height 100%
	background $blue

.volume-slider
	position relative
	height 6px
	width 60px
	background #d5d5d5

.volume-level 
	height 100%
	width 6px
	background $blue
</style>
