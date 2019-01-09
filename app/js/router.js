import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const router = new VueRouter({
	base: '/',
	mode: 'history',
	routes: [
		{
			path: '/',
			component: () => import('../components/UI.vue'),
			children: [
				{
					path: '',
					name: 'home',
					props: { slug: 'home' },
					component: () => import('../components/pages/Page.vue')
				},
				{
					path: ':slug',
					name: 'page',
					props: true,
					component: () => import('../components/pages/Page.vue')
				}
			]
		}
	]
});

export default router;
