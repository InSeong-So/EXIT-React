module.export = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    }
  }, {
    charset: 'utf8mb4', // 이모티콘까지 허용
    collate: 'utf8mb4_general_ci'
  });
  Comment.associate = (db) = {};
  return Comment;
}