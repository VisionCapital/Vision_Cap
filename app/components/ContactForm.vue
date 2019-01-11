<template>
	<form ref="form" @submit.prevent="doSubmit()">
		<div class="left">
			<div class="form-row" v-for="(field, idx) in fields" :key="idx">
				<div class="required" v-if="field.required === 'Yes'">*</div>
				<input :id="`field-${field.key}`"
					type="text"
					:name="data.textField(field.key)"
					:placeholder="data.textField(field.placeholder)"
					:required="field.required === 'Yes'">
			</div>
		</div>
		<div class="right">
			<textarea rows="1" :placeholder="data.textField(data.fields.textarea_placeholder)"></textarea>
			<div class="form-row">
				<button id="submit" name="submit" type="submit" class="btn">
					<span v-html="data.textField(data.fields.submit_button)"/>
					<svg xmlns="http://www.w3.org/2000/svg" width="62" height="11" viewBox="0 0 62 11">
						<g fill="none" fill-rule="evenodd" stroke="#FFF" stroke-width="1.5">
							<path d="M56 10.5l5-5.0002L56 .5M61 5.5H0"/>
						</g>
					</svg>

				</button>

			</div>
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
			fields
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

@import "../styl/_variables"

input, select, textarea, button {
	color: $w;
}

option {
	background-color: #222;
}

form

	position relative
	// left 50%
	// transform translate(-50%,0)
	// width 75%
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

.required
	position absolute
	left -2em
	color $copy

form
	input, textarea
		color $w
		border 0
		border-bottom 1px solid #3360D9
		padding 0
		mgn(1,0)
		line-height 2.5em

		&:hover
			border-color $copy

		&:focus
			border-color $w

		&::placeholder
			color #9F9F9F
			color rgba($w,.37)
			+below($tablet)
				text-align center


	button
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

		span
			pad(0,.5,0,.25)

		&:hover, &:focus
			background $copy

		&:active
			// background $blk


</style>
