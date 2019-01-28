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

			<button class="play-button" @click.prevent="playToggle()"
				:title="playText">
				<svg xmlns="http://www.w3.org/2000/svg" width="10" height="18" viewBox="0 0 10 18" focusable="false">
					<path fill="#00227D" fill-rule="evenodd" d="M0 .5v16.779l9.518-8.39z"/>
				</svg>
				<svg xmlns="http://www.w3.org/2000/svg" width="9" height="14" viewBox="0 0 9 14">
					<g fill="#00227D" fill-rule="evenodd">
						<path d="M0 0h3v14H0z"/>
						<path d="M6 0h3v14H6z"/>
					</g>
				</svg>
			</button>

			<div class="time elapsed" v-html="currentPrint"></div>

			<div class="progress-bar"
				ref="progressBar"
				@mousedown="progDown"
				@click="clickProgress($event)">
				<div class="finished" :style="{width: progress}"></div>
				<div class="loaded"></div>
			</div>

			<div class="time remaining" v-html="durationPrint">remaining time</div>

			<button class="volume-toggle" @click.prevent="volumeToggle()">
				<svg xmlns="http://www.w3.org/2000/svg" width="18" height="14" viewBox="0 0 18 14" focusable="false">
					<g fill="#040170" fill-rule="evenodd">
						<path d="M0 10.5h3v-7H0z"/>
						<path d="M10 .5L4 3.647v6.706l6 3.147V.5z"/>
						<path d="M15.137 13.435l-1.002-.813.424-.48c1.347-1.524 2.058-3.3 2.058-5.138s-.711-3.614-2.057-5.138l-.425-.48 1.002-.813.424.48c1.55 1.754 2.369 3.812 2.369 5.951 0 2.14-.82 4.197-2.37 5.95l-.423.48z"/>
						<path d="M13.084 10.881l-1.032-.777.406-.495a4.07 4.07 0 0 0 .94-2.605 4.07 4.07 0 0 0-.94-2.605l-.406-.495 1.032-.777.406.494a5.284 5.284 0 0 1 1.22 3.383 5.284 5.284 0 0 1-1.22 3.383l-.406.494z"/>
					</g>
				</svg>
				<svg xmlns="http://www.w3.org/2000/svg" width="20" height="14" viewBox="0 0 20 14">
					<g fill="none" fill-rule="evenodd">
						<path fill="#040170" d="M0 10.5h3v-7H0z"/>
						<path fill="#040170" d="M10 .5L4 3.647v6.706l6 3.147V.5z"/>
						<g stroke="#00227D" stroke-linecap="square" stroke-width="1.5">
							<path d="M19 10l-6-6 6 6z"/>
							<path d="M13 10l6-6-6 6z"/>
						</g>
					</g>
				</svg>
			</button>

			<div class="volume-slider"
				v-if="!$store.state.device.mobile"
				ref="volumeBar"
				@mousedown="volDown"
				@touchstart="touchDown"
				@click="clickVolume($event)">
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
			window.addEventListener('mousemove', this.progSlide, { passive: true });
			window.addEventListener('mouseup', this.progUp, { passive: true });
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
			window.removeEventListener('mousemove', this.progSlide, { passive: true });
			window.removeEventListener('mouseup', this.progUp, { passive: true });
		},

		volDown() {
			window.addEventListener('mousemove', this.volumeSlide, { passive: true });
			window.addEventListener('mouseup', this.volUp, { passive: true });
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
			window.removeEventListener('mousemove', this.volumeSlide, { passive: true });
			window.removeEventListener('mouseup', this.volUp, { passive: true });
		},
		touchDown() {
			window.addEventListener('touchmove', this.touchSlide, { passive: true });
			window.addEventListener('touchend', this.touchUp, { passive: true });
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
			window.removeEventListener('touchmove', this.touchSlide, { passive: true });
			window.removeEventListener('touchend', this.touchUp, { passive: true });
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
	background 0
	border 0
	padding 0
	margin 0

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
	background $blue
	width 6px
	height 100%

</style>
