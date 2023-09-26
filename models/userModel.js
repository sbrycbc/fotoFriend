import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import validator from 'validator';

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, 'Der Bereich „Benutzername“ ist erforderlich'],
      lowercase: true,
      validate: [validator.isAlphanumeric, 'Nur alphanumerische Zeichen'],
    },
    email: {
      type: String,
      required: [true, 'Der Bereich „Email“ ist erforderlich'],
      unique: true,
      validate: [validator.isEmail, 'Eine gültige E-Mail-Adresse ist erforderlich'],
    },
    password: {
      type: String,
      required: [true, 'Der Bereich „Password“ ist erforderlich'],
      minLength: [4, 'Mindestens 4 Zeichen'],
    },
  },
  {
    timestamps: true,
  }
);


userSchema.pre('save', function (next) {
  const user = this;
  //console.log("pasword 1", user.password)
  bcrypt.hash(user.password, 10, (err, hash) => {
    user.password = hash;
 //console.log("pasword 2", user.password)
    next();
  });
}); 


const User = mongoose.model('User', userSchema);


export default User;