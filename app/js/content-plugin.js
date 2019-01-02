
const CMS_ADAPTER = __CMS_ADAPTER; // eslint-disable-line no-undef

const cms = require(`./adapter-${CMS_ADAPTER}.js`).default;
let adapter = new cms.CMSAdapter();

const ContentPlugin = {
	init(vue) {
		ContentPlugin.vue = vue;
	},
	preload() {
		return new Promise((resolve) => {
			adapter.init().then(() => resolve());
		});
	}
};

ContentPlugin.install = (Vue) => {

	Vue.component('NoSlice', () => import('../components/slices/NoSlice.vue'));
	Vue.component('PageHeader', () => import('../components/slices/Header.vue'));
	Vue.component('Accordion', () => import('../components/slices/Accordion.vue'));
	Vue.component('ArticleCopy', () => import('../components/slices/ArticleCopy.vue'));
	Vue.component('BoxLinks', () => import('../components/slices/BoxLinks.vue'));
	Vue.component('Calendar', () => import('../components/slices/Calendar.vue'));
	Vue.component('ContentPush', () => import('../components/slices/ContentPush.vue'));
	Vue.component('DifferencePoster', () => import('../components/slices/DifferencePoster.vue'));
	Vue.component('EnvoyDifference', () => import('../components/slices/EnvoyDifference.vue'));
	Vue.component('Gallery', () => import('../components/slices/Gallery.vue'));
	Vue.component('Heritage', () => import('../components/slices/Heritage.vue'));
	Vue.component('Hero', () => import('../components/slices/Hero.vue'));
	Vue.component('HeroCopy', () => import('../components/slices/HeroCopy.vue'));
	Vue.component('ImageCopy', () => import('../components/slices/ImageCopy.vue'));
	Vue.component('ImageCopyFeature', () => import('../components/slices/ImageCopyFeature.vue'));
	Vue.component('PropertyHero', () => import('../components/slices/PropertyHero.vue'));
	Vue.component('Map', () => import('../components/slices/Map.vue'));
	Vue.component('NewsletterCta', () => import('../components/slices/NewsletterCta.vue'));
	Vue.component('QuoteCarousel', () => import('../components/slices/QuoteCarousel.vue'));
	Vue.component('RolloverGallery', () => import('../components/slices/RolloverGallery.vue'));
	Vue.component('PageFooter', () => import('../components/slices/Footer.vue'));
	Vue.component('Resource', () => import('../components/slices/Resource.vue'));
	Vue.component('TwoColumnCopy', () => import('../components/slices/TwoColumnCopy.vue'));


	Vue.prototype.getContent = function() { // eslint-disable-line func-names

		this.$contentPlugin = ContentPlugin;
		this.$cms = adapter;

	};

	Vue.mixin({ beforeCreate: Vue.prototype.getContent });

};

export default ContentPlugin;
