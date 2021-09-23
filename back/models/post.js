module.export = (sequelize, DataTypes) => {
  const Post = sequelize.define('Post', {
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    }
  }, {
    charset: 'utf8mb4', // 이모티콘까지 허용
    collate: 'utf8mb4_general_ci'
  });
  Post.associate = (db) = {};
  return Post;
}