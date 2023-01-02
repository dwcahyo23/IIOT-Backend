import { AuthData, AuthUser } from "../models/AuthModel.js";

const DataUser = AuthData.belongsTo(AuthUser, { as: 'data' });

export const signUp = async (req, res) => {
  console.log(req.body)
  const {displayName,email,password} = req.body;
  const error = []
  try {
    const AuthCreate = await AuthData.create({
      password: password,
      role: 'admin',
      data: {
        displayName: displayName,
        photoURL: '',
        email: email,
        setting: {},
        shortcuts: []
      }
    }, {
      include: [DataUser]
    });

    res.status(200).json(AuthCreate)

  } catch (error) {
    console.log(error.message);
  }
}