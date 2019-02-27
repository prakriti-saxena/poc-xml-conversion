import Sequelize from 'sequelize';

// uncomment for local project to connect to remote database via ssh tunnel
let dbConnection = new Sequelize('My_Tour_Buddy', 'engineer', 'YellowPaper2019', {
	host: '127.0.0.1',
	port: 4242,
	dialect: 'mysql',
	dialectOptions: {
		requestTimeout: 0,
	},
});

//
// let sequelize = new Sequelize('My_Tour_Buddy', 'engineer', 'YellowPaper2019', {
// 	host: 'dev-1.cfsei9jqvwga.us-west-2.rds.amazonaws.com',
// 	port: 3306,
// 	dialect: 'mysql',
// 	dialectOptions: {
// 		requestTimeout: 0,
// 	},
// });

dbConnection
	.authenticate()
	.then(() => {
		console.log('Connection has been established successfully.');
	})
	.catch(err => {
		console.error('Unable to connect to the database:', err);
	});

dbConnection.sync().then(() => console.log('All database models created successfully.'));

export default dbConnection;
