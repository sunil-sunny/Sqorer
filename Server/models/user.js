const mongoose = require("mongoose");
const config = require("config");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken')

const UserSchema = mongoose.Schema({
  googleId: {
    type: String
  },
  firstname: {
    type: String,
    require: true
  },
  lastname: {
    type: String,
    require: true
  },
  email: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  userType: {
    type: String,
  },
  isOnline: {
    type: Boolean,
    default: false
  },
  isActive: {
    type: Boolean,
    default: true
  },
  lastLogin: {
    type: Date,
  },
  isPremium: {
    type: Boolean,
    default: false
  },
  lastDatePaid: {
    type: Date
  },
  address: {
    type: String,
  },
  city: {
    type: String,
  },
  country: {
    type: String,
  },
  zipCode: {
    type: String,
  },
  phone: {
    type: String,
  },
  profile: {
    type: String,
  },
  title: {
    type: String
  },
  school: {
    type: String
  },
  certifications: {
    type: String
  },
  experiance: {
    type: String
  },
  facebookLink: {
    type: String
  },
  linkedinLink: {
    type: String
  },
  parentEmail: {
    type: String
  },
  isParentConfirmed: {
    type: Boolean,
    default: false
  },
  grade: {
    type: String
  },
  tokens: [{
    token: {
      type: String,
      required: true
    }
  }]
});


UserSchema.statics.findByCredentials = async function (email, password) {

  try {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error('User doesnt exists')
    } else {
      const isValidPassword = await bcrypt.compare(password, user.password)
      if (!isValidPassword) {
        throw new Error('Invalid User Credentials')
      } else {
        return user
      }
    }
  } catch (e) {
    throw new Error(e)
  }
}


UserSchema.methods.toJSON = function () {
  var obj = this.toObject();
  delete obj.password;
  delete obj.tokens;
  return obj;
}

UserSchema.methods.getAuthToken = async function () {

  const user = this;
  const token = await jwt.sign({ _id: user._id }, config.get("jwtSecret"), { expiresIn: 360000 });
  user.tokens = user.tokens.concat({ token });
  await user.save();
  return token;

}



module.exports = User = mongoose.model("user", UserSchema);