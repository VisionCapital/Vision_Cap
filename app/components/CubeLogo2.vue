<template>
	<div class="resize">
		<canvas ref="canvas"></canvas>
	</div>
</template>

<script>

// All properties of this object are optional

const THREE = require('three');

import Ease from '../js/ease.js';
import raf from '../js/global-raf.js';

export default {
	props: [],
	components: {},
	computed: {},
	data() {

		return {
			name: 'CubeLogo2',
			running: false,
			w: 0,
			h: 0,
			mouse: [ 0, 0 ],
			mopo: [ 0, 0 ]
		};

	},
	methods: {
		setup() {

			this.scene = new THREE.Scene();

			// this.camera = new THREE.PerspectiveCamera(45, 1, 1, 10000);

			let ar = this.$el.clientWidth / this.$el.clientHeight;

			this.camera = new THREE.OrthographicCamera(
				-ar,
				ar,
				1,
				-1,
				0.1,
				10000
			);

			this.camera.position.z = -1.6;
			this.camera.lookAt(new THREE.Vector3(0, 0, 0));

			this.mesh = new THREE.Object3D();

			let colors = [
				0x006CFF,
				0x006CFF,
				0x009EFF,
				0x0000BF,
				0x003EA6,
				0x00D7FF
			];

			for (let i = 0; i < 6; i++) {

				let opacity = 0.75;

				if (i === 1) {
					opacity = 0;
				}

				let mat = new THREE.MeshBasicMaterial({
					color: colors[i],
					opacity,
					side: THREE.DoubleSide
				});

				mat.transparent = true;

				// mat.blending = THREE.CustomBlending;
				// mat.blendEquation = THREE.AddEquation;
				// mat.blendSrc = THREE.DstAlphaSaturateFactor;
				// mat.blendDst = THREE.SrcAlphaSaturateFactor;

				let plane = new THREE.PlaneBufferGeometry(1, 1);
				let mesh = new THREE.Mesh(plane, mat);

				[
					() => {
						mesh.position.z = 0.5;
					},
					() => {
						mesh.position.z = -0.5;
					},
					() => {
						mesh.rotation.y = Math.PI * 0.5;
						mesh.position.x = 0.5;
					},
					() => {
						mesh.rotation.y = Math.PI * 0.5;
						mesh.position.x = -0.5;
					},
					() => {
						mesh.rotation.x = Math.PI * 0.5;
						mesh.position.y = -0.5;
					},
					() => {
						mesh.rotation.x = Math.PI * 0.5;
						mesh.position.y = 0.5;
					}
				][i]();

				this.mesh.add(mesh);
			}

			this.mesh.rotation.y = -Math.PI * 0.2;
			this.mesh.rotation.z = Math.PI * 0.25;
			this.scene.add(this.mesh);

		},
		update() {

			this.mouse[0] += (this.mopo[0] - this.mouse[0]) / 50;
			this.mouse[1] += (this.mopo[1] - this.mouse[1]) / 50;

			let now = performance.now() % 10000;
			now = Math.max(0, Math.min(1000, now)) / 1000;

			this.mesh.rotation.x = this.mouse[1] * Math.PI * -0.1;
			this.mesh.rotation.y = -Math.PI * 0.2 + this.mouse[0] * Math.PI * 0.1;

			this.mesh.rotation.y += Ease.easeInOutExpo(now, 0, 1, 1) * Math.PI * 2;

		},
		render() {

			this.update();
			this.renderer.render(this.scene, this.camera);

		},
		resize() {
			this.w = this.$el.clientWidth;
			this.h = this.$el.clientHeight;

			if (this.camera) {
				let ar = this.$el.clientWidth / this.$el.clientHeight;
				this.camera.left = -ar;
				this.camera.right = ar;
				this.camera.top = 1;
				this.camera.bottom = -1;

				this.camera.updateProjectionMatrix();
			}
			if (this.$store.state.device.win.x <= 1024) {
				this.w = 43;
				this.h = 43;
				this.camera.updateProjectionMatrix();
			} 

			this.$refs.canvas.width = this.w;
			this.$refs.canvas.height = this.h;

			this.renderer.setSize(this.w, this.h);

		},

		momo(e) {
			this.mopo = [
				e.clientX / window.innerWidth * 2 - 1,
				e.clientY / window.innerHeight * 2 - 1
			];
		}
	},
	created() {},
	mounted() {

		// if (!window.WebGLRenderingContext) {
		// 	return;
		// }

		this.renderer = new THREE.WebGLRenderer({
			antialias: true,
			alpha: true,
			canvas: this.$refs.canvas
		});

		this.renderer.setClearColor(0x000000, 0);
		this.renderer.setPixelRatio(window.devicePixelRatio ? window.devicePixelRatio : 1);

		this.setup();
		this.resize();

		raf.add(this.render);
		window.addEventListener('resize', this.resize);
		window.addEventListener('mousemove', this.momo);

	},
	beforeDestroy() {

		this.$root.$off('tick', this.render);
		window.removeEventListener('resize', this.resize);
		window.removeEventListener('mousemove', this.momo);

	}
};

</script>

<style lang="stylus" scoped>
@import "../styl/_variables"

div 
	position: absolute;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;


canvas 
	position: relative;
	width: 100%;
	height: 100%;
	top: 0;
	+below(1060px)
		top -12%
	+below($notebook)
		left -9%
		top 10%
		display block
		width 60%
// .resize
// 	display flex
// 	width 50%
</style>
