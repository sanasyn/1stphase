// age must be a string in order to compare what is in the database '55 Years'
//gender: Male/Female must be capitalized
let complete =
	{
		"zipcode": "78758",
		"age": "65",
		"gender": "Female",
		"geneticTesting": {
			"taken": "no",  //could also be apoE4_0 or apoE4_1
			"consent": "yes" // mark as yes if already taken
		},
		"mri": "yes",
		"pet": "yes",
		"spinalTap": "no",
		"stroke": "yes", 
		"medications": {
			"list": ["Namenda"],
			"acceptableTime": "yes" //default to 0
		},
		"informant": "yes",
		"primaryCare": "yes",
		"opinion": ["Familiy history of Alzheimer's disease", "Interested in clinical research", "Memory Compaints", "Other text"]
	}
module.exports = {
	complete: complete
}