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
    // console.log('uuid:', isModbusExists[0].uuid);
    const datas = JSON.parse(isModbusExists[0].data);
    await Modbus.update({
      name, data: [data, ...datas],
    }, {
      where: {
        uuid: isModbusExists[0].uuid,
      },
    })
      .then((response) => res.status(200).json(response))
      .catch((err) => res.status(400).json(err));
  } else {
    await Modbus.create({
      name, data: [data],
    })
      .then(() => res.status(200).json({ msg: 'create data success' }))
      .catch((err) => res.status(400).json(err));
  }
};
