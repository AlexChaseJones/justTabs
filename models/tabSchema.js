var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var tabSchema = new Schema({
	href: {
		type: String,
		trim: true,
		required: 'href is Required'
	},
	song: {
		type: String,
		trim: true,
		required: 'song is Required'
	},
	artist: {
		type: String,
		trim: true,
		required: 'artist is Required'
	},
	type: {
		type: String,
		trim: true,
		required: 'type is Required'
	},
	rating_val: {
		type: Number,
		default: 1
	},
	rating_count: {
		type: Number,
		default: 0,
	},
	rating_text: {
		type: String,
		default: "No ratings"
	},
	tab: {
		type: String,
		required: 'tab is Required'
	},
	comments: {
		type:  [Schema.Types.Mixed],
	},
	total_comments: {
		type: Number,
		default: 0
	}
})

var Tabs = mongoose.model('Tabs', tabSchema);
module.exports = Tabs;