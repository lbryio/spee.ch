module.exports = function(sequelize, DataTypes){
    var File = sequelize.define("File", {
    	name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        path: {
            type: DataTypes.STRING
        },
        file_type: {
            type: DataTypes.STRING
        },
        claim_id: {
            type: DataTypes.STRING
        },
        nsfw: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    }, {
		freezeTableName: true
	});
    return File;
}