<template>
    <div class="hero">
      <div class="hero-image" v-if="data && data.fields.image.url">
        <img :src="data.image('image')" />
      </div>
  
      <h1 class="hero-title" v-if="data.fields.title1.length" 
      v-html="$cms.text(data.fields.title1)" />
  
      <router-link :to="data.fields.button_link.slug">
        <button class="accept-button">
          <span class="button-label">Accept</span>
        </button>
      </router-link>
    </div>
  
    <div class="paragraph-section">
      <div class="wrap">
        <div class="copy" v-if="data && data.fields">
          <div v-if="data.fields.paragraph.length" v-html="$cms.text(data.fields.paragraph)" />
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import airprops from '../../mixins/airprops';
  
  export default {
  	mixins: [ airprops ]
  };
  </script>
  
  <style lang="stylus" scoped>
    .hero
      background-color blue
      color white
      padding 20px
  
      .hero-image img
        max-width 100%
        height auto
  
      .hero-title
        font-size 24px
        margin-top 20px
  
      .accept-button
        background-color white
        color blue
        border none
        padding 10px 20px
        cursor pointer
  
    .paragraph-section
      background-color white
      padding 20px
  </style>
  