import { install } from 'resize-observer';

if (!window.ResizeObserver) { install(); }

const events = [ 'mousewheel', 'DOMMouseScroll', 'wheel', 'MozMousePixelScroll', 'touchstart', 'touchmove' ];

import raf from './global-raf.js';

class LerpScroll {
	constructor(el, cb) {

		this.outer = el;
		this.el = this.outer.querySelector(':first-child');

		this.native = false;
		this.lerpFactor = 10;

		if (this.native) {
			this.outer.style.overflow = 'auto';
		} else {
			this.outer.style.overflow = 'hidden';
			this.el.style.transform = 'translate3d(0, 0, 0)';
		}

		this.pos = 0;
		this.target = 0;
		this.when = 0;
		this.max = 0;
		this.tick = false;

		this.doScroll = this.doScroll.bind(this);
		this.update = this.update.bind(this);
		this.onWheel = this.onWheel.bind(this);
		this.onMouseWheel = this.onMouseWheel.bind(this);
		this.touchMove = this.touchMove.bind(this);
		this.touchStart = this.touchStart.bind(this);
		this.cb = cb;

		requestAnimationFrame(() => {
			this.resize();
			this.init();
		});
	}

	init() {
		events.forEach((e) => this.outer.addEventListener(e, this.doScroll));

		this.observer = new ResizeObserver(() => this.resize());
		this.observer.observe(this.outer);
		this.observer.observe(this.el);

		raf.add(this.update);
	}

	destroy() {
		events.forEach((e) => this.outer.removeEventListener(e, this.doScroll));
		this.observer.unobserve(this.outer);
	}

	isFirefox() {
		return /firefox/.test(navigator.userAgent.toLowerCase());
	}

	resize() {
		this.max = -(this.el.clientHeight - this.outer.getBoundingClientRect().height);
		this.target = Math.min(0, Math.max(this.max, this.target));
	}

	scrollToTop(immediate = false) {
		this.target = 0;
		if (immediate) {
			this.pos = 0;
		}
	}

	doScroll(e) {
		if (e.type !== 'touchstart') {
			e.preventDefault();
		}
		this.event = e;
		this.when = performance.now();

		({
			wheel: this.onWheel,
			mousewheel: this.onMouseWheel,
			touchmove: this.touchMove,
			touchstart: this.touchStart
		}[e.type] || (() => console.log(`No handler for event type ${e.type}`)))(); // eslint-disable=line no-console

		if (!this.tick) {
			requestAnimationFrame(this.update);
		}
	}

	update() {

		let dist = this.target - this.pos;
		this.pos += dist / this.lerpFactor;

		if (this.native) {
			this.outer.scrollTop = -this.pos;
		} else {
			this.el.style.transform = `translate3d(0, ${this.pos}px, 0)`;
		}

		if (this.cb) {
			this.cb({ pos: this.pos, source: this, pct: this.pos / this.max });
		}

		this.tick = Math.abs(this.target - this.pos) > 0.1;

	}

	onWheel() {
		let e = this.event;
		var t = e.wheelDeltaY || -1 * e.deltaY;

		if (this.isFirefox() && 1 === e.deltaMode) {
			t *= 60;
		}
		t *= 0.556;

		this.target += t;

		this.target = Math.min(0, Math.max(this.max, this.target));
	}

	onMouseWheel() {
		let e = this.event;
		var t = e.wheelDeltaY ? e.wheelDeltaY : e.wheelDelta;
		this.setDelta(t);

		this.target += t;
		this.target = Math.min(0, Math.max(this.max, this.target));
	}

	touchStart() {
		this.prevMove = this.target;
		this.start = this.event.targetTouches[0].pageY;
	}

	touchMove() {
		this.target = 2 * (this.event.targetTouches[0].pageY - this.start) + this.prevMove;
		this.target = Math.min(0, Math.max(this.max, this.target));
	}
}

export default LerpScroll;
