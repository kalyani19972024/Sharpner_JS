
const { sequelize } = require('../config/db');
const User = require('./User')(sequelize);
const Group = require('./Group')(sequelize);
const GroupMember = require('./GroupMember')(sequelize);
const GroupInvite = require('./GroupInvite')(sequelize);
const Message = require('./message')(sequelize);
const GroupReadState = require('./GroupReadState')(sequelize);

// Associations
User.hasMany(Group, { foreignKey: 'owner_id' });
Group.belongsTo(User, { as: 'owner', foreignKey: 'owner_id' });

User.belongsToMany(Group, { through: GroupMember, foreignKey: 'user_id' });
Group.belongsToMany(User, { through: GroupMember, foreignKey: 'group_id' });
GroupMember.belongsTo(Group, { foreignKey: 'group_id' });
GroupMember.belongsTo(User, { foreignKey: 'user_id' });

Group.hasMany(Message, { foreignKey: 'group_id' });
Message.belongsTo(Group, { foreignKey: 'group_id' });
Message.belongsTo(User, { foreignKey: 'user_id' });

GroupReadState.belongsTo(Group, { foreignKey: 'group_id' });
GroupReadState.belongsTo(User, { foreignKey: 'user_id' });

module.exports = {
  sequelize, User, Group, GroupMember, GroupInvite, Message, GroupReadState
};