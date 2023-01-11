import { MachineIndex, MachineItems } from "../models/MachineModel.js";

// const DataItems = MachineIndex.hasMany(MachineItems, { as: 'data' });

MachineIndex.hasMany(MachineItems);
MachineItems.belongsTo(MachineIndex);

export const postMachineIndex = async (req, res) => {
	const { mch_code, mch_name, mch_com, mch_loc } = req.body;
	const error = [];
	try {
		const response = await MachineIndex.create({
			mch_code, mch_name, mch_com, mch_loc
		})
		res.status(200).json(response)

	} catch (error) {
		res.status(400).json(error.message)
		console.log(error.message)
	}
}

export const bulkMachineIndex = async (req, res) => {
	console.log(req.body)
	const data = req.body
	try {
		const response = await MachineIndex.bulkCreate(data,
			{ validate: true },
			{ fields: ['mch_code', 'mch_name', 'mch_process', 'mch_com', 'mch_loc'] })
		res.status(200).json(response)
	} catch (error) {
		console.log(error);
	}
}

export const getMachines = async (req, res) => {
	try {
		const response = await MachineIndex.findAll({})
		res.status(200).json(response)
	} catch (error) {
		console.log(error.message);
	}
}


export const getMachineIndex = async (req, res) => {
	try {
		const response = await MachineIndex.findOne({
			where: {
				uuid: req.params.uuid
			}
		})
		res.status(200).json(response)
	} catch (error) {
		console.log(error.message);
	}
}

export const updateMachineIndex = async (req, res) => {
	const data = req.body;
	try {
		const response = await MachineIndex.update(data,
			{
				where: {
					uuid: req.params.uuid
				}
			})
		res.status(200).json(response)
	} catch (error) {
		console.log(error.message);
	}
}

export const deleteMachineIndex = async (req, res) => {
	try {
		const response = await MachineIndex.destroy({
			where: {
				uuid: req.params.uuid
			}
		})
	} catch (error) {

	}
}

//* Edit by form
export const bulkMachineItem = async (req, res) => {
	console.log(req.body)
	const data = req.body
	try {
		const response = await MachineItems.bulkCreate(data)
		res.status(200).json(response)
	} catch (error) {
		console.log(error.message);
	}
}

export const getMachineItem = async (req, res) => {
	try {
		const response = await MachineItems.findOne({
			where: {
				uuid: req.params.uuid
			},
			include: MachineIndex,
		})
		res.status(200).json(response)
	} catch (error) {
		console.log(error.message);
	}
}

export const getMachineItems = async (req, res) => {
	try {
		const response = await MachineItems.findAll({ include: MachineIndex })
		res.status(200).json(response)
	} catch (error) {
		console.log(error.message);
	}
}

export const updateMachineItem = async (req, res) => {
	const { bom, category, item_name, item_life_time, item_lead_time, item_status, machineIndexUuid, uuid } = req.body;
	try {
		const isItemExists = await MachineItems.findAll({
			where: { uuid: uuid },
		});
		console.log(isItemExists.length)

		if (isItemExists.length > 0) {
			const update = await MachineItems.update({ bom, category, item_name, item_life_time, item_lead_time, item_status, machineIndexUuid },
				{
					where: {
						uuid: req.params.uuid
					}
				})
			const response = await MachineItems.findOne({
				where: {
					uuid: req.params.uuid
				},
				include: MachineIndex,
			})
			return res.status(200).json(response)
		} else {
			const create = await MachineItems.create({ bom, category, item_name, item_life_time, item_lead_time, item_status, machineIndexUuid });
			const response = await MachineItems.findOne({
				where: {
					uuid: req.params.uuid
				},
				include: MachineIndex,
			})
			return res.status(200).json(create)
		}

	} catch (error) {
		console.log(error);
	}
}

export const deleteMachineItem = async (req, res) => {
	const uuid = req.body
	try {
		const response = await MachineItems.destroy({
			where: {
				uuid: uuid
			}
		})
		res.status(200).json(response)
	} catch (error) {
		console.log(error.message);
	}
}