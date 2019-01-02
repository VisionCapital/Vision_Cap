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
					<input placeholder="Jeffrey Olin" type="text" :required="true">
					<input placeholder="Enter your email address" type="email" :required="true">
					<input placeholder="Enter your phone number" type="tel" :required="false">
				</div>
				<div class="right">
					<textarea placeholder="Enter your message"></textarea>
					<input class="submit" type="submit" placeholder="Send">
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
	methods: {
		data() {
			return {
				success: false,
				errors: null,
				errorMessage: null,
				action
			};
		},
		doSubmit() {
			this.success = false;
			this.errors = null;

			let form = this.$refs.form;
			let formData = new FormData(form);
			console.log(formData);
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

form
	display flex
	justify-content space-between
	position relative
	left 50%
	transform translate(-50%,0)
	width 50%

.left
	width 30%

.right 
	width 65%
// 	pad(5,0)
// 	position relative

.wrap
	color $w
	position relative

	/deep/ h3
		color $w
	/deep/ h4
		max-width 100%
		color $w
		opacity 0.7
		fs(26)

input, textarea
	color $w
	border 0
	border-bottom 1px solid $w
	mgn(1,0)

.submit
	border 0
	background $blk
	position absolute 
	right 0
	margin 0
// .bg
// 	height 100%
// 	left 0
// 	position absolute
// 	top 0
// 	width 100%

</style>