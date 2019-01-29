<template>
	<form ref="form" @submit.prevent="doSubmit()">
		<div class="left">
			<div class="form-row" v-for="(field, idx) in fields" :key="idx">
				<div class="required" v-if="field.required === 'Yes'" :style="{'transition-delay': `${0.3 * idx}s`}">*</div>
				<div :class="{ 'input-container': 1, error: isError(key(field)) }">
					<input :id="`field-${idx}`"
						type="text"
						:name="key(field)"
						:style="{'transition-delay': `${0.3 * idx + 0.2}s`}"
						:placeholder="data.textField(field.placeholder)">
					<div class="bottom-border"
						:style="{'transition-delay': `${0.3 * idx}s`}"/>
				</div>
			</div>
		</div>
		<div class="right">
			<div class="input-container">
				<textarea rows="1"
					v-if="data.fields.textarea_placeholder"
					name="message"
					:placeholder="data.textField(data.fields.textarea_placeholder)"
					:style="{'transition-delay': `${fields.length * 0.3}s`}"></textarea>
				<div class="bottom-border" :style="{'transition-delay': `${fields.length * 0.3}s`}"></div>
			</div>
				<transition appear>
					<div class="spinner" v-if="loading">
						<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100">
							<path d="M 25 50 A 25 25 0 1 0 50 25"/>
						</svg>
					</div>
				</transition>
				<button id="submit"
					name="submit"
					type="submit"
					:style="{'transition-delay': `${fields.length * 0.3 + 0.3}s`}"
					:class="{ btn: 1, success }">
					<span v-html="data.textField(data.fields.submit_button)"/>
					<svg xmlns="http://www.w3.org/2000/svg" width="62" height="11" viewBox="0 0 62 11">
						<g fill="none" fill-rule="evenodd" stroke="#FFF" stroke-width="1.5">
							<path d="M56 10.5l5-5.0002L56 .5M61 5.5H0"/>
						</g>
					</svg>
				</button>

				<transition appear>
					<div :class="{ errorMessage: 1, success }" v-if="errorMessage">{{ errorMessage }}</div>
				</transition>

		</div>
	</form>
</template>

<script>

const action = __EMAIL_URL; // eslint-disable-line no-undef

import axios from 'axios';

export default {
	props: [
		'data'
	],
	data() {
		let fields = this.data.items;

		return {
			errors: null,
			errorMessage: null,
			success: false,
			action,
			fields,
			loading: false
		};
	},
	methods: {
		key(obj) {
			return this.data.textField(obj.key).toLowerCase();
		},
		isError(field) {
			if (!this.errors) {
				return false;
			}

			return this.errors.includes(field);
		},
		doSubmit() {

			if (this.success) {
				return;
			}

			console.log('do submit'); // eslint-disable-line no-console
			this.success = false;
			this.errors = null;
			this.errorMessage = null;

			let form = this.$refs.form;
			let formData = new FormData(form);

			let request = {};
			for (let item of formData) {
				request[item[0]] = item[1];
			}

			this.loading = true;

			axios.post(action, request).then((response) => {

				this.loading = false;
				let data = response.data;
				if (data.status === 'ok') {
					this.success = true;
					this.errorMessage = 'Thank you';
					return;
				}

				this.errorMessage = data.message;
				this.errors = data.errors;

				// setTimeout(() => {
				// 	this.success = false;
				// 	this.errorMessage = null;
				// 	this.errors = null;
				// }, 20000);


			});
		}
	}
};

</script>

<style lang="stylus" scoped>

@import "../styl/_variables"
@import "../styl/_ease"

input, select, textarea, button {
	color: $w;
}
option {
	background-color: #222;
}


form
	position relative
	pad(0,1)
	+above($tablet)
		// width 60%
		display flex
		justify-content space-between

.left
	+above($tablet)
		width 36%

.right
	+above($tablet)
		width 58%
	.input-container
		mgn(1,0)
.required
	position absolute
	left -2em
	color #3360D9
	transition opacity 0.4s
	.v-enter &, .onpage:not(.inview) &
		opacity 0


.form-row
	mgn(1,0)
	position relative

.input-container
	position relative
	overflow hidden
	&.error .bottom-border
		transition-delay 0s !important // pls to forgive me
		background #ff0000

.bottom-border
	height 1px
	width 100%
	position absolute
	bottom 0
	left 0
	z-index 2
	background #3360D9
	transition width 0.5s, background 1s $easeOutCubic

	input:focus + &,
	textarea:focus + &
		background lighten($blue, 60%)

	.v-enter &, .onpage:not(.inview) &
		width 0%

form
	input, textarea
		color $w
		border 0
		font-smoothing()
		width 100%
		padding 0
		line-height 2.5em
		transition transform 0.5s

		&:hover
			border-color $copy

		&:focus
			border-color $w

		&::placeholder
			color #9F9F9F
			color rgba($w,.37)
			+below($tablet)
				text-align center

	.v-enter &, .onpage:not(.inview) &
		input, textarea
			transform translate(0,100%)
		button
			max-width 0px
			pad(0,0)
	button
		background $blk
		font-smoothing()
		+above($tablet)
			position absolute
			right 0
		margin 0
		align-items center
		background $blk
		border 0
		color $w
		display flex
		pad(.25,.5)
		// padding 0.5rem 1rem
		letter-spacing (0.1 / 14) * 1em
		line-height $let * 1.125em
		flex-grow 0
		// margin-left 1em
		overflow hidden
		max-width 600px
		transition max-width 0.75s, padding-left 0.5s, padding-right 0.5s

		&.success
			opacity 0.5
			pointer-events none

		+below($tablet)
			mgn(1.5,auto,0)

		span
			pad(0,.5,0,0)
			margin auto
			margin-left 0

		&:hover, &:focus
			background $copy

		&:active
			// background $blk

	.errorMessage
		color #ff0000
		transition opacity 1s $easeOutCubic

		&.v-enter, &.v-leave-to
			opacity 0

		&.success
			color #00ff00;

		+above($tablet)
			position absolute
			top 10rem
			right 0

.spinner
	position absolute
	right 10rem
	margin-top -2px
	width 50px
	height 50px
	animation 1s infinite linear rotate
	transition opacity 1s $easeOutCubic

	+below($tablet)
		right auto
		margin-top 0.5rem

	&.v-enter, &.v-leave-to
		opacity 0

	&.v-leave-active
		transition-delay 0.3s

	svg
		width 50px
		height 50px
		path
			stroke-width 5
			stroke #3360d9
			stroke-linecap round
			fill none

@keyframes rotate
	0%
		transform rotate(0deg)
	100%
		transform rotate(360deg)

</style>
