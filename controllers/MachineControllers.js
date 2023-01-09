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
export const postMachineItem = async (req, res) => {
	const data = req.body;
	try {
		const response = await MachineItems.create(data);
	} catch (error) {
		console.log(error.message);
	}
}

export const bulkMachineItem = async (req, res) => {
	console.log(req.body)
	const data = req.body
	try {
		const response = await MachineItem.bulkCreate(data)
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
	const data = req.body;
	try {
		const response = await MachineItem.update(data,
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

export const deleteMachineItem = async (req, res) => {
	try {
		const response = await MachineItem.destroy({
			where: {
				uuid: req.params.uuid
			}
		})
	} catch (error) {

	}
}