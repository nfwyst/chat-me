const express = require('express');
const Router = express.Router();
const  { getModel } = require('./model');
const utils = require('utility');
const filters = { pwd: 0, __v: 0 };

function md5Pwd(pwd) {
  const salt = '&)(*%QQ)jfaljoqjasln=/][~~!';
  return utils.md5(utils.md5(`${pwd}${salt}`))
}

Router.get('/list', async (req, res) => {
  const { type } = req.query;
  try {
    const result = await getModel('user').find({type});
    return res.json({
      code: 0,
      data: result,
    });
  } catch (err) {
    return res.json({
      code: 1,
      msg: err.message,
    });
  }
});

Router.get('/msglist', async (req, res) => {
  const { userid } = req.cookies;
  let users = null;
  if (!userid) {
    return res.json({code: 1, msg: 'user is not logined'});
  }
  try {
    users  = await getModel('user').find({});
    users = users.map(item => ({
      [item._id]:{name: item.user, avatar: item.avatar},
    })).reduce((cur, nex) => {
      return {...cur, ...nex}
    }, {});
  } catch (err) {
    return res.json({code: 1, msg: err.message});
  }
  try {
    let result = await getModel('chat').find({$or: [{from: userid} , {to: userid}]});
    if (result) {
      return res.json({code: 0, msgs: result, users});
    } else {
      return res.json({code: 1, msg: 'cant get msgs for current user'});
    }
  } catch (err) {
    return res.json({code: 1, msg: err.message});
  }
});

Router.post('/readed', async (req, res) => {
  const userid = req.cookies.userid;
  if (!userid) {
    return res.json({
      code: 1,
      msg: 'user is not logined'
    });
  }
  let result = null;
  try {
    result = await getModel('chat').updateMany({from: req.body.from, to: userid}, { read: true });
    return res.json({
      code: 0
    });
  } catch (err) {
    return res.json({
      code: 1,
      msg: err.message
    });
  }
});

Router.post('/update', async (req, res) => {
  const userid = req.cookies.userid;
  if (!userid) {
    return res.json({code: 1, msg: 'user is not logined'});
  }
  let result = null;
  try {
    result = await getModel('user').findByIdAndUpdate(userid, req.body);
    if (result) {
      return res.json({
        code: 0,
        data: {
          user: result.user,
          type: result.type,
          ...req.body,
        }
      });
    } else {
      return res.json({
        code: 1,
        msg: '用户不存在',
      });
    }
  } catch (err) {
    return res.json({
      code: 1,
      msg: err.message
    });
  }
});

Router.post('/login', async (req, res) => {
  const { user, pwd } = req.body;
  try {
    const result = await getModel('user').findOne({ user, pwd: md5Pwd(pwd) }, filters);
    if(result) {
      res.cookie('userid', result._id);
      return res.json({
        code: 0,
        data: result
      });
    } else {
      return res.json({
        code: 1,
        msg: '用户名或密码错误',
      });
    }
  } catch (err) {
    return res.json({
      code: 0,
      msg: err.message,
    });
  }
});

Router.post('/register', async (req, res) => {
  const { user, pwd, type } = req.body;
  try {
    let result = await getModel('user').findOne({ user });
    if (result) {
      return res.json({
        code: 1,
        msg: '用户名重复',
      });
    } else {
      const Schema = getModel('user');
      const userModel = new Schema({
        user, pwd: md5Pwd(pwd), type
      });
      userModel.save((err, data) => {
        if(err) {
          return res.json({
            code: 1,
            msg: err.message ? err.message : err,
          });
        } else {
          const { user, type, _id } = data;
          res.cookie('userid', _id);
          return res.json({
            code: 0,
            data: {
              user, type, _id
            }
          });
        }
      });
    }
  } catch (err) {
    return res.json({
      code: 1,
      msg: err.message,
    });
  }
});

Router.get('/info', async (req, res) => {
  const { userid } = req.cookies;
  if (!userid) {
    return res.json({
      code: 1
    });
  } else {
    let result = null;
    try {
      let result = await getModel('user').findOne({_id: userid}, filters);
      if(result) {
        return res.json({
          code: 0,
          data: result,
        });
      } else {
        return res.json({
          code: 1,
          msg: '获取用户信息失败'
        });
      }
    } catch (err) {
      return res.json({
        code: 1,
        msg: err.message,
      });
    }
  }
});

module.exports = Router;
