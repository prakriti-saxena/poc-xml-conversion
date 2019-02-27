import dbConnection from "../dbConnection";
import Sequelize from "sequelize";

const Listing = dbConnection.define('Tour', {
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
}, { freezeTableName: true, timestamps: false });

export default Listing;
