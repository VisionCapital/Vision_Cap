<template>
	<div class="hero">

		<div class="wrap">
			<div class="copy" v-if="data && data.fields">

				<h1 v-if="data.fields.title1.length"
					v-html="$cms.textField(data.fields.title1)"/>

				<div v-if="data.fields.paragraph.length"
					v-html="$cms.htmlField(data.fields.paragraph)"/>

			</div>
		</div>
	</div>
    
    <div class="paragraph-section">

        <p v-if="data.fields.paragraph_texts"
             v-html="$cms.htmlField(data.fields.paragraphs_texts)"/>

        <router-link :to="/private-funds/">
            <button class="accept-button">
                <span class="button-label"> Accept and Proceed </span>
            </button>             
        </router-link>
    </div>

</template>

<script>
import airprops from '../../mixins/airprops';
export default {
	mixins: [ airprops ]
};
</script>

<style lang="stylus" scoped>
@import "../../styl/_variables"
.hero
	@extend $slice
	background none
	pad(3,0,1)
	position relative
	+above($notebook)
		pad(4,0,2)
.wrap
	color $w
	position relative
	/deep/
		h1
			color $w
			// fs(82)
			mgn(1,0,2)
			+below($tablet)
				fs(60)
				line-height (73/60)
			transition line-height 0.5s, opacity 0.5s
			transition-delay 0.5s
			.v-enter &
				line-height 1.5
				opacity 0
		p
			fs(16)
			font-smoothing()
			+below($tablet)
				fs(12)
				line-height (24/12)
			transition opacity 0.5s
			transition-delay 0.5s
			.v-enter &
				opacity 0
.hero-image
	pad(2,0,1)
	+above($tablet)
		pad(1, 3)
		/deep/ img
			mgn(0,auto)
	+above($notebook)
		pad(1, 5)
.accept-button
    background $blue
    width 60px
    height 40px
    color white
    border none
    padding 10px 20px
    cursor pointer
.button-label
    font-size 16px
    font-weigth bold

.paragraph-section
    background $w
    p 
    color $grey


</style>