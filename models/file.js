module.exports = function(sequelize, DataTypes){
	var File = sequelize.define("File", {
		name: {
			type: DataTypes.STRING,
			allowNull: false
		},
		path: {
			type: DataTypes.STRING,
			allowNull: false
		},
		file_type: {
			type: DataTypes.STRING,
		},
		claim_id: {
			type: DataTypes.STRING,
			allowNull: false
		},
		outpoint: {
			type: DataTypes.STRING,
			allowNull: false
		},
		nsfw: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
			defaultValue: false
		}
	}, {
		freezeTableName: true
	});
	return File;
}