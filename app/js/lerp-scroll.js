import { install } from 'resize-observer';

if (!window.ResizeObserver) { install(); }

const events = [ 'mousewheel', 'DOMMouseScroll', 'wheel', 'MozMousePixelScroll', 'touchstart', 'touchmove' ];

import raf from './global-raf.js';

class LerpScroll {
	constructor(el, options) {
		let opts = Object.assign({
			native: false,
			horizontal: false,
			skew: false,
			skewMax: 10,
			lerpFactor: 20,
			startPos: 0,
			keysAndAmt: {},
			eventTarget: window,
			passive: false,
			callback: () => {},
			rawCallback: () => {},
			resizeCallback: () => {}
		}, options);

		this.keysAndAmt = opts.keysAndAmt;
		this.outer = el;
		this.el = this.outer.querySelector(':first-child');
		this.native = opts.native;
		this.horizontal = opts.horizontal;
		this.skew = opts.skew;
		this.skewMax = opts.skewMax;
		this.lerpFactor = opts.lerpFactor;
		this.eventTarget = opts.eventTarget;

		if (this.native) {

			if (this.horizontal) {
				this.outer.style['overflow-x'] = 'scroll';
				this.outer.style['overflow-y'] = 'hidden';
			} else {
				this.outer.style['overflow-x'] = 'hidden';
				this.outer.style['overflow-y'] = 'scroll';
			}

		} else {

			let xform = null;

			if (this.horizontal) {
				xform = `translate3d(${opts.startPos}px, 0, 0)`;
			} else {
				xform = `translate3d(0, ${opts.startPos}px, 0)`;
			}

			this.el.style.transform = xform;
		}

		this.pos = opts.startPos;
		this.target = opts.startPos;
		this.passive = opts.passive;
		this.when = 0;
		this.max = 0;
		this.deaf = false;
		this.tick = false;
		this.doScroll = this.doScroll.bind(this);
		this.update = this.update.bind(this);
		this.onWheel = this.onWheel.bind(this);
		this.onKey = this.onKey.bind(this);
		this.onMouseWheel = this.onMouseWheel.bind(this);
		this.touchMove = this.touchMove.bind(this);
		this.touchStart = this.touchStart.bind(this);
		this.destroy = this.destroy.bind(this);
		this.init = this.init.bind(this);
		this.resize = this.resize.bind(this);
		this.deafen = this.deafen.bind(this);
		this.listen = this.listen.bind(this);
		this.cb = opts.callback;
		this.rawCb = opts.rawCallback;
		this.resizeCb = opts.resizeCallback;

		let cb = () => {
			this.resize();
			this.init();
			raf.remove(cb);
		};

		raf.add(cb, 'lerpscroll init');
	}

	init() {
		events.forEach((e) => this.eventTarget.addEventListener(e, this.doScroll, { passive: false }));

		if (this.eventTarget === window || this.native) {
			window.addEventListener('keydown', this.doScroll);
		}

		this.observer = new ResizeObserver(() => this.resize());
		this.observer.observe(this.outer);
		this.observer.observe(this.el);

		raf.add(this.update, `lerp-scroll-${this.horizontal ? 'horiz' : 'vert'}`);
	}

	destroy() {

		// if (this.outer && this.outer.parentElement) {
		events.forEach((e) => this.eventTarget.removeEventListener(e, this.doScroll, { passive: false }));
		// }

		if (this.eventTarget === window || this.native) {
			window.removeEventListener('keydown', this.doScroll);
		}

		if (this.observer && this.outer) {
			this.observer.unobserve(this.outer);
		}

		if (this.observer && this.el) {
			this.observer.unobserve(this.el);
		}

		raf.remove(this.update);
	}

	isFirefox() {
		return /firefox/.test(navigator.userAgent.toLowerCase());
	}

	resize() {
		let viewport = 0;
		let scrollHeight = 0;

		if (this.horizontal) {
			this.max = -(this.el.clientWidth - this.outer.clientWidth);
			viewport = this.outer.clientWidth;
			scrollHeight = this.el.clientWidth;
		} else {
			this.max = -(this.el.clientHeight - this.outer.clientHeight);
			viewport = this.outer.clientHeight;
			scrollHeight = this.el.clientHeight;
		}

		this.target = Math.min(0, Math.max(this.max, this.target));
		this.pos = Math.min(0, Math.max(this.max, this.pos));

		this.resizeCb({
			viewport,
			scrollHeight
		});
	}

	scrollTo(pos, immediate = false) {
		if (this.native) {
			this.outer.scrollTop = -pos;
			return;
		}
		this.target = Math.min(0, Math.max(pos, this.max));
		if (immediate) {
			this.pos = this.target;
			this.update();
		}
	}
	scrollToTop(immediate = false) {
		this.scrollTo(0, immediate);
	}

	// eslint-disable-next-line complexity
	doScroll(e) {
		if (this.deaf) {
			return;
		}
		this.event = e;
		// this.when = performance.now();
		({
			keydown: this.onKey,
			wheel: this.onWheel,
			DOMMouseScroll: this.onWheel,
			mousewheel: this.onMouseWheel,
			touchmove: this.touchMove,
			touchstart: this.touchStart
		}[e.type] || (() => console.log(`No handler for event type ${e.type}`)))(); // eslint-disable-line no-console

		let dist = this.target - this.pos;
		let pct = this.pos / this.max;
		let dir = dist === 0 ? 0 : dist > 0 ? 1 : -1;

		if (this.rawCb && !this.deaf) {
			this.rawCb({
				raw: true,
				pos: this.pos,
				targetPct: this.target / this.max,
				pct,
				dir
			});
		}

		if (dir <= 0 && this.eventTarget !== window && pct > 0.95) {
			return;
		}

		if (dir >= 0 && this.eventTarget !== window && pct < 0.05) {
			return;
		}

		// if (!this.native && e.cancelable && ![ 'touchstart', 'touchmove', 'keydown' ].includes(e.type)) {
		//   e.preventDefault();
		//   e.stopPropagation();
		// }

		// if (!this.native && e.cancelable && e.type === 'touchmove' && !this.passive) {
		//   e.preventDefault();
		//   e.stopPropagation();
		// }

		if (!this.native && e.cancelable &&
      (![ 'touchstart', 'touchmove', 'keydown' ].includes(e.type) ||
      e.type === 'touchmove' && !this.passive && e.touches.length === 1)) {
			e.preventDefault();
			e.stopPropagation();
		}

		if (!this.tick || this.native) {
			requestAnimationFrame(this.update);
		}
	}

	update() {
		if (this.deaf) { return; }
		let dist = this.target - this.pos;

		if (this.native) {
			this.pos = -this.outer.scrollTop;
		} else {
			this.pos += dist / this.lerpFactor;

			if (Math.abs(dist) < 0.5) {
				this.pos = this.target;
				dist = 0;
			}

			// let skewAmt = 0;
			// if (this.skew) {
			//   skewAmt = Math.max(-this.skewMax, Math.min(this.skewMax, dist / 250));
			// }

			let xform = [ 0, 0, 0 ];
			// let skew = [ 0, 0 ];

			if (this.horizontal) {
				xform[0] = `${this.pos}px`;
				// skew[0] = `${skewAmt}deg`;
			} else {
				xform[1] = `${this.pos}px`;
				// skew[1] = `${skewAmt}deg`;
			}

			// if (this.native) {
			//   this.outer.scrollTop = -this.pos;
			// } else
			// if (this.skew) {
			//   this.el.style.transform = `translate3d(${xform.join(',')}) skew(${skew.join(',')})`;
			// } else {
			this.el.style.transform = `translate3d(${xform.join(',')})`;
		}

		if (this.cb && !this.deaf) {
			// this.cb({ pos: this.pos, source: this, pct: this.pos / this.max });
			this.cb({
				pos: this.pos,
				pct: this.pos / this.max,
				tick: this.tick,
				dir: dist === 0 ? 0 : dist > 0 ? 1 : -1
			});
		}

		this.tick = Math.abs(this.target - this.pos) >= 0.5;

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

	onKey() {
		let e = this.event;
		let t = e.key;
		let amt = this.keysAndAmt[t];

		if (amt) {
			this.target += amt;
			this.target = Math.min(0, Math.max(this.max, this.target));
		}
	}

	onMouseWheel() {
		let e = this.event;
		var t = e.wheelDeltaY ? e.wheelDeltaY : e.wheelDelta;
		// this.setDelta(t);

		this.target += t;
		this.target = Math.min(0, Math.max(this.max, this.target));
	}

	touchStart() {
		if (this.native) { return; }

		this.prevMove = this.target;
		if (this.horizontal) {
			this.start = this.event.targetTouches[0].pageX;
		} else {
			this.start = this.event.targetTouches[0].pageY;
		}
	}

	touchMove() {
		if (this.native) { return; }

		if (this.horizontal) {
			this.target = 2 * (this.event.targetTouches[0].pageX - this.start) + this.prevMove;
		} else {
			this.target = 2 * (this.event.targetTouches[0].pageY - this.start) + this.prevMove;
		}
		this.target = Math.min(0, Math.max(this.max, this.target));
	}

	deafen() {
		this.deaf = true;
	}
	listen() {
		this.deaf = false;
	}
}

export default LerpScroll;
