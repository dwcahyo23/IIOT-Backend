import { AuthData, AuthUser } from "../models/AuthModel.js";
import bcrypt from "bcrypt";

const DataUser = AuthUser.hasOne(AuthData,{as:'data'});

export const signUp = async (req, res) => {
  const {displayName,email,password} = req.body;
  const salt = await bcrypt.genSalt();
  const hashPassword = await bcrypt.hash(password,salt);
  const error = []
  try {
    console.log(displayName)
    const AuthCreate = await AuthUser.create({
      password:password,
      role:"admin",
      data:[{
        displayName: displayName,
        photoURL: '',
        email: email,
        setting: {},
        shortcuts: []
      }]
    },{
      include:[DataUser]
    });

    res.status(200).json(AuthCreate)

  } catch (error) {
    console.log(error.message);
  }
}