const query = require('./exampleObjects').complete;

// searches for MRI if set to yes in query object
function mriSearch(mri) {
	let queryMri = '%';
	if (mri === 'yes') {
		queryMri = '%MRI%';
	}
	console.log("MRI: ", queryMri);
	return queryMri;
}

// creates query for genetic testing
function geneticQuery(genetic) {
	let geneticArray = [];
	if (genetic === 'apoE4_0') {
		geneticArray = ['%genetic%']
	} else if (genetic === 'apoE4_1') {
		geneticArray = ['%genetic%', '%ApoE4%']
	} else {
		geneticArray = ['%'];
	}
	console.log("GENETIC ARRAY: ", geneticArray)
	return geneticArray;
}

// creates query for PET scans looking for either MRI or MRI and amyloid
function petQuery(pet) {
	let petArray = [];
	if (pet === 'amyloidBeta_0') {
		petArray = ['%PET%']
	} else if (pet === 'amyloidBeta_1') {
		petArray = ['%PET%', '%amyloid%']
	} else {
		petArray = ['%'];
	}
	console.log("PET: ", petArray);
	return petArray;
}

// creates query for PET scans looking for either MRI or MRI and amyloid. removed %amyloid% because it returned nothing when searching along with spinal
function spinalQuery(spinal) {
	let spinalArray = [];
	if (spinal === 'both') {
		spinalArray = ['%spinal%', '%p-tau%', '%amyloid%']
	} 
	if (spinal === 'pTau') {
		spinalArray = ['%spinal%', '%p-tau%']
	} 
	if (spinal === 'amyloidBeta') {
		spinalArray = ['%spinal%', '%amyloid%']
	}
	if (spinalArray.length === 0) {
		spinalArray = ['%']
	}
	console.log("SPINAL ARRAY: ", spinalArray);
	return spinalArray;
}

// Builds query array for memory evaluations. We do not care about
function memoryEvalArray(queryEval) {
	let queryMemArray = [];
	if (queryEval.MMSE !== 'no') {
		queryMemArray.push('%MMSE%','%mini-mental%')
	}
	if (queryEval.MoCA !== 'no') {
		queryMemArray.push('%MOCA%', '%montreal%')
	}
	if (queryEval.CDR !== 'no') {
		queryMemArray.push('%CDR%', '%clinical dementia rating%')
	}

	if (queryMemArray.length === 0) {
		queryMemArray = ['%']
	}
	console.log("MEMORY ARRAY: ", queryMemArray);
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

	if (queryMedications.indexOf('Aricept') > -1) {
		buildArray = buildArray.concat(aricept);
	};
	if (queryMedications.indexOf('Exelon') > -1) {
		buildArray = buildArray.concat(exelon);
	};
	if (queryMedications.indexOf('Razadyne Er') > -1) {
		buildArray = buildArray.concat(razadyne);
	};
	if (queryMedications.indexOf('Namenda') > -1) {
		buildArray = buildArray.concat(namenda);
	};

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



module.exports = {
	mriSearch: mriSearch,
	petQuery: petQuery,
	spinalQuery: spinalQuery,
	memoryEvalArray: memoryEvalArray,
	medicationsArray: medicationsArray,
	geneticQuery: geneticQuery,
}