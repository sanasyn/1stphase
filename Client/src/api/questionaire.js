const questionaire = [
    {
        question:"What is your zipcode?",
        type:'text',
        options:'',
        followupQ:''
    },
    {
        question: 'What is your age?',
        type:'text',
        options:'',
        followupQ:''
    },
    {
        question: 'What is your gender?',
        type:'radio',
        options:[ 'Male','Female'],
        followupQ:''
      
    },
    {
        question: 'Have you had genetic testing?',
        type:'radio',
        options:[ 'Yes','No'],
        followupQ:[{
            question: 'Is APOE4 detected?',
            type:'radio',
            options:[ 'Yes','No']
        
        }]
    },
    {
        question: 'Have you had an MRI scan done?',
        type:'radio',
        options:[ 'Yes','No'],
        followupQ:''
    },
    {
        question: 'Have you had an PET scan done?',
        type:'radio',
        options:[ 'Yes','No'],
        followupQ:[{
            question: 'Amyloid Beta detected?',
            type:'radio',
            options:[ 'Yes','No']
        }]
    },
    {
        question: 'Have you had an spinal tap done?',
        type:'radio',
        options:[ 'Yes','No'],
        followupQ:[{
            question: 'Check all that are detected:',
            type:'checkbox',
            options:[ 'Amyloid Beta','P-Tau']
        }]
    },
    {
        question: 'Have you had memory testing done?',
        type:'radio',
        options:[ 'Yes','No'],
        followupQ:[{
            question: 'Fill in all scores that you done:',
            type:'text',
            options:[ 'MMSE','MoCA','CDR']
        }]
    },
    {
        question: 'Have you been prescribed medication for symptomatic relief?',
        type:'radio',
        options:[ 'Yes','No'],
        followupQ:[
            {
                question: 'How long have been taking the medication? (in months)',
                type:'text',
                options:''
            },
            {
                question: 'What dementia medication are you taking? Check all that apply.',
                type:'checkbox',
                options:['Aricept','Exelon','Razadyne ER','Namenda']
            }
        ]
    },
    {
        question: 'Do you have a primary care physician?',
        type:'radio',
        options:[ 'Yes','No'],
        followupQ:''
    }

]

export default questionaire;