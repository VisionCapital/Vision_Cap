class GlobalRAF {

	constructor() {
		this.init();
	}

	init() {
		if (this.inited) {
			return;
		}

		this.inited = true;
		this.stopped = true;
		this.callbacks = [];
		this.tick = this.tick.bind(this);
	}

	start() {
		this.stopped = false;
		this.now = performance.now();
		this.tick();
	}

	stop() {
		this.stopped = true;
	}

	tick() {
		if (this.stopped) {
			return;
		}

		let now = performance.now();

		let d = now - this.now;
		this.callbacks.forEach((f) => f(d));
		this.now = now;

		requestAnimationFrame(this.tick);

	}

	add(f) {
		this.callbacks.push(f);

		if (this.stopped) {
			this.start();
		}
	}

	remove(f) {
		this.callbacks = this.callbacks.filter((x) => x !== f);
	}

}

let ret = new GlobalRAF();

export default ret;
