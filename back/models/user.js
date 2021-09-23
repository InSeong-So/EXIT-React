module.export = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: {
      type: DataTypes.STRING(30), // 데이터 타입
      allowNull: false,           // 널 허용
      unique: true,               // 키 값
    },
    nickname: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(100),
      allowNull: false
    }
  }, {
    charset: 'utf8',
    collate: 'utf8_general_ci'
  });
  User.associate = (db) = {};
  return User;
}