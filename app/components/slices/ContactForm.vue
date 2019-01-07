<template>
	<div class="contact-form">

		<div class="wrap">

			<div class="copy">
				<h3 v-if="heading"
					v-html="heading"/>
				<h4 v-if="subheading"
					v-html="subheading"/>
			</div>
			
			<form ref="form" @submit.prevent="doSubmit()">
				<div class="left">
					<div>
						<div class="required" v-if="isRequired">*</div>
						<input placeholder="Jeffrey Olin" type="text" :required="isRequired">
					</div>	
					<div>
						<div class="required" v-if="isRequired">*</div>
						<input placeholder="Enter your email address" type="email" :required="isRequired">
					</div>
					<div>
						<div class="required" v-if="isRequired">*</div>
						<input placeholder="Enter your phone number" type="tel" :required="false">
					</div>
				</div>
				<div class="right">
					<textarea rows="1" placeholder="Enter your message"></textarea>
					<button type="submit">
						<span v-html="'Submit'"/>
						<svg xmlns="http://www.w3.org/2000/svg" width="62" height="11" viewBox="0 0 62 11">
							<g fill="none" fill-rule="evenodd" stroke="#FFF" stroke-width="1.5">
								<path d="M56 10.5l5-5.0002L56 .5M61 5.5H0"/>
							</g>
						</svg>
					</button>
				</div>
			</form>

		</div>

	</div>
</template>

<script>

let action = 'person@persons.com';
import airprops from '../../mixins/airprops';
import axios from 'axios';

export default {
	mixins: [ airprops ],
	data() {
		return {
			isRequired: true,
			success: false,
			errors: null,
			errorMessage: null,
			action
		};
	},
	methods: {

		doSubmit() {
			this.success = false;
			this.errors = null;

			let form = this.$refs.form;
			let formData = new FormData(form);
			let request = {};
			for (let item of formData) {
				request[item[0]] = item[1];
			}

			axios.post(action, request).then((response) => {

				let data = response.data;
				if (data.status === 'ok') {
					this.success = true;
					return;
				}

				this.errorMessage = data.message;
				this.errors = data.errors;

			});
		}
	}
};
</script>

<style lang="stylus" scoped>

@import "../../styl/_variables"

.contact-form
	@extend .slice
	text-align center
	background $blue
	.wrap
		color $w
		position relative
		pad(2,0)

		/deep/ h3
			color $w
		/deep/ h4
			max-width 100%
			color $w
			opacity 0.7
			fs(26)
			+below($tablet)
				fs(20)

form

	position relative
	left 50%
	transform translate(-50%,0)
	width 75%
	+above($tablet)
		width 60%
		display flex
		justify-content space-between

.left
	+above($tablet)
		width 36%

.right 
	+above($tablet)
		width 58%

.required
	position absolute
	left -2em
	color $copy

form 
	/deep/ input, textarea
		color $w
		border 0
		border-bottom 1px solid $w
		padding 0
		mgn(1,0)
		line-height 2.5em

		&:hover
			border-color $copy

		&:focus
			border-color $blk

		&::placeholder
			color #9F9F9F
			+below($tablet)
				text-align center
			

	/deep/	button
		background $blk
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
		letter-spacing (0.1 / 14) * 1em
		line-height $let * 1.125em
		flex-grow 0
		margin-left 1em
		+below($tablet)
			mgn(1.5,auto,0)
			// margin 0 auto

		span
			pad(0,.5,0,.25)

		&:hover, &:focus
			background $copy

		&:active
			// background $blk


</style>