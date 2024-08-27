const Industries=[
    "entertainment",
    "finance",
    "medical",
    "information technology",
    "education",
    "textile",
    "media and news",
    "food processing",
    "hospitality",
    "construction and engineering",
    "law",
    "paper",
    "real estate",
    "automobile",
    "aviation",
    "pharmaceutical",
    "fertilizers",
    "advertising",
    "metallurgy",
    "energy",
    "telecommunications",
    "retail",
    "manufacturing",
    "agriculture",
    "chemicals",
    "transportation and logistics",
    "consumer goods",
    "healthcare"
]

const GradingSystems=["Percentage","Grade","GPA","CGPA"]

const Tests=[
    {name:"Graduate Record Examination",shortForm:"GRE",type:"general",sections:[{name:"Verbal Reasoning",validation:{min:130,max:170}},{name:"Quantitative Reasoning",validation:{min:130,max:170}},{name:"Analytical Writing Assessment",validation:{min:0,max:6}}]},
    {name:"Graduate Management Admission Test",shortForm:"GMAT",type:"general",sections:[{name:"Verbal Reasoning",validation:{min:6,max:51}},{name:"Quantitative Reasoning",validation:{min:6,max:51}},{name:"Analytical Writing Assessment",validation:{min:0,max:6}},{name:"Integrated Reasoning",validation:{min:1,max:8}}]},
    {name:"Test of English as a Foreign Language",shortForm:"TOEFL",type:"languageproficiency",sections:[{name:"Reading",validation:{min:0,max:30}} ,{name:"Listening",validation:{min:0,max:30}},{name:"Speaking",validation:{min:0,max:30}},{name:"Writing",validation:{min:0,max:30}}]},
    {name:"International English Language Testing System",shortForm:"IELTS",type:"languageproficiency",sections:[{name:"Reading",validation:{min:0,max:9}},{name:"Listening",validation:{min:0,max:9}},{name:"Speaking",validation:{min:0,max:9}},{name:"Writing",validation:{min:0,max:9}}]},
    {name:"Pearson Test of English",shortForm:"PTE",type:"languageproficiency",sections:[{name:"Reading",validation:{min:10,max:90}},{name:"Listening",validation:{min:10,max:90}},{name:"Speaking",validation:{min:10,max:90}},{name:"Writing",validation:{min:10,max:90}}]},
    {name:"Duolingo English Test",shortForm:"DET",type:"languageproficiency",sections:[{name:"Literacy",validation:{min:10,max:160}},{name:"Conversation",validation:{min:10,max:160}},{name:"Comprehension",validation:{min:10,max:160}},{name:"Production",validation:{min:10,max:160}}]},
    {name:"American College Testing",shortForm:"ACT",type:"general",sections:[{name:"English",validation:{min:1,max:36}},{name:"Math",validation:{min:1,max:36}},{name:"Reading",validation:{min:1,max:36}},{name:"Science",validation:{min:1,max:36}}]},
] 


export {Industries,GradingSystems,Tests}