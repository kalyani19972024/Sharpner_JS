
const { GroupMember } = require('../models/GroupMember');

// Ensures the requester is an active member. Optionally enforce role.
function mustBeMember(roleRequired) {

  return async (req, res, next) => {
    
    const groupId = +req.params.groupId;
    if (!groupId) return res.status(400).json({ error: 'groupId required' });
    const gm = await GroupMember.findOne({ where: { group_id: groupId, user_id: req.user.id, status: 'active' } });
    if (!gm) return res.status(403).json({ error: 'Not a group member' });
    if (roleRequired) {
      const order = { owner: 3, admin: 2, member: 1 };
      if (order[gm.role] < order[roleRequired]) return res.status(403).json({ error: 'Insufficient role' });
    }
    req.membership = gm;
    next();
  };
}

module.exports = { mustBeMember };