import { Op } from 'sequelize';
import { Modbus } from '../models/ModbusModel.js';

export const updateModbus = async (req, res) => {
  const { name, data } = req.body;

  const isModbusExists = await Modbus.findAll({
    where: {
      name,
      createdAt: {
        [Op.lt]: new Date(),
        [Op.gt]: new Date(new Date() - 24 * 60 * 60 * 1000),
      },
    },
  });

  if (isModbusExists.length > 0) {
    console.log('uuid:', isModbusExists[0].uuid);
    await Modbus.update({
      name, data,
    }, {
      where: {
        uuid: isModbusExists[0].uuid,
      },
    })
      .then(() => res.status(200).json({ msg: 'update data success' }))
      .catch((err) => console.log(err));
  } else {
    await Modbus.create({
      name, data,
    })
      .then(() => res.status(200).json({ msg: 'create data success' }))
      .catch((err) => console.log(err));
  }
};
