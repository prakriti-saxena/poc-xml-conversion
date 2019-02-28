import Listing from '../models/Listing';
import js2xmlparser from 'js2xmlparser';
import fs from 'fs';

const DEFAULT_PAGE_NUMBER = 1;
const DEFAULT_PAGE_SIZE = 10;
const FORMATS = {
	XML: 'xml',
	JSON: 'json',
	CSV: 'csv',
};

const DEFAULT_FORMAT = FORMATS.XML;

const prepareJSON = ({ req, res, totalNoOfRecords, totalNoOfPages, pageSize, pageNumber, data }) => {

};

const prepareXML = ({ req, res, totalNoOfRecords, totalNoOfPages, pageSize, pageNumber, data }) => {
	const fullUrl = req.protocol + '://' + req.get('host');
	pageNumber = +pageNumber; // string to number parse

	const response = {
		meta: {
			pages: totalNoOfPages,
			noOfRecords: totalNoOfRecords,
		},
		links: {
			self: `${fullUrl}/listings?pageNumber=${pageNumber}&pageSize=${pageSize}`,
			prev: pageNumber === 1 ? null : `${fullUrl}/listings?pageNumber=${pageNumber-1}&pageSize=${pageSize}`,
			next: pageNumber === totalNoOfPages ? null : `${fullUrl}/listings?pageNumber=${pageNumber+1}&pageSize=${pageSize}`,
			first: `${fullUrl}/listings?pageNumber=1&pageSize=${pageSize}`,
			last: `${fullUrl}/listings?pageNumber=${totalNoOfPages}&pageSize=${pageSize}`,
		},
		Listing: data,
	};

	res.set('Content-Type', 'text/xml');
	res.send(js2xmlparser.parse("Listings", response));
};

const getListings = (req, res) => {
	const {
		pageNumber = DEFAULT_PAGE_NUMBER,
		pageSize = DEFAULT_PAGE_SIZE,
		format = DEFAULT_FORMAT,
	} = req.query;

	console.log('Request parameters- pageNumber, pageSize, format: ', pageNumber, pageSize, format);

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

				if (format === FORMATS.JSON) {
					return prepareJSON({
						req,
						res,
						totalNoOfRecords,
						totalNoOfPages,
						pageSize,
						pageNumber,
						data: obj,
					});
				} else if (format === FORMATS.XML) {
					return prepareXML({
						req,
						res,
						totalNoOfRecords,
						totalNoOfPages,
						pageSize,
						pageNumber,
						data: obj,
					});
				}

				return res.send([]);
			});
	});


};

export default {
	getListings,
};
