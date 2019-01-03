<template>
  <div class="funds-info"> 
    <div class="wrap">
      
			<h3 v-html="heading"></h3>
			<div class="contact-info">
				<p v-html="subheading"></p>
				
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

<style>

</style>
