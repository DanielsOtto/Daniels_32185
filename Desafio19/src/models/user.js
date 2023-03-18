import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
const { Schema } = mongoose;

const userSchema = new Schema({
  name: String,
  email: String,
  password: String
});


userSchema.methods.encryptPassword = function (password) {
  const hash = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  this.password = hash;
  return hash;
};

userSchema.methods.comparePassword = async function (password) { // no deberia recibir user
  return await bcrypt.compare(password, this.password); // deberia ser this.password
  // return bcrypt.compareSync(password, this.password);
};


export const SigninSchema = mongoose.model('user', userSchema);
// cuando inserte datos los va a guardar en el schema, y despues en una coleccion llamada users

