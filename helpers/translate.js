const query = require('./exampleObjects').complete;

// creates genetic testing query for inclusion criteria
function geneticQueryInc(genetic) {
	let queryGenetic = '%';
	if (genetic.taken === 'apoE4_1') {
		queryGenetic = '%APOE4%'
	}
	console.log("GENETIC INC: ", queryGenetic)
	return queryGenetic;
}

// creates genetic testing query for exclusion criteria
function geneticQueryEx(genetic) {
	let queryGenetic = [''];
	if (genetic.consent === 'no') {
		queryGenetic = ['%APOE%','%genetic%'];
	}
	console.log("GENETIC Ex: ", queryGenetic)
	return queryGenetic;
}

// creates mri query for exclusion criteria
function mriQuery(mri) {
	let queryMri = '';
	if (mri === 'no') {
		queryMri = '%contraindication%MR%';
	}
	console.log("MRI: ", queryMri);
	return queryMri;
}

// creates PET scan query for exclusion criteria
function petQuery(pet) {
	let petArray = [''];
	if (pet === 'no') {
		petArray = ['%PET%', "%florbetapir%", "%F-AV-1451%"]
	}
	console.log("PET: ", petArray);
	return petArray;
}

// creates spinal tap query for exclusion criteria
function spinalQuery(spinal) {
	let spinalArray = [''];
	if (spinal === 'no') {
		spinalArray = ['%lumbar%','%LP%']
	} 
	console.log("SPINAL ARRAY: ", spinalArray);
	return spinalArray;
}

function strokeQuery(stroke) {
	let strokeArray = [''];
	if (stroke === 'yes') {
		strokeArray = ['%stroke%', '%vascular%', '%ischemic%']
	}
	console.log("STROKE ARRAY: ", strokeArray);
	return strokeArray;
}

// builds array used to query for medications inclusion
function medicationsQuery(medications) {
	let buildArray = [];
	let queryArray = [];
	const aricept = ['%donepezil%', '%aricept%', '%cholinesterase%'];
	const exelon = ['%rivastigmine%', '%exelon%', '%cholinesterase%'];
	const razadyne = ['%galantamine%', '%razadyne%', '%cholinesterase%'];
	const namenda = ['%memantine%', '%namenda%'];

	if (medications.acceptableTime === 'yes'){
		if (medications.list.indexOf('Aricept') > -1) {
			buildArray = buildArray.concat(aricept);
		};
		if (medications.list.indexOf('Exelon') > -1) {
			buildArray = buildArray.concat(exelon);
		};
		if (medications.list.indexOf('Razadyne Er') > -1) {
			buildArray = buildArray.concat(razadyne);
		};
		if (medications.list.indexOf('Namenda') > -1) {
			buildArray = buildArray.concat(namenda);
		};
	}

	//removes duplicates
	buildArray.forEach(element => {
		if (queryArray.indexOf(element) === -1) {
			queryArray.push(element);
		}
	})

	if (queryArray.length === 0) {
		queryArray = ['']
	}
	console.log("MEDICATIONS: ", queryArray);

	return queryArray;
}


// builds array used to query for medications inclusion
function medicationsQueryNot(medications) {
	let buildArray = [];
	let queryArray = [];
	const aricept = ['%donepezil%', '%aricept%', '%cholinesterase%'];
	const exelon = ['%rivastigmine%', '%exelon%', '%cholinesterase%'];
	const razadyne = ['%galantamine%', '%razadyne%', '%cholinesterase%'];
	const namenda = ['%memantine%', '%namenda%'];

	if (medications.acceptableTime === 'no'){
		if (medications.list.indexOf('Aricept') > -1) {
			buildArray = buildArray.concat(aricept);
		};
		if (medications.list.indexOf('Exelon') > -1) {
			buildArray = buildArray.concat(exelon);
		};
		if (medications.list.indexOf('Razadyne Er') > -1) {
			buildArray = buildArray.concat(razadyne);
		};
		if (medications.list.indexOf('Namenda') > -1) {
			buildArray = buildArray.concat(namenda);
		};
	}

	//removes duplicates
	buildArray.forEach(element => {
		if (queryArray.indexOf(element) === -1) {
			queryArray.push(element);
		}
	})

	if (queryArray.length === 0) {
		queryArray = ['%']
	}
	console.log("MEDICATIONS: ", queryArray);

	return queryArray;
}

// creates caregiver query for inclusion criteria
function caregiverQueryInc(care) {
	let queryCare = [''];
	if (care === 'no') {
		queryCare = ['%caregiver%','%partner%'];
	}
	console.log("CARE INC: ", queryCare)
	return queryCare;
}

module.exports = {
	geneticQueryInc: geneticQueryInc,
	geneticQueryEx: geneticQueryEx,
	mriQuery: mriQuery,
	petQuery: petQuery,
	spinalQuery: spinalQuery,
	strokeQuery: strokeQuery,
	medicationsQuery: medicationsQuery,
	medicationsQueryNot: medicationsQueryNot,
	caregiverQueryInc: caregiverQueryInc
}