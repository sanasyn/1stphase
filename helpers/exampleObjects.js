// age must be a string in order to compare what is in the database '55 Years'
//gender: Male/Female must be capitalized
let complete =
	{
		"age": "65",
		"gender": "Female",
		"geneticTesting": "apoE4_1",
		"mri": "yes",
		"pet": "amyloidBeta_0",
		"spinalTap": "no",
		"memoryEval": {
			"MMSE": 25,
			"MoCA": 25,
			"CDR": 1
		},
		"prescriptionDuration": 8,
		"medications": ["aricept", "exelon", "razadyneEr", "namenda"]
	}
let basic = 
	{
		"age": "70",
		"gender": "Male",
		"geneticTesting": "no",
		"mri": "no",
		"pet": "no",
		"spinalTap": "no",
		"memoryEval": {
			"MMSE": "no",
			"MoCA": "no",
			"CDR": "no"
		},
		"prescriptionDuration": 8,
		"medications": ["namenda"]
	}

module.exports = {
	complete: complete,
	basic: basic
}