import bcrypt from 'bcrypt';
import _ from 'lodash';

import Base64 from 'crypto-js/enc-base64.js';
import HmacSHA256 from 'crypto-js/hmac-sha256.js';
import Utf8 from 'crypto-js/enc-utf8.js';
import jwtDecode from 'jwt-decode';
import { AuthData, AuthUser } from '../models/AuthModel.js';

/**
 * JWT Token Generator/Verifier Helpers
 * !! Created for Demonstration Purposes, cannot be used for PRODUCTION
 */

function base64url(source) {
  // Encode in classical base64
  let encodedSource = Base64.stringify(source);

  // Remove padding equal characters
  encodedSource = encodedSource.replace(/=+$/, '');

  // Replace characters according to base64url specifications
  encodedSource = encodedSource.replace(/\+/g, '-');
  encodedSource = encodedSource.replace(/\//g, '_');

  // Return the base64 encoded string
  return encodedSource;
}

function generateJWTToken(tokenPayload) {
  // Define token header
  const header = {
    alg: 'HS256',
    typ: 'JWT',
  };

  // Calculate the issued at and expiration dates
  const date = new Date();
  const iat = Math.floor(date.getTime() / 1000);
  const exp = Math.floor(date.setDate(date.getDate() + 7) / 1000);

  // Define token payload
  const payload = {
    iat,
    iss: 'IIOT',
    exp,
    ...tokenPayload,
  };

  // Stringify and encode the header
  const stringifiedHeader = Utf8.parse(JSON.stringify(header));
  const encodedHeader = base64url(stringifiedHeader);

  // Stringify and encode the payload
  const stringifiedPayload = Utf8.parse(JSON.stringify(payload));
  const encodedPayload = base64url(stringifiedPayload);

  // Sign the encoded header and mock-api
  let signature = `${encodedHeader}.${encodedPayload}`;
  signature = HmacSHA256(signature, process.env.ACCESS_TOKEN_SECRET);
  signature = base64url(signature);

  // Build and return the token
  return `${encodedHeader}.${encodedPayload}.${signature}`;
}

function verifyJWTToken(token) {
  // Split the token into parts
  const parts = token.split('.');
  const header = parts[0];
  const payload = parts[1];
  const signature = parts[2];

  // Re-sign and encode the header and payload using the secret
  const signatureCheck = base64url(
    HmacSHA256(`${header}.${payload}`, process.env.ACCESS_TOKEN_SECRET),
  );

  // Verify that the resulting signature is valid
  return signature === signatureCheck;
}

const DataUser = AuthUser.hasOne(AuthData, { as: 'data' });
// AuthUser.hasOne(AuthData);
// AuthData.belongsTo(AuthUser);

export const signUp = async (req, res) => {
  const { displayName, email, password } = req.body;
  const salt = await bcrypt.genSalt();
  const hashPassword = await bcrypt.hash(password, salt);
  const error = [];
  try {
    const isEmailExists = await AuthData.findAll({
      where: { email },
    });

    if (isEmailExists.length > 0) {
      error.push({
        type: 'email',
        message: 'The email address is already in use',
      });
    }

    if (error.length === 0) {
      const AuthCreate = await AuthUser.create(
        {
          password: hashPassword,
          role: 'admin',
          data: [
            {
              displayName,
              photoURL: '',
              email,
              settings: {
                layout: {},
                theme: {},
              },
              shortcuts: ['apps.calendar', 'apps.mailbox', 'apps.contacts'],
            },
          ],
        },
        {
          include: [DataUser],
        },
      );

      const user = await AuthUser.findOne({
        where: { uuid: AuthCreate.uuid },
        include: DataUser,
        attributes: { exclude: ['password'] },
      });

      const access_token = generateJWTToken({ id: user.uuid });

      const response = {
        user,
        access_token,
      };

      return res.status(200).json(response);
    }

    return res.status(200).json({ error });
  } catch (err) {
    console.log(err.message);
  }
};

export const signIn = async (req, res) => {
  const { email, password } = req.body.data;
  // const { email, password } = req.body;
  const error = [];
  try {
    const AuthFind = await AuthUser.findAll({
      include: DataUser,
    });

    const user = _.cloneDeep(
      AuthFind.find((_user) => _user.data.email === email),
    );

    if (!user) {
      error.push({
        type: 'email',
        message: 'Check your email address',
      });
    }

    if (user) {
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        error.push({
          type: 'password',
          message: 'Check your password',
        });
      }
    }

    if (error.length === 0) {
      delete user.password;

      const access_token = generateJWTToken({ id: user.uuid });

      const response = {
        user,
        access_token,
      };

      return res.status(200).json(response);
    }

    return res.status(200).json({ error });
  } catch (err) {
    console.log(err.message);
  }
};

export const accessToken = async (req, res) => {
  const { access_token } = req.body.data;
  try {
    if (verifyJWTToken(access_token)) {
      const { id } = jwtDecode(access_token);

      const user = await AuthUser.findOne({
        where: { uuid: id },
        include: DataUser,
        attributes: { exclude: ['password'] },
      });

      const updatedAccessToken = generateJWTToken({ id: user.uuid });

      const response = {
        user,
        access_token: updatedAccessToken,
      };
      return res.status(200).json(response);
    }
    const error = 'Invalid access token detected';
    return res.status(401).json({ error });
  } catch (error) {
    console.log(error.message);
  }
};

export const updateApp = async (req, res) => {
  // console.log(req.body.user.data.settings.theme)
  // console.log(req.body.user.data.id)
  // try {
  //   //* ! untuk update fungsi get pada auth model harus dihapus */
  //   //* * cari solusinya... untuk update layout seetttin */

  //   const response = await AuthData.update(
  //   {
  //     settings: 'req.body.user.data.settings',
  //   },
  //   {
  //     where: {
  //       id: req.body.user.data.id,
  //     },
  //   },
  // );
  //   console.log('success');
  //   // return res.status(200).json(response)
  //   // console.log(user)
  // } catch (error) {
  //   console.log(error.message);
  // }
  await AuthData.update({
    settings: req.body.user.data.settings,
  }, {
    where: {
      id: req.body.user.data.id,
    },
    sideEffects: false,
  }).then(() => {
    res.status(200).json({ msg: 'Settings has been saved successfully' });
  }).catch((err) => console.log(err));
};
