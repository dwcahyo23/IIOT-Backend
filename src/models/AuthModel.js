import { Sequelize } from 'sequelize';
import sequelize from '../config/sequelize.js';
import Utils from '../@utils/utils.js';

const { DataTypes } = Sequelize;

export const AuthUser = sequelize.define('_authUsers', {
  uuid: {
    type: DataTypes.STRING(8),
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  password: {
    type: DataTypes.STRING,
  },
  role: {
    type: DataTypes.STRING(20),
  },
}, { timestamps: false });

export const AuthData = sequelize.define('_authData', {
  displayName: {
    type: DataTypes.STRING(100),
  },
  photoURL: {
    type: DataTypes.STRING,
  },
  email: {
    type: DataTypes.STRING(100),
  },
  settings: {
    type: DataTypes.JSON,
    get() {
      const rawValue = this.getDataValue('settings');
      return JSON.parse(rawValue);
    },
  },
  shortcuts: {
    type: DataTypes.JSON,
    get() {
      const rawValue = this.getDataValue('shortcuts');
      return JSON.parse(rawValue);
    },
  },
}, { timestamps: false });
