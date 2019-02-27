import Listing from '../models/Listing';
import js2xmlparser from 'js2xmlparser';
import fs from 'fs';

const DEFAULT_PAGE_NUMBER = 1;
const DEFAULT_PAGE_SIZE = 10;

const getListings = (req, res) => {
	const { pageNumber = DEFAULT_PAGE_NUMBER, pageSize = DEFAULT_PAGE_SIZE } = req.query;

	console.log('Request parameters- pageNumber, pageSize: ', pageNumber, pageSize);

	let totalNoOfRecords = 0;
	let totalNoOfPages = 0;

	Listing.count().then((c) => {
		console.log('Fetching number of records...', c);
		totalNoOfRecords = c;
		totalNoOfPages = Math.ceil(totalNoOfRecords/(pageSize));

		const limit = +pageSize;
		const offset = (+pageNumber - 1) * limit;

			Listing.findAll({ limit, offset }).then((data) => {
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

			// todo prepare JSON API like format
			//self---> baseUrl?pageNumber=pageNumber&pageSize=pageSize
		// prev=> baseUrl?pageNumber=pageNumber-1&pageSize=pageSize
		//next=> baseUrl?pageNumber=pageNumber+1&pageSize=pageSize
		//first=> baseUrl?pageNumber=1&pageSize=pageSize
		//last=> baseUrl?pageNumber=totalNoOfPages&pageSize=pageSize
	});


};

export default {
	getListings,
};
