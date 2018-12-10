var Airtable = require('airtable');

export default {
	data() {
		const apiKey = 'key8E8wSxgLapJ0Vs';
		const baseKey = 'appYCYsZJkUhB2GAY';
		const base = new Airtable({ apiKey: apiKey }).base(baseKey);

		return {
			apiKey,
			base,
			moduleIDs: [],
			modules: []
		};
	},

	created() {
		let _that = this; // eslint-disable-line consistent-this

		this.base('Pages').select({
		}).eachPage(function page(records, fetchNextPage) {

			records.forEach((record) => {
				if (record.get('Name') === _that.name) {
					_that.moduleIDs = record.get('Modules');
				}
			});

			fetchNextPage();

		}, function done(err) {
			if (err) { console.error(err); return; } // eslint-disable-line no-console

			_that.moduleIDs.reverse();

			_that.$nextTick(() => {
				if (_that.moduleIDs.length) {
					for (let m = 0; m < _that.moduleIDs.length; m++) {
						_that.base('Modules').find(_that.moduleIDs[m], (deepErr, record) => {
							if (deepErr) { console.error(deepErr); return; } // eslint-disable-line no-console
							_that.modules.push({
								component: record.get('Component'),
								heading: record.get('Heading'),
								subheading: record.get('Subheading'),
								copy: record.get('Copy'),
								image: record.get('Image'),
								notes: record.get('Notes')
							});
						});
					}
				}
			});
		});
	}
};
