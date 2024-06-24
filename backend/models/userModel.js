import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username          : { type: String,            required: true   },
  email             : { type: String,            required: false  }, 
  picture           : { type: String,            required: false  },
  thirdPartyId      : { type: String,            required: false  },
  userCredits       : { type: Number,            required: false  },
  isAdmin           : { type: Boolean          , required: false  }
});

const User = mongoose.model("User", userSchema);

export default User;