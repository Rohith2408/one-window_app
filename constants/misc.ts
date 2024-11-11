import Dropdown from "../components/resources/Dropdown";

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

export const Languages=[
    "English",
    "Telugu",
    "Hindi",
    "Afrikaans",
    "Akan",
    "Albanian",
    "Amharic",
    "Arabic",
    "Armenian",
    "Assamese",
    "Aymara",
    "Azerbaijani",
    "Basque",
    "Belarusian",
    "Bengali",
    "Berber",
    "Bislama",
    "Bosnian",
    "Bulgarian",
    "Burmese",
    "Cantonese",
    "Catalan",
    "Croatian",
    "Dari",
    "Dioula",
    "Dutch",
    "Dzongkha",
    "Ewe",
    "Fijian",
    "Filipino (Tagalog)",
    "French",
    "Galician",
    "German",
    "Gilbertese",
    "Greek",
    "Guaraní",
    "Gujarati",
    "Haitian Creole",
    "Hausa",
    "Hebrew",
    "Hiri Motu",
    "Hungarian",
    "Icelandic",
    "Igbo",
    "Indonesian",
    "Irish",
    "Italian",
    "Japanese",
    "Kannada",
    "Kashmiri",
    "Kazakh",
    "Kikongo",
    "Konkani",
    "Korean",
    "Kurdish",
    "Latvian",
    "Lingala",
    "Lithuanian",
    "Luxembourgish",
    "Maithili",
    "Malay",
    "Malayalam",
    "Maltese",
    "Mandarin Chinese",
    "Manipuri",
    "Māori",
    "Marathi",
    "Marshallese",
    "Moore",
    "Nepali",
    "Norwegian",
    "Oromo",
    "Pashto",
    "Persian (Farsi)",
    "Pijin",
    "Polish",
    "Portuguese",
    "Punjabi",
    "Quechua",
    "Romanian",
    "Romansh",
    "Russian",
    "Samoan",
    "Sanskrit",
    "Scottish Gaelic",
    "Serbian",
    "Sesotho",
    "Setswana",
    "Sindhi",
    "Sinhala",
    "Slovak",
    "Slovenian",
    "Spanish (Castilian)",
    "Swahili",
    "Swedish",
    "Tamil",
    "Thai",
    "Tibetan",
    "Tigrinya",
    "Tok Pisin",
    "Tongan",
    "Uighur",
    "Urdu",
    "Vietnamese",
    "Welsh",
    "Xhosa",
    "Yoruba",
    "Zulu"
  ]

const GradingSystems=["Percentage","Grade","GPA","CGPA"]

const Tests=[
    {name:"Graduate Record Examination",shortForm:"GRE",type:"general",sections:[{name:"Verbal Reasoning",validation:{min:130,max:170}},{name:"Quantitative Reasoning",validation:{min:130,max:170}},{name:"Analytical Writing Assessment",validation:{min:0,max:6}}],totalEvaluator:(sections:any[])=>(sections.reduce((acc,curr)=>curr.description=="Analytical Writing Assessment"?acc:(acc+curr.count),0))},
    {name:"Graduate Management Admission Test",shortForm:"GMAT",type:"general",sections:[{name:"Verbal Reasoning",validation:{min:6,max:51}},{name:"Quantitative Reasoning",validation:{min:6,max:51}},{name:"Analytical Writing Assessment",validation:{min:0,max:6}},{name:"Integrated Reasoning",validation:{min:1,max:8}}],totalEvaluator:(sections:any[])=>(sections.reduce((acc,curr)=>curr.description=="Analytical Writing Assessment"?acc:(acc+curr.count),0))},
    {name:"Test of English as a Foreign Language",shortForm:"TOEFL",type:"languageproficiency",sections:[{name:"Reading",validation:{min:0,max:30}} ,{name:"Listening",validation:{min:0,max:30}},{name:"Speaking",validation:{min:0,max:30}},{name:"Writing",validation:{min:0,max:30}}],totalEvaluator:(sections:any[])=>(sections.reduce((acc,curr)=>acc+curr.count,0))},
    {name:"International English Language Testing System",shortForm:"IELTS",type:"languageproficiency",sections:[{name:"Reading",validation:{min:0,max:9}},{name:"Listening",validation:{min:0,max:9}},{name:"Speaking",validation:{min:0,max:9}},{name:"Writing",validation:{min:0,max:9}}],totalEvaluator:(sections:any[])=>(sections.reduce((acc,curr)=>acc+curr.count,0))},
    {name:"Pearson Test of English",shortForm:"PTE",type:"languageproficiency",sections:[{name:"Reading",validation:{min:10,max:90}},{name:"Listening",validation:{min:10,max:90}},{name:"Speaking",validation:{min:10,max:90}},{name:"Writing",validation:{min:10,max:90}}],totalEvaluator:(sections:any[])=>(sections.reduce((acc,curr)=>acc+curr.count,0))},
    {name:"Duolingo English Test",shortForm:"DET",type:"languageproficiency",sections:[{name:"Literacy",validation:{min:10,max:160}},{name:"Conversation",validation:{min:10,max:160}},{name:"Comprehension",validation:{min:10,max:160}},{name:"Production",validation:{min:10,max:160}}],totalEvaluator:(sections:any[])=>(sections.reduce((acc,curr)=>acc+curr.count,0))},
    // {name:"American College Testing",shortForm:"ACT",type:"general",sections:[{name:"English",validation:{min:1,max:36}},{name:"Math",validation:{min:1,max:36}},{name:"Reading",validation:{min:1,max:36}},{name:"Science",validation:{min:1,max:36}}]},
] 

export const Countries=[{name:"United States of America",shortForm:"USA"},{name:"United Kingdom",shortForm:"UK"},{name:"Canada",shortForm:"CAN"},{name:"Australia",shortForm:"AUS"},{name:"New Zealand",shortForm:"NZ"},{name:"Ireland",shortForm:"IRE"}];


export const boards=[
    "Central Board of Secondary Education (CBSE)", 
    "Indian Certificate of Secondary Education (ICSE)", 
    "International Baccalaureate (IB)", 
    "National Institute of Open Schooling (NIOS)", 
    "All India Senior School Certificate Examination (AISSCE)", 
  ]
  

const Countrycodes=[
    {
    "name": "Afghanistan",
    "dial_code": "+93",
    "code": "AF"
    },
    {
    "name": "Aland Islands",
    "dial_code": "+358",
    "code": "AX"
    },
    {
    "name": "Albania",
    "dial_code": "+355",
    "code": "AL"
    },
    {
    "name": "Algeria",
    "dial_code": "+213",
    "code": "DZ"
    },
    {
    "name": "AmericanSamoa",
    "dial_code": "+1684",
    "code": "AS"
    },
    {
    "name": "Andorra",
    "dial_code": "+376",
    "code": "AD"
    },
    {
    "name": "Angola",
    "dial_code": "+244",
    "code": "AO"
    },
    {
    "name": "Anguilla",
    "dial_code": "+1264",
    "code": "AI"
    },
    {
    "name": "Antarctica",
    "dial_code": "+672",
    "code": "AQ"
    },
    {
    "name": "Antigua and Barbuda",
    "dial_code": "+1268",
    "code": "AG"
    },
    {
    "name": "Argentina",
    "dial_code": "+54",
    "code": "AR"
    },
    {
    "name": "Armenia",
    "dial_code": "+374",
    "code": "AM"
    },
    {
    "name": "Aruba",
    "dial_code": "+297",
    "code": "AW"
    },
    {
    "name": "Australia",
    "dial_code": "+61",
    "code": "AU"
    },
    {
    "name": "Austria",
    "dial_code": "+43",
    "code": "AT"
    },
    {
    "name": "Azerbaijan",
    "dial_code": "+994",
    "code": "AZ"
    },
    {
    "name": "Bahamas",
    "dial_code": "+1242",
    "code": "BS"
    },
    {
    "name": "Bahrain",
    "dial_code": "+973",
    "code": "BH"
    },
    {
    "name": "Bangladesh",
    "dial_code": "+880",
    "code": "BD"
    },
    {
    "name": "Barbados",
    "dial_code": "+1246",
    "code": "BB"
    },
    {
    "name": "Belarus",
    "dial_code": "+375",
    "code": "BY"
    },
    {
    "name": "Belgium",
    "dial_code": "+32",
    "code": "BE"
    },
    {
    "name": "Belize",
    "dial_code": "+501",
    "code": "BZ"
    },
    {
    "name": "Benin",
    "dial_code": "+229",
    "code": "BJ"
    },
    {
    "name": "Bermuda",
    "dial_code": "+1441",
    "code": "BM"
    },
    {
    "name": "Bhutan",
    "dial_code": "+975",
    "code": "BT"
    },
    {
    "name": "Bolivia, Plurinational State of",
    "dial_code": "+591",
    "code": "BO"
    },
    {
    "name": "Bosnia and Herzegovina",
    "dial_code": "+387",
    "code": "BA"
    },
    {
    "name": "Botswana",
    "dial_code": "+267",
    "code": "BW"
    },
    {
    "name": "Brazil",
    "dial_code": "+55",
    "code": "BR"
    },
    {
    "name": "British Indian Ocean Territory",
    "dial_code": "+246",
    "code": "IO"
    },
    {
    "name": "Brunei Darussalam",
    "dial_code": "+673",
    "code": "BN"
    },
    {
    "name": "Bulgaria",
    "dial_code": "+359",
    "code": "BG"
    },
    {
    "name": "Burkina Faso",
    "dial_code": "+226",
    "code": "BF"
    },
    {
    "name": "Burundi",
    "dial_code": "+257",
    "code": "BI"
    },
    {
    "name": "Cambodia",
    "dial_code": "+855",
    "code": "KH"
    },
    {
    "name": "Cameroon",
    "dial_code": "+237",
    "code": "CM"
    },
    {
    "name": "Canada",
    "dial_code": "+1",
    "code": "CA"
    },
    {
    "name": "Cape Verde",
    "dial_code": "+238",
    "code": "CV"
    },
    {
    "name": "Cayman Islands",
    "dial_code": "+ 345",
    "code": "KY"
    },
    {
    "name": "Central African Republic",
    "dial_code": "+236",
    "code": "CF"
    },
    {
    "name": "Chad",
    "dial_code": "+235",
    "code": "TD"
    },
    {
    "name": "Chile",
    "dial_code": "+56",
    "code": "CL"
    },
    {
    "name": "China",
    "dial_code": "+86",
    "code": "CN"
    },
    {
    "name": "Christmas Island",
    "dial_code": "+61",
    "code": "CX"
    },
    {
    "name": "Cocos (Keeling) Islands",
    "dial_code": "+61",
    "code": "CC"
    },
    {
    "name": "Colombia",
    "dial_code": "+57",
    "code": "CO"
    },
    {
    "name": "Comoros",
    "dial_code": "+269",
    "code": "KM"
    },
    {
    "name": "Congo",
    "dial_code": "+242",
    "code": "CG"
    },
    {
    "name": "Congo, The Democratic Republic of the Congo",
    "dial_code": "+243",
    "code": "CD"
    },
    {
    "name": "Cook Islands",
    "dial_code": "+682",
    "code": "CK"
    },
    {
    "name": "Costa Rica",
    "dial_code": "+506",
    "code": "CR"
    },
    {
    "name": "Cote d'Ivoire",
    "dial_code": "+225",
    "code": "CI"
    },
    {
    "name": "Croatia",
    "dial_code": "+385",
    "code": "HR"
    },
    {
    "name": "Cuba",
    "dial_code": "+53",
    "code": "CU"
    },
    {
    "name": "Cyprus",
    "dial_code": "+357",
    "code": "CY"
    },
    {
    "name": "Czech Republic",
    "dial_code": "+420",
    "code": "CZ"
    },
    {
    "name": "Denmark",
    "dial_code": "+45",
    "code": "DK"
    },
    {
    "name": "Djibouti",
    "dial_code": "+253",
    "code": "DJ"
    },
    {
    "name": "Dominica",
    "dial_code": "+1767",
    "code": "DM"
    },
    {
    "name": "Dominican Republic",
    "dial_code": "+1849",
    "code": "DO"
    },
    {
    "name": "Ecuador",
    "dial_code": "+593",
    "code": "EC"
    },
    {
    "name": "Egypt",
    "dial_code": "+20",
    "code": "EG"
    },
    {
    "name": "El Salvador",
    "dial_code": "+503",
    "code": "SV"
    },
    {
    "name": "Equatorial Guinea",
    "dial_code": "+240",
    "code": "GQ"
    },
    {
    "name": "Eritrea",
    "dial_code": "+291",
    "code": "ER"
    },
    {
    "name": "Estonia",
    "dial_code": "+372",
    "code": "EE"
    },
    {
    "name": "Ethiopia",
    "dial_code": "+251",
    "code": "ET"
    },
    {
    "name": "Falkland Islands (Malvinas)",
    "dial_code": "+500",
    "code": "FK"
    },
    {
    "name": "Faroe Islands",
    "dial_code": "+298",
    "code": "FO"
    },
    {
    "name": "Fiji",
    "dial_code": "+679",
    "code": "FJ"
    },
    {
    "name": "Finland",
    "dial_code": "+358",
    "code": "FI"
    },
    {
    "name": "France",
    "dial_code": "+33",
    "code": "FR"
    },
    {
    "name": "French Guiana",
    "dial_code": "+594",
    "code": "GF"
    },
    {
    "name": "French Polynesia",
    "dial_code": "+689",
    "code": "PF"
    },
    {
    "name": "Gabon",
    "dial_code": "+241",
    "code": "GA"
    },
    {
    "name": "Gambia",
    "dial_code": "+220",
    "code": "GM"
    },
    {
    "name": "Georgia",
    "dial_code": "+995",
    "code": "GE"
    },
    {
    "name": "Germany",
    "dial_code": "+49",
    "code": "DE"
    },
    {
    "name": "Ghana",
    "dial_code": "+233",
    "code": "GH"
    },
    {
    "name": "Gibraltar",
    "dial_code": "+350",
    "code": "GI"
    },
    {
    "name": "Greece",
    "dial_code": "+30",
    "code": "GR"
    },
    {
    "name": "Greenland",
    "dial_code": "+299",
    "code": "GL"
    },
    {
    "name": "Grenada",
    "dial_code": "+1473",
    "code": "GD"
    },
    {
    "name": "Guadeloupe",
    "dial_code": "+590",
    "code": "GP"
    },
    {
    "name": "Guam",
    "dial_code": "+1671",
    "code": "GU"
    },
    {
    "name": "Guatemala",
    "dial_code": "+502",
    "code": "GT"
    },
    {
    "name": "Guernsey",
    "dial_code": "+44",
    "code": "GG"
    },
    {
    "name": "Guinea",
    "dial_code": "+224",
    "code": "GN"
    },
    {
    "name": "Guinea-Bissau",
    "dial_code": "+245",
    "code": "GW"
    },
    {
    "name": "Guyana",
    "dial_code": "+595",
    "code": "GY"
    },
    {
    "name": "Haiti",
    "dial_code": "+509",
    "code": "HT"
    },
    {
    "name": "Holy See (Vatican City State)",
    "dial_code": "+379",
    "code": "VA"
    },
    {
    "name": "Honduras",
    "dial_code": "+504",
    "code": "HN"
    },
    {
    "name": "Hong Kong",
    "dial_code": "+852",
    "code": "HK"
    },
    {
    "name": "Hungary",
    "dial_code": "+36",
    "code": "HU"
    },
    {
    "name": "Iceland",
    "dial_code": "+354",
    "code": "IS"
    },
    {
    "name": "India",
    "dial_code": "+91",
    "code": "IN"
    },
    {
    "name": "Indonesia",
    "dial_code": "+62",
    "code": "ID"
    },
    {
    "name": "Iran, Islamic Republic of Persian Gulf",
    "dial_code": "+98",
    "code": "IR"
    },
    {
    "name": "Iraq",
    "dial_code": "+964",
    "code": "IQ"
    },
    {
    "name": "Ireland",
    "dial_code": "+353",
    "code": "IE"
    },
    {
    "name": "Isle of Man",
    "dial_code": "+44",
    "code": "IM"
    },
    {
    "name": "Israel",
    "dial_code": "+972",
    "code": "IL"
    },
    {
    "name": "Italy",
    "dial_code": "+39",
    "code": "IT"
    },
    {
    "name": "Jamaica",
    "dial_code": "+1876",
    "code": "JM"
    },
    {
    "name": "Japan",
    "dial_code": "+81",
    "code": "JP"
    },
    {
    "name": "Jersey",
    "dial_code": "+44",
    "code": "JE"
    },
    {
    "name": "Jordan",
    "dial_code": "+962",
    "code": "JO"
    },
    {
    "name": "Kazakhstan",
    "dial_code": "+77",
    "code": "KZ"
    },
    {
    "name": "Kenya",
    "dial_code": "+254",
    "code": "KE"
    },
    {
    "name": "Kiribati",
    "dial_code": "+686",
    "code": "KI"
    },
    {
    "name": "Korea, Democratic People's Republic of Korea",
    "dial_code": "+850",
    "code": "KP"
    },
    {
    "name": "Korea, Republic of South Korea",
    "dial_code": "+82",
    "code": "KR"
    },
    {
    "name": "Kuwait",
    "dial_code": "+965",
    "code": "KW"
    },
    {
    "name": "Kyrgyzstan",
    "dial_code": "+996",
    "code": "KG"
    },
    {
    "name": "Laos",
    "dial_code": "+856",
    "code": "LA"
    },
    {
    "name": "Latvia",
    "dial_code": "+371",
    "code": "LV"
    },
    {
    "name": "Lebanon",
    "dial_code": "+961",
    "code": "LB"
    },
    {
    "name": "Lesotho",
    "dial_code": "+266",
    "code": "LS"
    },
    {
    "name": "Liberia",
    "dial_code": "+231",
    "code": "LR"
    },
    {
    "name": "Libyan Arab Jamahiriya",
    "dial_code": "+218",
    "code": "LY"
    },
    {
    "name": "Liechtenstein",
    "dial_code": "+423",
    "code": "LI"
    },
    {
    "name": "Lithuania",
    "dial_code": "+370",
    "code": "LT"
    },
    {
    "name": "Luxembourg",
    "dial_code": "+352",
    "code": "LU"
    },
    {
    "name": "Macao",
    "dial_code": "+853",
    "code": "MO"
    },
    {
    "name": "Macedonia",
    "dial_code": "+389",
    "code": "MK"
    },
    {
    "name": "Madagascar",
    "dial_code": "+261",
    "code": "MG"
    },
    {
    "name": "Malawi",
    "dial_code": "+265",
    "code": "MW"
    },
    {
    "name": "Malaysia",
    "dial_code": "+60",
    "code": "MY"
    },
    {
    "name": "Maldives",
    "dial_code": "+960",
    "code": "MV"
    },
    {
    "name": "Mali",
    "dial_code": "+223",
    "code": "ML"
    },
    {
    "name": "Malta",
    "dial_code": "+356",
    "code": "MT"
    },
    {
    "name": "Marshall Islands",
    "dial_code": "+692",
    "code": "MH"
    },
    {
    "name": "Martinique",
    "dial_code": "+596",
    "code": "MQ"
    },
    {
    "name": "Mauritania",
    "dial_code": "+222",
    "code": "MR"
    },
    {
    "name": "Mauritius",
    "dial_code": "+230",
    "code": "MU"
    },
    {
    "name": "Mayotte",
    "dial_code": "+262",
    "code": "YT"
    },
    {
    "name": "Mexico",
    "dial_code": "+52",
    "code": "MX"
    },
    {
    "name": "Micronesia, Federated States of Micronesia",
    "dial_code": "+691",
    "code": "FM"
    },
    {
    "name": "Moldova",
    "dial_code": "+373",
    "code": "MD"
    },
    {
    "name": "Monaco",
    "dial_code": "+377",
    "code": "MC"
    },
    {
    "name": "Mongolia",
    "dial_code": "+976",
    "code": "MN"
    },
    {
    "name": "Montenegro",
    "dial_code": "+382",
    "code": "ME"
    },
    {
    "name": "Montserrat",
    "dial_code": "+1664",
    "code": "MS"
    },
    {
    "name": "Morocco",
    "dial_code": "+212",
    "code": "MA"
    },
    {
    "name": "Mozambique",
    "dial_code": "+258",
    "code": "MZ"
    },
    {
    "name": "Myanmar",
    "dial_code": "+95",
    "code": "MM"
    },
    {
    "name": "Namibia",
    "dial_code": "+264",
    "code": "NA"
    },
    {
    "name": "Nauru",
    "dial_code": "+674",
    "code": "NR"
    },
    {
    "name": "Nepal",
    "dial_code": "+977",
    "code": "NP"
    },
    {
    "name": "Netherlands",
    "dial_code": "+31",
    "code": "NL"
    },
    {
    "name": "Netherlands Antilles",
    "dial_code": "+599",
    "code": "AN"
    },
    {
    "name": "New Caledonia",
    "dial_code": "+687",
    "code": "NC"
    },
    {
    "name": "New Zealand",
    "dial_code": "+64",
    "code": "NZ"
    },
    {
    "name": "Nicaragua",
    "dial_code": "+505",
    "code": "NI"
    },
    {
    "name": "Niger",
    "dial_code": "+227",
    "code": "NE"
    },
    {
    "name": "Nigeria",
    "dial_code": "+234",
    "code": "NG"
    },
    {
    "name": "Niue",
    "dial_code": "+683",
    "code": "NU"
    },
    {
    "name": "Norfolk Island",
    "dial_code": "+672",
    "code": "NF"
    },
    {
    "name": "Northern Mariana Islands",
    "dial_code": "+1670",
    "code": "MP"
    },
    {
    "name": "Norway",
    "dial_code": "+47",
    "code": "NO"
    },
    {
    "name": "Oman",
    "dial_code": "+968",
    "code": "OM"
    },
    {
    "name": "Pakistan",
    "dial_code": "+92",
    "code": "PK"
    },
    {
    "name": "Palau",
    "dial_code": "+680",
    "code": "PW"
    },
    {
    "name": "Palestinian Territory, Occupied",
    "dial_code": "+970",
    "code": "PS"
    },
    {
    "name": "Panama",
    "dial_code": "+507",
    "code": "PA"
    },
    {
    "name": "Papua New Guinea",
    "dial_code": "+675",
    "code": "PG"
    },
    {
    "name": "Paraguay",
    "dial_code": "+595",
    "code": "PY"
    },
    {
    "name": "Peru",
    "dial_code": "+51",
    "code": "PE"
    },
    {
    "name": "Philippines",
    "dial_code": "+63",
    "code": "PH"
    },
    {
    "name": "Pitcairn",
    "dial_code": "+872",
    "code": "PN"
    },
    {
    "name": "Poland",
    "dial_code": "+48",
    "code": "PL"
    },
    {
    "name": "Portugal",
    "dial_code": "+351",
    "code": "PT"
    },
    {
    "name": "Puerto Rico",
    "dial_code": "+1939",
    "code": "PR"
    },
    {
    "name": "Qatar",
    "dial_code": "+974",
    "code": "QA"
    },
    {
    "name": "Romania",
    "dial_code": "+40",
    "code": "RO"
    },
    {
    "name": "Russia",
    "dial_code": "+7",
    "code": "RU"
    },
    {
    "name": "Rwanda",
    "dial_code": "+250",
    "code": "RW"
    },
    {
    "name": "Reunion",
    "dial_code": "+262",
    "code": "RE"
    },
    {
    "name": "Saint Barthelemy",
    "dial_code": "+590",
    "code": "BL"
    },
    {
    "name": "Saint Helena, Ascension and Tristan Da Cunha",
    "dial_code": "+290",
    "code": "SH"
    },
    {
    "name": "Saint Kitts and Nevis",
    "dial_code": "+1869",
    "code": "KN"
    },
    {
    "name": "Saint Lucia",
    "dial_code": "+1758",
    "code": "LC"
    },
    {
    "name": "Saint Martin",
    "dial_code": "+590",
    "code": "MF"
    },
    {
    "name": "Saint Pierre and Miquelon",
    "dial_code": "+508",
    "code": "PM"
    },
    {
    "name": "Saint Vincent and the Grenadines",
    "dial_code": "+1784",
    "code": "VC"
    },
    {
    "name": "Samoa",
    "dial_code": "+685",
    "code": "WS"
    },
    {
    "name": "San Marino",
    "dial_code": "+378",
    "code": "SM"
    },
    {
    "name": "Sao Tome and Principe",
    "dial_code": "+239",
    "code": "ST"
    },
    {
    "name": "Saudi Arabia",
    "dial_code": "+966",
    "code": "SA"
    },
    {
    "name": "Senegal",
    "dial_code": "+221",
    "code": "SN"
    },
    {
    "name": "Serbia",
    "dial_code": "+381",
    "code": "RS"
    },
    {
    "name": "Seychelles",
    "dial_code": "+248",
    "code": "SC"
    },
    {
    "name": "Sierra Leone",
    "dial_code": "+232",
    "code": "SL"
    },
    {
    "name": "Singapore",
    "dial_code": "+65",
    "code": "SG"
    },
    {
    "name": "Slovakia",
    "dial_code": "+421",
    "code": "SK"
    },
    {
    "name": "Slovenia",
    "dial_code": "+386",
    "code": "SI"
    },
    {
    "name": "Solomon Islands",
    "dial_code": "+677",
    "code": "SB"
    },
    {
    "name": "Somalia",
    "dial_code": "+252",
    "code": "SO"
    },
    {
    "name": "South Africa",
    "dial_code": "+27",
    "code": "ZA"
    },
    {
    "name": "South Sudan",
    "dial_code": "+211",
    "code": "SS"
    },
    {
    "name": "South Georgia and the South Sandwich Islands",
    "dial_code": "+500",
    "code": "GS"
    },
    {
    "name": "Spain",
    "dial_code": "+34",
    "code": "ES"
    },
    {
    "name": "Sri Lanka",
    "dial_code": "+94",
    "code": "LK"
    },
    {
    "name": "Sudan",
    "dial_code": "+249",
    "code": "SD"
    },
    {
    "name": "Suriname",
    "dial_code": "+597",
    "code": "SR"
    },
    {
    "name": "Svalbard and Jan Mayen",
    "dial_code": "+47",
    "code": "SJ"
    },
    {
    "name": "Swaziland",
    "dial_code": "+268",
    "code": "SZ"
    },
    {
    "name": "Sweden",
    "dial_code": "+46",
    "code": "SE"
    },
    {
    "name": "Switzerland",
    "dial_code": "+41",
    "code": "CH"
    },
    {
    "name": "Syrian Arab Republic",
    "dial_code": "+963",
    "code": "SY"
    },
    {
    "name": "Taiwan",
    "dial_code": "+886",
    "code": "TW"
    },
    {
    "name": "Tajikistan",
    "dial_code": "+992",
    "code": "TJ"
    },
    {
    "name": "Tanzania, United Republic of Tanzania",
    "dial_code": "+255",
    "code": "TZ"
    },
    {
    "name": "Thailand",
    "dial_code": "+66",
    "code": "TH"
    },
    {
    "name": "Timor-Leste",
    "dial_code": "+670",
    "code": "TL"
    },
    {
    "name": "Togo",
    "dial_code": "+228",
    "code": "TG"
    },
    {
    "name": "Tokelau",
    "dial_code": "+690",
    "code": "TK"
    },
    {
    "name": "Tonga",
    "dial_code": "+676",
    "code": "TO"
    },
    {
    "name": "Trinidad and Tobago",
    "dial_code": "+1868",
    "code": "TT"
    },
    {
    "name": "Tunisia",
    "dial_code": "+216",
    "code": "TN"
    },
    {
    "name": "Turkey",
    "dial_code": "+90",
    "code": "TR"
    },
    {
    "name": "Turkmenistan",
    "dial_code": "+993",
    "code": "TM"
    },
    {
    "name": "Turks and Caicos Islands",
    "dial_code": "+1649",
    "code": "TC"
    },
    {
    "name": "Tuvalu",
    "dial_code": "+688",
    "code": "TV"
    },
    {
    "name": "Uganda",
    "dial_code": "+256",
    "code": "UG"
    },
    {
    "name": "Ukraine",
    "dial_code": "+380",
    "code": "UA"
    },
    {
    "name": "United Arab Emirates",
    "dial_code": "+971",
    "code": "AE"
    },
    {
    "name": "United Kingdom",
    "dial_code": "+44",
    "code": "GB"
    },
    {
    "name": "United States",
    "dial_code": "+1",
    "code": "US"
    },
    {
    "name": "Uruguay",
    "dial_code": "+598",
    "code": "UY"
    },
    {
    "name": "Uzbekistan",
    "dial_code": "+998",
    "code": "UZ"
    },
    {
    "name": "Vanuatu",
    "dial_code": "+678",
    "code": "VU"
    },
    {
    "name": "Venezuela, Bolivarian Republic of Venezuela",
    "dial_code": "+58",
    "code": "VE"
    },
    {
    "name": "Vietnam",
    "dial_code": "+84",
    "code": "VN"
    },
    {
    "name": "Virgin Islands, British",
    "dial_code": "+1284",
    "code": "VG"
    },
    {
    "name": "Virgin Islands, U.S.",
    "dial_code": "+1340",
    "code": "VI"
    },
    {
    "name": "Wallis and Futuna",
    "dial_code": "+681",
    "code": "WF"
    },
    {
    "name": "Yemen",
    "dial_code": "+967",
    "code": "YE"
    },
    {
    "name": "Zambia",
    "dial_code": "+260",
    "code": "ZM"
    },
    {
    "name": "Zimbabwe",
    "dial_code": "+263",
    "code": "ZW"
    }
]

export const disciplines=[
    "Agriculture & Forestry",
    "Applied Sciences & Professions",
    "Arts, Design & Architecture",
    "Business & Management",
    "Computer Science & IT",
    "Education & Training",
    "Engineering & Technology",
    "Environmental Studies & Earth Sciences",
    "Hospitality, Leisure & Sports",
    "Humanities",
    "Journalism & Media",
    "Law",
    "Medicine & Health",
    "Natural Sciences & Mathematics",
    "Social Sciences",
]

export const subDisciplines=[
    'Agriculture',
  'Animal Science',
  'Food Technology',
  'Forestry',
  'Horticulture and Crop Science',
  'Marine Science',
  'Aviation Studies',
  'Emergency & Disaster Management',
  'Family & Consumer Science',
  'Fashion, Textiles and Luxury Goods',
  'Food Science',
  'Forensic Science',
  'Library Science',
  'Military Science',
  'Museum Studies',
  'Real Estate & Property Management',
  'Social Work',
  'Architecture',
  'Art and Craft',
  'Art History',
  'Ceramics and Sculpture',
  'Dance',
  'Design',
  'Drama',
  'Fashion Design',
  'Film Studies',
  'Fine Arts',
  'Graphic Design',
  'Industrial Design',
  'Interior Design',
  'Landscape Architecture',
  'Music',
  'Music Composition',
  'Music Performance',
  'Musicology',
  'Painting & Drawing',
  'Photography',
  'Urban Planning',
  'Visual Arts',
  'Accounting',
  'Actuarial Science',
  'Advertising',
  'Agribusiness',
  'Auditing',
  'Banking',
  'Business Administration',
  'Business Intelligence',
  'Commerce',
  'Construction Management',
  'Corporate Communication',
  'Corporate Social Responsibility',
  'Digital Marketing',
  'Digital Media',
  'Engineering Management',
  'Entrepreneurship',
  'Executive MBA',
  'Fashion Management',
  'Finance',
  'Financial Management',
  'Financial Technology',
  'Forensic Accounting',
  'Human Resource Management',
  'Innovation Management',
  'Insurance',
  'International Business',
  'Investment',
  'IT Management',
  'Leadership',
  'Management of Creative Industries',
  'Management Studies',
  'Marketing',
  'Marketing Management',
  'Master in Business Administration (MBA)',
  'Master in Management (MIM)',
  'Operations and Quality Management',
  'Project Management',
  'Public Administration',
  'Retail Management',
  'Risk Management',
  'Strategic Management',
  'Supply Chain Management & Logistics',
  'Taxation',
  'Transport Management',
  'Animation',
  'Artificial Intelligence',
  'Business Information Systems',
  'Computer Sciences',
  'Cyber Security',
  'Data Analytics',
  'Data Science & Big Data',
  'Game Design',
  'Geographical Information Systems (GIS)',
  'Health Informatics',
  'Human Computer Interaction',
  'Information Systems',
  'Information Technology (IT)',
  'Machine Learning',
  'Software Engineering',
  'User Experience Design',
  'Web Technologies & Cloud',
  'Adult Education',
  'Art Education',
  'Coaching',
  'Early Childhood Education',
  'Education',
  'Educational Leadership',
  'Educational Psychology',
  'Educational Research',
  'Health Education',
  'Higher Education',
  'Instructional Design',
  'Literacy Education',
  'Primary Education',
  'School Counselling',
  'Secondary Education',
  'Special Education',
  'STEM Education',
  'Teaching',
  'Teaching English as a Foreign Language',
  'Aerospace Engineering',
  'Automotive Engineering',
  'Bio & Biomedical Engineering',
  'Chemical Engineering',
  'Civil Engineering & Construction',
  'Communications Engineering',
  'Electrical Engineering',
  'Electronics & Embedded Technology',
  'Energy Engineering',
  'Environmental Engineering',
  'General Engineering & Technology',
  'Industrial & Systems Engineering',
  'Marine Engineering',
  'Materials Science',
  'Mechanical Engineering',
  'Mechatronics',
  'Mining, Oil & Gas',
  'Nuclear Engineering',
  'Production and Manufacturing Engineering',
  'Robotics',
  'Sound Engineering',
  'Structural Engineering',
  'Sustainable Energy',
  'Transportation Engineering',
  'Biodiversity & Conservation',
  'Climate Studies & Meteorology',
  'Earth Sciences',
  'Ecology',
  'Environmental Economics & Policy',
  'Environmental Management',
  'Environmental Sciences',
  'Geology',
  'Hydrology & Water Management',
  'Natural Resource Management',
  'Soil Science',
  'Sustainable Development',
  'Toxicology',
  'Culinary Arts',
  'Event Management',
  'Hospitality Management',
  'Sport and Exercise Science',
  'Sports Management',
  'Tourism & Leisure',
  'Ancient History',
  'Christian Studies',
  'Classics',
  'Creative Writing',
  'ESL',
  'Ethics',
  'General Studies',
  'History',
  'Islamic Studies',
  'Language Studies',
  'Liberal Arts',
  'Linguistics',
  'Literature',
  'Modern History',
  'Philosophy',
  'Theology and Religious Studies',
  'Journalism',
  'Media Management',
  'Media Studies & Mass Media',
  'Public Relations',
  'Publishing',
  'Translation & Interpreting',
  'Business Law',
  'Civil & Private Law',
  'Criminal Justice',
  'Criminal Law',
  'European Law',
  'International Law',
  'Legal Studies',
  'Master of Laws (LLM)',
  'Patent & Intellectual Property Law',
  'Public Law',
  'Biomedical Science',
  'Clinical Psychology',
  'Complementary & Alternative Medicine',
  'Dentistry',
  'Epidemiology',
  'Gerontology',
  'Health Administration',
  'Health Sciences',
  'Immunology',
  'Kinesiology',
  'Medical Imaging',
  'Medicine',
  'Midwifery',
  'Nursing',
  'Nutrition & Dietetics',
  'Occupational Health and Safety',
  'Occupational Therapy',
  'Optometry',
  'Pathology',
  'Pharmacy',
  'Physiology',
  'Physiotherapy',
  'Prosthetics and Orthotics',
  'Public Health',
  'Speech Pathology',
  'Veterinary Medicine',
  'Anatomy',
  'Applied Mathematics',
  'Astronomy & Space Sciences',
  'Biochemistry',
  'Bioinformatics & Biostatistics',
  'Biology',
  'Biotechnology',
  'Botany',
  'Chemistry',
  'Computational Mathematics',
  'Financial Mathematics',
  'Genetics',
  'Mathematics',
  'Microbiology',
  'Molecular Sciences',
  'Nanoscience and Nanotechnology',
  'Natural Sciences',
  'Neuroscience',
  'Oceanography',
  'Operations Research',
  'Pharmacology',
  'Physics',
  'Statistics',
  'Zoology',
  'African Studies',
  'American and Australasian studies',
  'Anthropology',
  'Archaeology',
  'Area & Cultural Studies',
  'Art Therapy',
  'Asian Studies',
  'Childhood Studies',
  'Cognitive Science',
  'Communication Studies',
  'Community Development',
  'Counselling Psychology',
  'Criminology',
  'Developmental Psychology',
  'Diplomacy',
  'Econometrics',
  'Economics',
  'Ethnic Studies',
  'European Studies',
  'Forensic Psychology',
  'French Studies',
  'Gender & Sexuality Studies',
  'Geography',
  'German and Scandinavian Studies',
  'Iberian Studies',
  'International Development',
  'International Relations',
  'Italian Studies',
  'Middle Eastern Studies',
  'Organisational Behaviour',
  'Political Science',
  'Psychology',
  'Public Policy',
  'Slavic Studies',
  'Social Policy',
  'Social Psychology',
  'Sociology',
  'Terrorism & Security'
]

export const intakes=[
    {label: "January-March", value: "0" },
    {label: "April-June", value:  "1" },
    {label: "July-September", value: "2"},
    {label: "October-December", value:  '3'},
]

export const studyLevel=[
    "Pre-Master",
    "Postgraduate Diploma",
    "Postgraduate Certificate",
    "PMP",
    "P.S.M.",
    "MUD",
    "MTPC",
    "MTDA",
    "MTaxDA",
    "MSWENGR",
    "MSWE",
    "MSSP & Certificate",
    "MSSE",
    "MSPH",
    "MSPE",
    "MSN",
    "MSIT",
    "MSIS/MPAff",
    "MSIS/MA",
    "MSIS",
    "MSiA",
    "MSEE",
    "MSEd",
    "MSECE",
    "MSE",
    "MSDA",
    "MSD",
    "MSCS",
    "MSCR",
    "MSCPE",
    "MSCP",
    "MSBA",
    "MSACI",
    "MSAA",
    "MS+MBA",
    "MS/MS",
    "MS/MBA",
    "MS.Ed.",
    "MS/MEng",
    "Ms",
    "MQST",
    "MPS",
    "MPH-MS",
    "MPH",
    "MPA",
    "MNS",
    "MLS",
    "MLA",
    "MITS",
    "MIS",
    "MiDAS",
    "MIBS",
    "MHIT",
    "MHID",
    "MHCI",
    "MHA/MS",
    "MHA",
    "MGIS",
    "MFA",
    "MECPS",
    "MDS",
    "MDes",
    "MDATA",
    "MDA",
    "MCST",
    "MCS",
    "MCRP",
    "MCR",
    "MCIS",
    "MCD",
    "MBT",
    "MBAn",
    "MBA/MSISA",
    "MBA/MSIS",
    "MBA/MSHI",
    "MBA/MS",
    "MBA/MHA",
    "MBA / M.Sc.",
    "MAT",
    "Master",
    "MASc",
    "MAS",
    "MAGIST",
    "MAG",
    "MAcc",
    "MAC",
    "MA/MSc",
    "MA/MPA",
    "MA/MFA",
    "MA + MLIS",
    "M.U.R.P.",
    "M.U.P.M.Sc./M.Eng.M.Sc. / MCSM.Sc. / M.S.EM.Sc. / M.Eng.M.Sc.",
    "M.S.I.T.",
    "M.S.I.S.",
    "M.S.Ed.",
    "M.S.E.E. / M.Eng.",
    "M.S.E.E.",
    "M.S.E.",
    "M.S.E",
    "M.S.C.S.E.",
    "M.S.C.P.S.",
    "M.S.A",
    "M.S., M.Eng.",
    "M.S.",
    "M.Res.",
    "M.R.P.",
    "M.P.S.",
    "M.P.P.",
    "M.P.H.",
    "M.I.S.M.",
    "M.I.S.",
    "M.I.M.S.",
    "M.H.I.",
    "M.G.I.S.",
    "M.F.A.",
    "M.F.A",
    "M.Eng./M.Sc.",
    "M.Eng.",
    "M.Ed./M.Sc.",
    "M.Ed.",
    "M.Des.",
    "M.D.A.",
    "M.D.",
    "M.C.S.",
    "M.B.A./M.Sc.",
    "M.B.A.",
    "M.Acc.",
    "M.Acc",
    "M.A.S.",
    "M.A./M.S.",
    "M.A. / M.Sc. / M.F.A",
    "M.A.",
    "LL.M.",
    "JD/MS",
    "EMPH",
    "DNP",
    "Combined Credential",
    "CERTG",
    "B.S. + M.S.",
  ]

export const topUniversities=[
    "Harvard University",
    "University of Oxford",
    "Stanford University",
    "Massachusetts Institute of Technology",
    "University of Cambridge",
    
]

  export const undergradCourses = {
      "Bachelor of Arts (BA)": [
          "Advertising",
          "Anthropology",
          "Archaeology",
          "Business Economics",
          "Cinema Science",
          "Communication Studies",
          "Computer Applications",
          "Criminology",
          "Economics",
          "Education",
          "Entrepreneurship  and  Small Business",
          "Fine Arts",
          "Geography",
          "History",
          "Home Science",
          "Journalism and Mass Communication",
          "Literature",
          "Linguistics",
          "LLB",
          "Mathematics",
          "Music",
          "Philosophy",
          "Physical Education",
          "Political Science",
          "Psychology",
          "Public Administration",
          "Rural Studies",
          "Social Work",
          "Sociology",
          "Statistics",
          "Theology"
      ],
      "Bachelor of Science (BSc)": [
          "Aeronautics",
          "Agriculture",
          "Anatomy",
          "Anesthesia",
          "Animation",
          "Anthropology",
          "Aviation",
          "Biochemistry",
          "Biology",
          "Biotechnology",
          "Botany",
          "Cardiology",
          "Chemistry",
          "Clinical Research",
          "Computer Science",
          "Ecology",
          "Economics",
          "Environmental Science",
          "Fashion Designing",
          "Food Technology",
          "Forestry",
          "Geography",
          "Geology",
          "Healthcare Management",
          "Home Science",
          "Hospitality Management",
          "Information Technology (IT)",
          "Life Sciences",
          "Mathematics",
          "Microbiology",
          "Molecular Biology",
          "Nautical Science",
          "Nursing",
          "Nutrition and Dietetics",
          "Physics",
          "Product Design",
          "Psychology",
          "Radiology",
          "Statistics",
          "Visual Communication",
          "Zoology"
      ],
      "Bachelor of Commerce (BCom)": [
          "Cost accounting",
          "Foreign trade",
          "E-commerce",
          "Business economics/law/finance",
          "Taxation",
          "Marketing",
          "Advertising",
          "Sales management",
          "Office management"
      ],
      "Bachelor of Engg./Tech (BEngg/BTech)": [
          "Aeronautical Engineering",
          "Aerospace Engineering",
          "Applied Electronics & Instrumentation",
          "Agricultural Engineering",
          "Automobile Engg",
          "Bio Chemical Engineering",
          "Bio Medical Engineering",
          "Bio Technology",
          "Bioinformatics",
          "Chemical & Alcohol Technology",
          "Chemical Engineering",
          "Civil Engineering",
          "Computer Science",
          "Computer Science & Engg",
          "Electrical & Electronics Engineering",
          "Electrical Engineering",
          "Electronics & Communication Engineering",
          "Electronics & Instrumentation Engineering",
          "Electronics & Telecomm Engineering",
          "Electronics Engineering",
          "Electronics Instrumentation & Control",
          "Environmental Engineering",
          "Energy Technology",
          "Fire & Safety Engineering",
          "Food Technology",
          "Geo-Informatics Engineering",
          "Geo-Science Engineering",
          "Genetic Engineering",
          "Industrial Engineering",
          "Industrial Production Engineering",
          "Information Technology",
          "Instrumentation & Control",
          "Instrumentation Engineering",
          "Leather Technology",
          "Man Made Fibre Technology",
          "Manufacturing Technology",
          "Marine Engineering",
          "Material Science",
          "Mechanical & Industrial Engineering",
          "Mechanical Engineering",
          "Metallurgical Engineering",
          "Mining Engineering",
          "Mechatronics Engineering",
          "Naval Architecture",
          "Nuclear Science and Engineering",
          "Oil Technology",
          "Ocean Engineering",
          "Paint Technology",
          "Plastic Technology",
          "Production & Industrial Engineering",
          "Production Engineering",
          "Pharmaceutical Technology/B-pharma",
          "Software Engineering",
          "Textile Chemistry",
          "Textile Engineering",
          "Textile Technology",
          "Transportation Engineering"
      ],
      "BMS/BBA/BBS": [
          "Accounting",
          "Airport Capacity Management",
          "Analytics and Big Data",
          "Aviation Management",
          "Big Data Analytics and Mining",
          "Computer Application",
          "Digital Business",
          "Digital Marketing",
          "Digital Media Laws",
          "Entrepreneurship",
          "Events Public Relations and Corporate Communications",
          "Finance",
          "Foreign Trade",
          "Global business management",
          "Green Energy and Sustainability",
          "Green Energy Business",
          "Hospital & Healthcare",
          "Hospitality",
          "Human resource management",
          "Information Systems",
          "Integrated MBA",
          "International Business",
          "International Trade Negotiations",
          "Logistics Management",
          "Marketing",
          "BBA in Marketing and Analytics",
          "Marketing Campaigns and Strategic Communications",
          "Media Management",
          "Oil and Gas Marketing",
          "Oil and Gas Operations",
          "Petroleum Business",
          "Regional Economic Integration",
          "Retail",
          "Service Operations",
          "Services management",
          "Social Media",
          "Sports Management",
          "Supply Chain",
          "Sustainable Development",
          "Tourism management",
          "Travel and Tour Operations"
      ],
      "Bachelor of Law (LLB)": [
          "criminal law",
          "civil law",
          "labor law",
          "international law"
      ],
      "Bachelor of Design (BDes)": [
          "Accessory Design",
          "Animation and VFX",
          "Animation Film Design",
          "Ceramic and Glass Design",
          "Communication Design",
          "Exhibition Design",
          "Fashion Communication & Styling",
          "Fashion Design",
          "Film and Video Communication",
          "Footwear Designs and Production",
          "Furniture and Interior Design",
          "Graphic Design",
          "Industrial Design",
          "Interior Architecture",
          "Knitwear Design",
          "Leather Design",
          "Lifestyle and Accessory Design",
          "Product Design",
          "Textile Design",
          "UX Design",
          "Visual Communication.",
          "Interior Design"
      ],
      "Bachelor of Hotel Management (BHM)": [
          "Hotel Operations Management",
          "Food and Beverage Management",
          "Event Management",
          "Hospitality Marketing",
          "Financial Management for Hospitality",
          "Human Resource Management",
          "Tourism and Travel Management",
          "Culinary Arts"
      ],
      "Bachelor of Pharmacy (BPharm)": [
          "Pharmaceutical Chemistry",
          "Pharmacology",
          "Pharmacognosy",
          "Pharmaceutics",
          "Hospital Pharmacy",
          "Clinical Pharmacy",
          "Regulatory Affairs",
          "Industrial Pharmacy",
          "Community Pharmacy"
      ],
      "Bachelor of Medicine (MBBS)": [
          "Anatomy",
          "Physiology",
          "Biochemistry",
          "Pathology",
          "Pharmacology",
          "Microbiology",
          "Forensic Medicine",
          "Community Medicine",
          "Internal Medicine",
          "Surgery",
          "Pediatrics",
          "Obstetrics and Gynecology",
          "Psychiatry",
          "Dermatology",
          "Ophthalmology",
          "Otorhinolaryngology (ENT)",
          "Anesthesiology",
          "Radiology",
          "Emergency Medicine",
          "Orthopedics",
          "Cardiology",
          "Gastroenterology",
          "Neurology",
          "Nephrology",
          "Pulmonology",
          "Endocrinology",
          "Hematology",
          "Oncology",
          "Rheumatology",
          "Infectious Diseases",
          "Geriatrics",
          "Palliative Care"
      ],
      "Bachelor of Dental Surgery (BDS)": [
          "Oral Anatomy",
          "Oral Physiology",
          "Oral Histology",
          "Oral Pathology",
          "Pharmacology for Dentistry",
          "Microbiology for Dentistry",
          "General Medicine",
          "General Surgery",
          "Oral Medicine and Radiology",
          "Periodontology",
          "Pedodontics (Pediatric Dentistry)",
          "Orthodontics",
          "Prosthodontics",
          "Endodontics",
          "Oral and Maxillofacial Surgery",
          "Conservative Dentistry and Endodontics",
          "Public Health Dentistry",
          "Forensic Odontology",
          "Dental Materials",
          "Oral Implantology",
          "Aesthetic Dentistry",
          "Oral Oncology",
          "Oral Rehabilitation"
      ],
      "Bachelor of Science in Nursing (BSc Nursing)": [
          "Anatomy and Physiology",
          "Nutrition and Dietetics",
          "Microbiology",
          "Biochemistry",
          "Pharmacology",
          "Pathology",
          "Community Health Nursing",
          "Medical-Surgical Nursing",
          "Pediatric Nursing",
          "Obstetrics and Gynecology Nursing",
          "Psychiatric Nursing",
          "Critical Care Nursing",
          "Emergency Nursing",
          "Oncology Nursing",
          "Geriatric Nursing",
          "Rehabilitation Nursing",
          "Nursing Education",
          "Nursing Informatics",
          "Forensic Nursing",
          "Palliative Care Nursing",
          "Public Health Nursing",
          "Occupational Health Nursing",
          "Cardiac Nursing",
          "Neuroscience Nursing",
          "Perioperative Nursing"
      ]
  }
  
  export let pgCourses = {
      "Master of Arts (MA)": [
          "Advertising",
          "Anthropology",
          "Archaeology",
          "Business Economics",
          "Cinema Science",
          "Communication Studies",
          "Computer Applications",
          "Criminology",
          "Economics",
          "Education",
          "Entrepreneurship and Small Business",
          "Fine Arts",
          "Geography",
          "History",
          "Home Science",
          "Journalism and Mass Communication",
          "Literature",
          "Linguistics",
          "LLM",
          "Mathematics",
          "Music",
          "Philosophy",
          "Physical Education",
          "Political Science",
          "Psychology",
          "Public Administration",
          "Rural Studies",
          "Social Work",
          "Sociology",
          "Statistics",
          "Theology"
      ],
      "Master of Science (MSc)": [
          "Aeronautics",
          "Agriculture",
          "Anatomy",
          "Anesthesia",
          "Animation",
          "Anthropology",
          "Aviation",
          "Biochemistry",
          "Biology",
          "Biotechnology",
          "Botany",
          "Cardiology",
          "Chemistry",
          "Clinical Research",
          "Computer Science",
          "Ecology",
          "Economics",
          "Environmental Science",
          "Fashion Designing",
          "Food Technology",
          "Forestry",
          "Geography",
          "Geology",
          "Healthcare Management",
          "Home Science",
          "Hospitality Management",
          "Information Technology (IT)",
          "Life Sciences",
          "Mathematics",
          "Microbiology",
          "Molecular Biology",
          "Nautical Science",
          "Nursing",
          "Nutrition and Dietetics",
          "Physics",
          "Product Design",
          "Psychology",
          "Radiology",
          "Statistics",
          "Visual Communication",
          "Zoology"
      ],
      "Master of Commerce (M.Com)": [
          "Cost accounting",
          "Foreign trade",
          "E-commerce",
          "Business economics/law/finance",
          "Taxation",
          "Marketing",
          "Advertising",
          "Sales management",
          "Office management"
      ],
      "Master of Engineering (M.Engg/M.Tech)": [
          "Aeronautical Engineering",
          "Aerospace Engineering",
          "Applied Electronics & Instrumentation",
          "Agricultural Engineering",
          "Automobile Engg",
          "Bio Chemical Engineering",
          "Bio Medical Engineering",
          "Bio Technology",
          "Bioinformatics",
          "Chemical & Alcohol Technology",
          "Chemical Engineering",
          "Civil Engineering",
          "Computer Science",
          "Computer Science & Engg",
          "Electrical & Electronics Engineering",
          "Electrical Engineering",
          "Electronics & Communication Engineering",
          "Electronics & Instrumentation Engineering",
          "Electronics & Telecomm Engineering",
          "Electronics Engineering",
          "Electronics Instrumentation & Control",
          "Environmental Engineering",
          "Energy Technology",
          "Fire & Safety Engineering",
          "Food Technology",
          "Geo-Informatics Engineering",
          "Geo-Science Engineering",
          "Genetic Engineering",
          "Industrial Engineering",
          "Industrial Production Engineering",
          "Information Technology",
          "Instrumentation & Control",
          "Instrumentation Engineering",
          "Leather Technology",
          "Man Made Fibre Technology",
          "Manufacturing Technology",
          "Marine Engineering",
          "Material Science",
          "Mechanical & Industrial Engineering",
          "Mechanical Engineering",
          "Metallurgical Engineering",
          "Mining Engineering",
          "Mechatronics Engineering",
          "Naval Architecture",
          "Nuclear Science and Engineering",
          "Oil Technology",
          "Ocean Engineering",
          "Paint Technology",
          "Plastic Technology",
          "Production & Industrial Engineering",
          "Production Engineering",
          "Pharmaceutical Technology/M.Pharm",
          "Software Engineering",
          "Textile Chemistry",
          "Textile Engineering",
          "Textile Technology",
          "Transportation Engineering"
      ],
      "MMS/MBA/MBS": [
          "Accounting",
          "Airport Capacity Management",
          "Analytics and Big Data",
          "Aviation Management",
          "Big Data Analytics and Mining",
          "Computer Application",
          "Digital Business",
          "Digital Marketing",
          "Digital Media Laws",
          "Entrepreneurship",
          "Events Public Relations and Corporate Communications",
          "Finance",
          "Foreign Trade",
          "Global business management",
          "Green Energy and Sustainability",
          "Green Energy Business",
          "Hospital & Healthcare",
          "Hospitality",
          "Human resource management",
          "Information Systems",
          "Integrated MBA",
          "International Business",
          "International Trade Negotiations",
          "Logistics Management",
          "Marketing",
          "MBA in Marketing and Analytics",
          "Marketing Campaigns and Strategic Communications",
          "Media Management",
          "Oil and Gas Marketing",
          "Oil and Gas Operations",
          "Petroleum Business",
          "Regional Economic Integration",
          "Retail",
          "Service Operations",
          "Services management",
          "Social Media",
          "Sports Management",
          "Supply Chain",
          "Sustainable Development",
          "Tourism management",
          "Travel and Tour Operations"
      ],
      "Master of Law (LLM)": [
          "International Law",
          "Constitutional Law",
          "Criminal Law",
          "Corporate Law",
          "Environmental Law",
          "Intellectual Property Law",
          "Human Rights Law",
          "Tax Law",
          "Labour Law",
          "Family Law",
          "Health Law",
          "Commercial Law",
          "Maritime Law",
          "Banking and Finance Law",
          "European Union Law",
          "Media Law",
          "Arbitration and Dispute Resolution",
          "International Trade Law",
          "Legal Theory"
      ],
      "Master of Medicine (MD)": [
          "Anesthesiology",
          "Dermatology",
          "Emergency Medicine",
          "Family Medicine",
          "Internal Medicine",
          "Neurology",
          "Obstetrics and Gynecology",
          "Ophthalmology",
          "Orthopedic Surgery",
          "Otolaryngology (ENT)",
          "Pediatrics",
          "Psychiatry",
          "Radiology",
          "Surgery",
          "Urology",
          "Cardiology",
          "Endocrinology",
          "Gastroenterology",
          "Hematology",
          "Infectious Diseases",
          "Nephrology",
          "Oncology",
          "Pulmonology",
          "Rheumatology",
          "Sports Medicine",
          "Allergy and Immunology",
          "Geriatrics",
          "Pain Medicine",
          "Physical Medicine and Rehabilitation",
          "Preventive Medicine",
          "Sleep Medicine",
          "Transplantation Medicine"
      ],
      "Master of Dental Surgery (MDS)": [
          "Oral and Maxillofacial Surgery",
          "Orthodontics",
          "Periodontics",
          "Prosthodontics",
          "Endodontics",
          "Pediatric Dentistry",
          "Oral Medicine and Radiology",
          "Oral Pathology",
          "Public Health Dentistry",
          "Forensic Odontology",
          "Oral Implantology",
          "Aesthetic Dentistry",
          "Oral Oncology",
          "Geriatric Dentistry",
          "Dental Materials",
          "Operative Dentistry",
          "Cosmetic Dentistry"
      ],
      "Master of Science in Nursing (MSc Nursing)": [
          "Advanced Nursing Practice",
          "Adult Health Nursing",
          "Community Health Nursing",
          "Geriatric Nursing",
          "Maternal and Child Health Nursing",
          "Mental Health Nursing",
          "Nursing Administration",
          "Nursing Education",
          "Pediatric Nursing",
          "Public Health Nursing",
          "Critical Care Nursing",
          "Emergency Nursing",
          "Oncology Nursing",
          "Orthopedic Nursing",
          "Palliative Care Nursing",
          "Cardiac Nursing",
          "Neuroscience Nursing",
          "Perioperative Nursing",
          "Forensic Nursing",
          "Occupational Health Nursing",
          "Rehabilitation Nursing",
          "School Nursing",
          "Transcultural Nursing",
          "Wound Care Nursing"
      ]
  }

  export const Nationalities=["Afghan",
  "Albanian",
  "Algerian",
  "American",
  "Andorran",
  "Angolan",
  "Antiguans",
  "Argentinean",
  "Armenian",
  "Australian",
  "Austrian",
  "Azerbaijani",
  "Bahamian",
  "Bahraini",
  "Bangladeshi",
  "Barbadian",
  "Barbudans",
  "Batswana",
  "Belarusian",
  "Belgian",
  "Belizean",
  "Beninese",
  "Bhutanese",
  "Bolivian",
  "Bosnian",
  "Brazilian",
  "British",
  "Bruneian",
  "Bulgarian",
  "Burkinabe",
  "Burmese",
  "Burundian",
  "Cambodian",
  "Cameroonian",
  "Canadian",
  "Cape Verdean",
  "Central African",
  "Chadian",
  "Chilean",
  "Chinese",
  "Colombian",
  "Comoran",
  "Congolese",
  "Costa Rican",
  "Croatian",
  "Cuban",
  "Cypriot",
  "Czech",
  "Danish",
  "Djibouti",
  "Dominican",
  "Dutch",
  "East Timorese",
  "Ecuadorean",
  "Egyptian",
  "Emirian",
  "Equatorial Guinean",
  "Eritrean",
  "Estonian",
  "Ethiopian",
  "Fijian",
  "Filipino",
  "Finnish",
  "French",
  "Gabonese",
  "Gambian",
  "Georgian",
  "German",
  "Ghanaian",
  "Greek",
  "Grenadian",
  "Guatemalan",
  "Guinea-Bissauan",
  "Guinean",
  "Guyanese",
  "Haitian",
  "Herzegovinian",
  "Honduran",
  "Hungarian",
  "I-Kiribati",
  "Icelander",
  "Indian",
  "Indonesian",
  "Iranian",
  "Iraqi",
  "Irish",
  "Israeli",
  "Italian",
  "Ivorian",
  "Jamaican",
  "Japanese",
  "Jordanian",
  "Kazakhstani",
  "Kenyan",
  "Kittian and Nevisian",
  "Kuwaiti",
  "Kyrgyz",
  "Laotian",
  "Latvian",
  "Lebanese",
  "Liberian",
  "Libyan",
  "Liechtensteiner",
  "Lithuanian",
  "Luxembourger",
  "Macedonian",
  "Malagasy",
  "Malawian",
  "Malaysian",
  "Maldivan",
  "Malian",
  "Maltese",
  "Marshallese",
  "Mauritanian",
  "Mauritian",
  "Mexican",
  "Micronesian",
  "Moldovan",
  "Monacan",
  "Mongolian",
  "Moroccan",
  "Mosotho",
  "Motswana",
  "Mozambican",
  "Namibian",
  "Nauruan",
  "Nepalese",
  "New Zealander",
  "Nicaraguan",
  "Nigerian",
  "Nigerien",
  "North Korean",
  "Northern Irish",
  "Norwegian",
  "Omani",
  "Pakistani",
  "Palauan",
  "Panamanian",
  "Papua New Guinean",
  "Paraguayan",
  "Peruvian",
  "Polish",
  "Portuguese",
  "Qatari",
  "Romanian",
  "Russian",
  "Rwandan",
  "Saint Lucian",
  "Salvadoran",
  "Samoan",
  "San Marinese",
  "Sao Tomean",
  "Saudi",
  "Scottish",
  "Senegalese",
  "Serbian",
  "Seychellois",
  "Sierra Leonean",
  "Singaporean",
  "Slovakian",
  "Slovenian",
  "Solomon Islander",
  "Somali",
  "South African",
  "South Korean",
  "Spanish",
  "Sri Lankan",
  "Sudanese",
  "Surinamer",
  "Swazi",
  "Swedish",
  "Swiss",
  "Syrian",
  "Taiwanese",
  "Tajik",
  "Tanzanian",
  "Thai",
  "Togolese",
  "Tongan",
  "Trinidadian or Tobagonian",
  "Tunisian",
  "Turkish",
  "Tuvaluan",
  "Ugandan",
  "Ukrainian",
  "Uruguayan",
  "Uzbekistani",
  "Venezuelan",
  "Vietnamese",
  "Welsh",
  "Yemenite",
  "Zambian",
  "Zimbabwean"]
  


export {Industries,GradingSystems,Tests,Countrycodes}