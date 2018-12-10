const Airtable = require('airtable');
const CMS_CONFIG = __CMS_CONFIG; // eslint-disable-line no-undef

class CMSRecord {

	constructor(item, modules) {


		this.id = item.id;
		this.fields = this.mapFields(item);

		this.modules = this.fields.modules.reverse().map((x) => {
			return this.mapFields(modules.find((m) => m.id === x));
		});

	}

	get(id) {
		return this.fields[id];
	}

	getModules() {
		return this.modules;
	}

	mapFields(obj) {
		return Object.keys(obj.fields).reduce((acc, f) => {
			acc[f.toLowerCase()] = obj.get(f);
			return acc;
		}, {});
	}

}

class CMSAdapter {

	async init() {

		this.base = new Airtable({
			apiKey: CMS_CONFIG.apiKey
		}).base(CMS_CONFIG.baseKey);

		this.records = [];
		let modules = [];

		await this.base('Modules').select().eachPage((records, nextPage) => {

			modules.push(...records);
			nextPage();

		});

		await this.base('Pages').select().eachPage((records, nextPage) => {

			this.records.push(...records.map((r) => new CMSRecord(r, modules)));
			nextPage();

		});

	}

}

export default { CMSAdapter, CMSRecord };
