import { MachineIndex, MachineItems } from "../models/MachineModel.js";

const DataItems = MachineIndex.hasMany(MachineItems,{as: 'data'});

export const postMachineIndex = async (req,res) => {
	const {mch_code, mch_name, mch_com, mch_loc} = req.body;
	const error = [];
	try {		
		const response = await  MachineIndex.create({
			mch_code,mch_name,mch_com,mch_loc
		})
		res.status(200).json(response)

	} catch (error) {
		res.status(400).json(error.message)
		console.log(error.message)
	}
}

export const postMachineItem = async (req,res) => {
	
}