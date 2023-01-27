import mongoose from "mongoose";
import bcrypt from 'bcrypt';
const { Schema } = mongoose;

const userSchema = new Schema({
  name: String,
  email: String,
  password: String
});

//HOOK en nodejs ??

userSchema.methods.encryptPassword = function (password) {
  const hash = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  this.password = hash;
  return hash;
};

userSchema.methods.comparePassword = async function (user, password) {
  console.log(password)
  console.log(user.password)
  const respuesta = await bcrypt.compare(password, user.password);
  console.log(respuesta); // false
  return respuesta;
  // return bcrypt.compareSync(password, this.password);
};


export const SigninSchema = mongoose.model('user', userSchema);
// cuando inserte datos los va a guardar en el schema, y despues en una coleccion llamada users


// ACA TENEMOS QUE USAR JWT