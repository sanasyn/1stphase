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
        
        },
        {
            question: 'Would your consent to genetic testing?',
            type: 'radio',
            options: ['Yes','No']
        }
        ]
    },
    {
        question: 'Have you had an MRI scan done?',
        type:'radio',
        options:[ 'Yes','No'],
        followupQ:''
    },
    {
        question: 'Are you okay with getting PET done for amyloid imaging?',
        type:'radio',
        options:[ 'Yes','No'],
        followupQ:''
    },
    {
        question: 'Are you okay with having a lumbar puncture/spinal tab done for detection of Amyloid Beta/P-Tau?',
        type:'radio',
        options:[ 'Yes','No'],
        followupQ:''

    },
    {
        question: 'Did you have a stroke/transient ischemic attack in the last 12 months?',
        type:'radio',
        options:[ 'Yes','No'],
        followupQ:''

    },
    {
        question: 'Are you taking any anti-dementia medication? Check all that apply.',
        type:'checkbox',
        options:['Aricept','Exelon','Razadyne ER','Namenda','None'],
        followupQ:[
            {
                parentAnswer:'',
                question: 'Have you taking these medications for more than 10 weeks?',
                type:'radio',
                options:['Yes','No']
            }
        ]
    },
    {
        question: 'Do you have a family member or a caregiver that will accompany you?',
        type:'radio',
        options:[ 'Yes','No'],
        followupQ:''
    },
    {
        question: 'Do you have a primary care physician?',
        type:'radio',
        options:[ 'Yes','No'],
        followupQ:''
    },
    {
        question:"Why are you using this app? Check all that apply.",
        type:'checkbox',
        options:["Family history of Alzhimer's Disease","Interested in Clinical research","Memory Complants","Other"],
        followupQ:[{
            question:"Please write in your reason.",
            type:'text',
            options:''

        }]

        
    }

]

export default questionaire;