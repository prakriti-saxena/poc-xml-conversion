import Listing from '../models/Listing';
import js2xmlparser from 'js2xmlparser';
import fs from 'fs';

const getListings = (req, res) => {
	Listing.findAll({ limit: 10 }).then((data) => {
		const obj = JSON.parse(JSON.stringify(data));
		const xml = js2xmlparser.parse("Tours", { "Tour": obj });
		console.log(xml);

		fs.writeFile("data.xml", xml, function(err) {
			if(err) {
				return console.log(err);
			}

			console.log("The file was saved!");
		});

		return res.send(xml);
	});
};

export default {
	getListings,
};
