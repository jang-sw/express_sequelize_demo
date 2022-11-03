module.exports = (sequelize, DataTypes) =>{
    var user = sequelize.define('user',{
       id:{
            type: DataTypes.STRING(100),
            allowNull: false,
            primaryKey: true
       },
       pwd:{
           type: DataTypes.STRING(100),
           allowNull: false,
       }
    },{
        timestamps: false
    });
    user.associate = (models) => {
        user.hasOne(models.user_info,  {foreignKey: "user_id", sourceKey: 'id'})
        user.hasMany(models.content,  {foreignKey: "user_id", sourceKey: 'id'})
    }

    return user;
};