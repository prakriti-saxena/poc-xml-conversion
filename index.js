const Sequelize = require('sequelize');
const js2xmlparser = require('js2xmlparser');
const fs = require('fs');

let sequelize = new Sequelize('My_Tour_Buddy', 'engineer', 'YellowPaper2019', {
	host: 'dev-1.cfsei9jqvwga.us-west-2.rds.amazonaws.com',
	port: 3306,
	dialect: 'mysql'
});

sequelize
	.authenticate()
	.then(() => {
		console.log('Connection has been established successfully.');
	})
	.catch(err => {
		console.error('Unable to connect to the database:', err);
	});

const Tour = sequelize.define('Tour', {
	tour_id: {
		type: Sequelize.INTEGER.UNSIGNED,
		primaryKey: true,
	},
	tour_title: {
		type: Sequelize.STRING,
	},
	city: {
		type: Sequelize.STRING,
	},
});

Tour.sync().then(() => {
	Tour.findAll().then((data) => {
		const obj = JSON.parse(JSON.stringify(data));
		const xml = js2xmlparser.parse("Tours", { "Tour": obj });
		console.log(xml);


		fs.writeFile("data.xml", xml, function(err) {
			if(err) {
				return console.log(err);
			}

			console.log("The file was saved!");
		});
	});
});
