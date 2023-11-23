<template>
  <div class="hero">
    <div class="wrap">
      <div class="copy" v-if="data && data.fields">
        <div class="hero-image" v-if="data.fields.image.url">
          <img :src="data.fields.image.url" />
        </div>
        <div class="radio-buttons-wrapper">
        <h1 v-if="data.fields.title1.length" v-html="$cms.textField(data.fields.title1)" style="text-align: center"></h1>
        <div v-if="data.fields.paragraph.length" v-html="$cms.htmlField(data.fields.paragraph)" style="text-align: justify"></div>
        
       
        <!-- Investor Accreditations -->
      
        <div class="radio-buttons">
          <input type="radio" id="box1" v-model="selectedBox" value="1" @change="handleRadioButtonChange(1)" />
          <label for="box1" class="radio-label">
            I am a Canadian resident and qualify as an "Accredited Investor" 
            under National Instrument 45-106 Prospectus Exemptions. I understand the 
            definition of an "Accredited Investor" and have obtained the necessary legal
            counsel and advice to make this representation and warranty; or,
          </label>

          <input type="radio" id="box2" v-model="selectedBox" value="2" @change="handleRadioButtonChange(2)" />
          <label for="box2" class="radio-label">
            I am a U.S. resident and meet the specific criteria and qualifications
            of an “Accredited Investor” under Rule 501 of Regulation D under the U.S. 
            Securities Act of 1933 and/or a "Qualified Purchaser" as defined in Section 
            2(a)(51) of the Investment Company Act of 1940. I understand the definition 
            of an “Accredited Investor” and/or a “Qualified Purchaser” and have obtained 
            the necessary legal counsel and advice to make this representation and warranty; or,
          </label>

          <input type="radio" id="box3" v-model="selectedBox" value="3" @change="handleRadioButtonChange(3)" />
          <label for="box3" class="radio-label">
            I am neither a Canadian resident nor a U.S. resident. I am requesting access
            pursuant to an applicable exemption from prospectus, registration, or similar
            requirements under the applicable laws of my jurisdiction of residence, or
            I am permitted to make such request without relying on an exemption. I 
            understand the requirements and have obtained the necessary legal counsel
            and advice to make this representation and warranty; or,
          </label>

          <input type="radio" id="box4" v-model="selectedBox" value="4" @change="handleRadioButtonChange(4)" />
          <label for="box4" class="radio-label">
            I do not meet any of the above conditions and will 
            not access this section of the Website.
          </label>
        </div>
      </div>
    </div>
    </div>

    <div class="accept-button-wrapper">
  <button class="accept-button" @click="handleButtonClick">
    <span v-html="$cms.textField(data.fields.button_name)"></span>
  </button>
</div>
  </div>
</template>



<script>
import airprops from '../../mixins/airprops';

export default {
	mixins: [ airprops ],

	data() {
		return {
			selectedBox: null
		};
	},

	mounted() {
		// Check if the user has already answered
		const hasAnswered = sessionStorage.getItem('hasAnswered');

		if (hasAnswered) {
			// If they have, do something (redirect, etc.)
			// For example, redirect to the private funds page
			this.$router.push('/private-funds/');
		}
	},

	methods: {
		handleButtonClick() {
			if (this.selectedBox !== null) {
				// Determine the route based on selectedBox value
				let route = '/';
				if (this.selectedBox === 4) {
					route = '/';
				} else {
					route = '/private-funds/';
					// Save the fact that the user has answered
					sessionStorage.setItem('hasAnswered', 'true');
				}
				// Navigate to the determined route
				this.$router.push(route);
			}
			// If no option is selected, do nothing (prevent navigation)
		},

		handleRadioButtonChange(value) {
			this.selectedBox = value;
		}
	}
};
</script>


  
<style lang="stylus" scoped>
@import "../../styl/_variables";

.hero
  @extend $slice
  background-color #001f54
  background-size: cover;
  pad(2, 0, 1) /* Adjust padding */

  +above($notebook)
    pad(4, 0, 2)

.wrap
  color $w
  position relative

/deep/ h1
  color $blue
  fs(55)
  mgn(1, 0, 1)

  +below($tablet)
    fs(36) /* Adjust font size */
    line-height (40 / 36)

    transition line-height 0.5s, opacity 0.5s
    transition-delay 0.5s

  .v-enter &
    line-height 1.5
    opacity 0

/deep/ p
  max-width fit-content
  fs(14); /* Adjust font size */
  font-smoothing();
  margin 0;
  color $b
  line-height 1.8 /* Adjust line height */

  +below($tablet)
    fs(14)
    line-height (24 / 12)

    transition opacity 0.5s
    transition-delay 0.5s

  .v-enter &
    opacity 0

.hero-image
  pad(1, 0) /* Adjust padding */

/deep/ img
  mgn(0, auto)

  +above($notebook)
    pad(1, 5)

.accept-button 
  background $w
  padding 10px 20px /* Adjust padding */
  margin-top 10px /* Adjust margin-top */
  text-decoration none
  display inline-block
  cursor pointer
  transition none
  font-size: 14px /* Adjust font size */
  font-weight: 600 /* Adjust font weight */
.accept-button-wrapper
  text-align center

.body-paragraphs
  overflow hidden
  background-color rgba(255, 255, 255, 0.8);
  color $b
  margin-top 10px /* Adjust margin-top */
  border-radius 10px;

.radio-buttons
  margin-top 10px; /* Adjust margin-top */

.radio-buttons-wrapper
  background-color #fff
  border-radius 10px
  border 10px solid rgba(255, 255, 241, 0.95)
  padding 10px; /* Add a semicolon here */
  box-shadow 0 0 10px rgba(255, 255, 241, 0.5)
  margin-top 10px


.radio-buttons input[type="radio"]
  display none
  color $w

.radio-buttons input[type="radio"] + .radio-label:before
  content ''
  display inline-block
  width 16px /* Adjust width */
  height 16px /* Adjust height */
  border 2px solid #333
  background-color rgba(255, 255, 255, 0.8);
  vertical-align middle
  margin-right 5px
  border-radius 50%
  font-size 0.8rem /* Adjust font size */

.radio-buttons input[type="radio"]:checked + .radio-label:before
  content '✓'
  text-align center
  justify-content center
  font-weight bold
  background-color: #333
  color: $w

.radio-buttons label 
    font-size: 14px; /* Adjust font size */
    text-align: justify
    color: $b
</style>

