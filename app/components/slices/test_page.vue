<template>
    <div class="hero">
      <div class="wrap">
        <div class="copy" v-if="data && data.fields">
  
          <div class="hero-image" v-if="data.fields.image.url">
            <img :src="data.fields.image.url" />
          </div>
  
          <h1 v-if="data.fields.title1.length" v-html="$cms.textField(data.fields.title1)" />
  
          <div v-if="data.fields.paragraph.length" v-html="$cms.htmlField(data.fields.paragraph)" />
        </div>
      </div>
      <div class="body-paragraphs" v-if="data.fields.body_paragraphs.length">
        <div>
          <div v-html="isExpanded ? $cms.htmlField(data.fields.body_paragraphs) : condensedPreview" />
          <button class="show-more-button" @click="toggleExpansion">
            {{ isExpanded ? 'Read Less' : 'Read More' }}
          </button>
        </div>
      </div>
  
      <div v-if="data.fields.button_name.length">
        <router-link to="/private-funds">
          <button class="accept-button">
            <span v-html="$cms.textField(data.fields.button_name)" />
          </button>
        </router-link>
      </div>
    </div>
  </template>
  
  <script>
  import airprops from '../../mixins/airprops';
  
  export default {
  	mixins: [ airprops ],
  
  	data() {
  		return {
  			isExpanded: false
  		};
  	},
  	methods: {
  		toggleExpansion() {
  			this.isExpanded = !this.isExpanded;
  		}
  	}
  };
  </script>
  
  <style lang="stylus" scoped>
  @import "../../styl/_variables";
  
.hero
    @extend $slice
    background none
    pad(3, 0, 1)
    position relative
  
    +above($notebook)
      pad(4, 0, 2)
  
.wrap
    color $w
    position relative
  
  /deep/ h1
    color $w
    mgn(1, 0, 2)
  
    +below($tablet)
      fs(60)
      line-height (73 / 60)
  
    transition line-height 0.5s, opacity 0.5s
    transition-delay 0.5s
  
    .v-enter &
      line-height 1.5
      opacity 0
  
  /deep/ p
    fs(16)
    font-smoothing()
  
    +below($tablet)
      fs(12)
      line-height (24 / 12)
  
    transition opacity 0.5s
    transition-delay 0.5s
  
    .v-enter &
      opacity 0
  
  .hero-image
    pad(2, 0, 1)
  
    +above($tablet)
      pad(1, 3)
  
    /deep/ img
      mgn(0, auto)
  
    +above($notebook)
      pad(1, 5)
  
.accept-button
    background $w;
    padding 10px 30px
    margin-top 20px
  
  p
    font-weight bold
  
.body-paragraphs
    overflow hidden
    padding 20px 50px
    background $grey
    color $b
  
.show-more-button
.show-less-button 
    background none
    border none
    color $blue
    cursor pointer
    padding 0

</style>
  