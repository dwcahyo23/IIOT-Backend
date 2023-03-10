/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-useless-escape */
import { format } from 'date-fns';
import { MachineIndex, MachineItems } from '../models/MachineModel.js';
import Utils from '../@utils/utils.js';

// const DataItems = MachineIndex.hasMany(MachineItems, { as: 'data' });

MachineIndex.hasMany(MachineItems);
MachineItems.belongsTo(MachineIndex);

export const postMachineIndex = async (req, res) => {
  const {
    mch_code, mch_name, mch_com, mch_loc,
  } = req.body;
  const error = [];
  try {
    const response = await MachineIndex.create({
      mch_code, mch_name, mch_com, mch_loc,
    });
    res.status(200).json(response);
  } catch (err) {
    res.status(400).json(err.message);
    console.log(err.message);
  }
};

export const bulkMachineIndex = async (req, res) => {
  console.log(req.body);
  const data = req.body;
  try {
    const response = await MachineIndex.bulkCreate(
      data,
      { validate: true },
      { fields: ['mch_code', 'mch_name', 'mch_process', 'mch_com', 'mch_loc'] },
    );
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
  }
};

export const getMachines = async (_req, res) => {
  try {
    const response = await MachineIndex.findAll({});
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const getMachineIndex = async (req, res) => {
  try {
    const response = await MachineIndex.findOne({
      where: {
        uuid: req.params.uuid,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const updateMachineIndex = async (req, res) => {
  const data = req.body;
  try {
    const response = await MachineIndex.update(
      data,
      {
        where: {
          uuid: req.params.uuid,
        },
      },
    );
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteMachineIndex = async (req, _res) => {
  try {
    const response = await MachineIndex.destroy({
      where: {
        uuid: req.params.uuid,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

//* Edit by form
export const bulkMachineItem = async (req, res) => {
  console.log(req.body);
  const data = req.body;
  try {
    const response = await MachineItems.bulkCreate(data);
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const getMachineItem = async (req, res) => {
  try {
    const response = await MachineItems.findOne({
      where: {
        uuid: req.params.uuid,
      },
      include: MachineIndex,
    });
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const getMachineItems = async (req, res) => {
  await MachineItems.findAll({ include: MachineIndex })
    .then((result) => res.status(200).json(result))
    .catch((err) => console.log(err));
};

export const updateMachineItem = async (req, res) => {
  const {
    bom,
    category,
    item_name,
    item_life_time,
    item_lead_time,
    item_status,
    machineIndexUuid,
    uuid,
    featuredImageId,
    images,
    check,
    change_at,
    check_date,
  } = req.body;
  console.log('dateis', format(new Date(change_at), 'yyyy-MM-dd HH:mm:ss'));
  const change = {
    id: Utils.generateGUID(),
    date: check_date,
    value: check,
  };
  const isItemExists = await MachineItems.findAll({
    where: { uuid },
    include: MachineIndex,
  });

  if (isItemExists.length > 0) {
    await MachineItems.update({
      bom,
      category,
      item_name,
      item_lead_time,
      item_life_time,
      item_status,
      machineIndexUuid,
      change_at: format(new Date(change_at), 'yyyy-MM-dd HH:mm:ss'),
      images,
      featuredImageId,
    }, {
      where: {
        uuid,
      },
      sideEffects: false,
    }).then(() => {
      MachineItems.findOne({
        where: { uuid },
        sideEffects: true,
        include: MachineIndex,
      }).then((result) => res.status(200).json(result))
        .catch((err) => res.status(400).json(err));
    }).catch((err) => {
      console.log(err);
    });
  } else {
    const Boms = await MachineItems.findAll({
      where: { machineIndexUuid: machineIndexUuid.value, category },
    });
    const BOM = (`${category}${(machineIndexUuid.label).replace(/\-/g, '')}-${1001 + Boms.length}`);
    await MachineItems.create({
      bom: BOM,
      category,
      item_name,
      item_life_time,
      item_lead_time,
      item_status,
      change_at: format(new Date(change_at), 'yyyy-MM-dd HH:mm:ss'),
      machineIndexUuid: machineIndexUuid.value,
      images,
    }).then(() => {
      MachineItems.findOne({
        where: { uuid },
        include: MachineIndex,
      }).then((result) => res.status(200).json(result));
    }).catch((err) => {
      console.log(err);
    });
  }
};

export const deleteMachineItem = async (req, res) => {
  const uuid = req.body;
  try {
    const response = await MachineItems.destroy({
      where: {
        uuid,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};
