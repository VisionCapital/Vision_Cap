import Prismic from 'prismic-javascript';
import PrismicDOM from 'prismic-dom';

const CMS_CONFIG = __CMS_CONFIG; // eslint-disable-line no-undef

class CMSModule {

	constructor(module) {
		this.component = this.componentName(module.slice_type);
		this.fields = this.mapFields(module);
		this.items = module.items;
	}

	text(field) {
		return PrismicDOM.RichText.asText(this.fields[field]);
	}

	textField(field) {
		return PrismicDOM.RichText.asText(field);
	}

	html(field) {
		return PrismicDOM.RichText.asHtml(this.fields[field]);
	}

	htmlField(field) {
		return PrismicDOM.RichText.asHtml(field);
	}

	image(field) {
		let im = this.fields[field];
		return im.url;
	}

	mapFields(obj) {
		return Object.keys(obj.primary).reduce((acc, f) => {
			acc[f.toLowerCase()] = obj.primary[f];
			return acc;
		}, {});
	}

	componentName(slice) {
		return slice.replace(/^.|_./g, (x) => x[x.length - 1].toUpperCase());
	}
}

class CMSRecord {

	constructor(item) {
		this.item = item;
		this.modules = item.data.body.map((x) => new CMSModule(x));
	}

	getModules() {
		return this.modules;
	}

}

class CMSAdapter {

	async init() {
		this.prismic = await Prismic.api(CMS_CONFIG.repo);

		let docs = await this.prismic.query(
			Prismic.Predicates.at('document.type', 'page')
		);

		this.records = docs.results.map((d) => new CMSRecord(d));

		let mutualFund = await this.prismic.query(
			Prismic.Predicates.at('document.type', 'mutual_funds')
		);

		this.funds = mutualFund.results[0];

	}

	loadTags(tag) {
		return this.prismic.query(
			Prismic.Predicates.at('document.tags', [ tag ])
		);
	}

	htmlField(field) {
		return PrismicDOM.RichText.asHtml(field);
	}

	textField(field) {
		return PrismicDOM.RichText.asText(field);
	}

	findRecord(slug) {
		return this.records.find((r) => r.item.uid === slug);
	}

}

export default { CMSAdapter, CMSRecord };
