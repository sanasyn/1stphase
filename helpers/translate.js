const query = require('./exampleObjects').complete;

// searches for MRI if set to yes in query object
function mriSearch(mri) {
	let queryMri = '';
	if (mri === 'yes') {
		queryMri = '%MRI%';
	}
	// console.log("MRI: ", queryMri);
	return queryMri;
}

// creates query for genetic testing
function geneticQuery(genetic) {
	let geneticArray = [];
	if (pet === 'apoE4_0') {
		petArray = ['%genetic%']
	}
	if (pet === 'apoE4_1') {
		petArray = ['%genetic%', '%ApoE4%']
	}
	return petArray;
}

// creates query for PET scans looking for either MRI or MRI and amyloid
function petQuery(pet) {
	let petArray = [];
	if (pet === 'amyloidBeta_0') {
		petArray = ['%MRI%']
	}
	if (pet === 'amyloidBeta_1') {
		petArray = ['%MRI%', '%amyloid%']
	}
	return petArray;
}

// creates query for PET scans looking for either MRI or MRI and amyloid. removed %amyloid% because it returned nothing when searching along with spinal
function spinalQuery(spinal) {
	let spinalArray = [];
	if (spinal === 'both') {
		spinalArray = ['%spinal%', '%p-tau%']
	}
	if (spinal === 'pTau') {
		spinalArray = ['%spinal%']
	}
	if (spinal === 'amyloidBeta') {
		spinalArray = ['%spinal%']
	}
	console.log("SPINAL ARRAY: ", spinalArray);
	return spinalArray;
}

// Builds query array for memory evaluations. We do not care about
function memoryEvalArray(queryEval) {
	let queryMemArray = [];
	if (queryEval.mmse !== 'no') {
		queryMemArray.push('%MMSE%')
	}
	if (queryEval.moca !== 'no') {
		queryMemArray.push('%MOCA%')
	}
	if (queryEval.cdr !== 'no') {
		queryMemArray.push('%CDR%')
	}

	// console.log("MEMORY ARRAY: ", queryMemArray);
	return queryMemArray;

}

// builds array used to query for medications. One medication may have multiple names, and so all should be included in the query. The '%' is used to search for the word in any part of the field
function medicationsArray(queryMedications) {
	let buildArray = [];
	let queryArray = [];
	const aricept = ['%donepezil%', '%aricept%', '%cholinesterase%'];
	const exelon = ['%rivastigmine%', '%exelon%', '%cholinesterase%'];
	const razadyne = ['%galantamine%', '%razadyne%', '%cholinesterase%'];
	const namenda = ['%memantine%', '%namenda%'];

	if (queryMedications.indexOf('aricept') > -1) {
		buildArray = buildArray.concat(aricept);
	};
	if (queryMedications.indexOf('exelon') > -1) {
		buildArray = buildArray.concat(exelon);
	};
	if (queryMedications.indexOf('razadyneEr') > -1) {
		buildArray = buildArray.concat(razadyne);
	};
	if (queryMedications.indexOf('namenda') > -1) {
		buildArray = buildArray.concat(namenda);
	};

	//removes duplicates
	buildArray.forEach(element => {
		if (queryArray.indexOf(element) === -1) {
			queryArray.push(element);
		}
	})
	// console.log("QUERY ARRAY: ", queryArray);
	return queryArray;
}



module.exports = {
	mriSearch: mriSearch,
	petQuery: petQuery,
	spinalQuery: spinalQuery,
	memoryEvalArray: memoryEvalArray,
	medicationsArray: medicationsArray,
	
}