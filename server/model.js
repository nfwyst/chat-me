const mongoose = require("mongoose");
const DBURL = 'mongodb://localhost:27017/app';
mongoose.connect(DBURL, { useNewUrlParser: true });

const models = {
  user: {
    user: { type: String, required: true, },
    pwd: { type: String, required: true, },
    type: { type: String, required: true, },
    avatar: { type: String },
    desc: { type: String },
    title: { type: String },
    company: { type: String },
    money: { type: String }
  },
  chat: {
    chatid: {type: String, required: true},
    from: {type: String, required: true},
    to: {type: String, required: true},
    read: {type: Boolean, default: false},
    content: {type: String, required: true},
    create_time: {type: Number, default: new Date().getTime() }
  }
}

for(let [k, v] of Object.entries(models)) {
  mongoose.model(k, v);
}

module.exports = {
  getModel(name) {
    return mongoose.model(name);
  }
}
