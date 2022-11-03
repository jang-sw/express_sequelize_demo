module.exports = (sequelize, DataTypes) =>{
    var content = sequelize.define('content',{
        seq:{
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        title:{
            type: DataTypes.STRING,
            allowNull: false
        },
        content:{
            type: DataTypes.STRING,
            allowNull: false
        },
        user_id:{
            type: DataTypes.STRING,
            allowNull: false
        }
    },{
        timestamps: false
    });

    content.associate = (models) => {
        content.belongsTo(models.user, {
            foreignKey: "user_id", 
            sourceKey: "id",
        });
    };
    return content;
};