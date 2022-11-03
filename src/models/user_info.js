module.exports = (sequelize, DataTypes) =>{
    var user_info = sequelize.define('user_info',{
        name:{
            type: DataTypes.STRING(100),
            allowNull: false,
            primaryKey: true
        },
        seq:{
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        address:{
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        user_id:{
            type: DataTypes.STRING(100),
            allowNull: false,
        }
    },{
        timestamps: false
    });

    user_info.associate = (models) => {
         user_info.belongsTo(models.user, {
            foreignKey: "user_id", 
            sourceKey: "id",
        });
    };

    return user_info;
};