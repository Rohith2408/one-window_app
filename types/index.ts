import React from "react"
import { ImageSourcePropType } from "react-native"

export interface Event{
    name:string,
    data?:any,
    triggerBy:string | number
}

export type Endpoint={
    category:string,
    tail:string,
    type:"GET"|"POST"|"PUT"|"DELETE",
    constructor:(data:any)=>{url:string,body:any}
}

export type ComponentInfo={
    id:string,
    props:any
}

export type Form={
    fields:FormField[],
    submit:{
        onSubmit:(fields:FormField[])=>void,
        successText:string,
        failureText:string,
        idleText:string
    },
    initialFocussedField?:number
}

export type FormField={
    id:string,
    componentInfo:{
        component:React.FC<any>,
        props:any
    },
    title:string,
    value:any,
    // isFocussed:boolean,
    onUpdate?:{
        event:string,
        handler?:(fields:FormField[],data:any)=>FormField[]
    },
    onFocus?:{
        event:string,
        handler?:any
    }
}

export type ListItem={
    label:string,
    value:string
}

export type Dropdown={
    options:{
        label:string,
        value:string
    }[],
    selectionMode:"single"|"multi",
    value:ListItem,
    isFocussed:boolean,
    eventHandler:(event:Event)=>void
}

export type Layout={
    component:string,
    screens:string[],
    props:any,
    invalidPathScreen:React.FC<any>
}

export type StackNavigator={
    screens:StackScreen[],
    invalidPathScreen:React.FC
    //swipeStripWidth:number
}

export type StackScreen={
    id:string,
    swipable:boolean,
    component:string,
    props:any,
    animationStyle?:"HorizontalSlideToLeft"|"HorizontalSlideToRight"|"VerticalSlideToTopPartial"|"VerticalSlideToTop"|"VerticalSlideToBottom"|"Custom",
    initialPosition?:{
        top:number,
        left:number
    }
}

export type TabNavigator={
    screens:TabScreen[],
    initialTab:ComponentInfo,
    invalidPathScreen:React.FC
}

export type TabScreen={
    id:string,
    component:React.FC<any>,
    // props:any,
    //animationStyle:"HorizontalSlideToLeft"|"HorizontalSlideToRight"|"VerticalSlideToTop"|"VerticalSlideToBottom"|"Custom",
    // initialPosition?:{
    //     top:number,
    //     left:number
    // }
}

export type CartItem={
    category: string,
    course: {
        tuitionFee: {
            tuitionFee: number,
            tuitionFeeType: string
        },
        applicationDetails: {
            applicationFee: number,
            applicationFeeLink: string
        },
        currency: {
            symbol: string,
            code:string
        },
        _id: string,
        university: {
            location: {
                country:string,
                state: string,
                city: string
            },
            _id: string,
            name: string,
            logoSrc: string,
            type: string,
            establishedYear: number
        },
        name: string,
        subDiscipline: string,
        schoolName: string,
        discipline: string,
        studyLevel: string,
        duration: number,
        studyMode: string[],
        startDate: {
            _id: string,
            courseStarting: string,
            Deadline: string,
            courseStartingMonth: number,
            deadlineMonth: number
        }[],
        elite: true
    },
    intake: string,
    _id: string
}

export type wishlistItem={
    location: Location,
    tuitionFee?:{
        tuitionFee: number,
        tuitionFeeType:string
    },
    stemDetails: {
        stem: boolean
    }
    AdmissionsRequirements?: {
        LanguageRequirements?: {
            _id: string,
            testName: string,
            Accepted: string,
            minScore: number
        }[],
        AcademicRequirements?: {
            _id: string,
            testName: string,
            required:string,
            minScore: string
        }[],
        generalRequirements?: string[]
    },
    currency?: {
        symbol: string,
        code: string
    },
    applicationDetails: {
        applicationFee: string,
        applicationFeeLink:string
    },
    _id: string,
    university?: {
        location?:Location,
        currency?: {
            symbol: string,
            code:string
        },
        _id: string,
        name: string,
        logoSrc: string,
        type: string,
        establishedYear:number,
        ranking?: {
            _id: string,
            rank:number,
            source: string
        }[],
        cost?:{
            name: string,
            lowerLimit: number,
            upperLimit: number,
            _id: string
        }[]
    },
    name: string,
    subDiscipline: string,
    schoolName: string,
    about:string,
    discipline: string,
    studyLevel:string,
    totalCredits:string,
    duration: string,
    studyMode: string[],
    startDate?:{
        _id:string,
        courseStarting:string,
        Deadline: string,
        courseStartingMonth: number,
        deadlineMonth: number
    }[],
    type: string,
    unisName: string,
    elite: true
}

export interface University {
    location: Location,
    currency: {
        symbol:string,
        code: string
    },
    contact: {
        facebook: string,
        twitter:string,
        instagram: string,
        officialWebsite:string,
        linkedin: string,
        youtube: string
    },
    _id: string,
    name: string,
    logoSrc:string,
    type: string,
    establishedYear: number,
    about: string,
    updatedAt:string,
    roi: string,
    uni_rating: number,
    code: string,
    __v: number,
    community: string,
    cost:{
        _id: string,
        name: string,
        lowerLimit:number,
        upperLimit: number
    }[],
    profilesAdmits: [],
    scholarship:boolean,
    userReviews: [],
    average_temperatures: {
        summer: {
            min: string,
            max: string
        },
        winter: {
            min: string,
            max: string
        },
        spring: {
            min: string,
            max: string
        },
        autumn: {
            min: string,
            max: string
        }
    },
    courses:number,
    rank:any,   //ex: {"World University Rankings (2024)by Times Higher Education": 10}
    acceptanceRate: string,
    graduationRate: string,
    medianEarning: any, //ex: { "year": 83200}
    rating:{}   //ex: "Academics": "A+"
}

export interface Listings_University{
    location: Location,
    currency: {
        symbol: string,
        code: string
    },
    _id: string,
    ranking: {
        _id: string,
        rank: number,
        source: string
    }[],
    name: string,
    logoSrc: string,
    type: string,
    establishedYear: number,
    uni_rating:number,
    cost:{
        name: string,
        lowerLimit: number,
        upperLimit: number,
        _id: string
    } [],
    courses: {
        _id: string,
        name: string
    }[]
}

export interface Application{
    _id: string,
    university: {
        location:Location,
        _id: string,
        name: string,
        logoSrc: string,
        type: string,
        establishedYear: number
    },
    course: {
        tuitionFee: {
            tuitionFee: number,
            tuitionFeeType: string
        },
        currency: {
            symbol: string,
            code: string
        },
        _id:string,
        name: string,
        subDiscipline: string,
        schoolName: string,
        discipline: string,
        studyLevel:string,
        duration: 12,
        studyMode: string[],
        startDate:{
            _id: string,
            courseStarting: string,
            Deadline:string,
            courseStartingMonth: number,
            deadlineMonth: number
        }[]
    },
    intake: string,
    user: string,
    processCoordinator: string,
    counsellor: string,
    cancellationRequest: boolean,
    log: {
        status: string,
        stages: {
            name: string,
            updatedAt: string,
            _id: string
        }[],
        _id: string
    }[],
    status:string,
    stage: string,
    docChecklist: {
        name: string,
        isChecked: false,
        doc: Document,
        _id: string
    }[],
    createdAt: string,
    updatedAt: string,
    __v: number
}

export interface serverResponse{
    success:boolean,
    data:any,
    message:string,
    AccessToken?:string
}

export interface StoreItem<datatype>{
    requestStatus:"not_initiated" | "initiated",
    responseStatus:"recieved" | "not_recieved",
    haveAnIssue:boolean,
    issue:string,
    data:datatype
}

export type chatParticipantActions="online" | "typing" | "offline" | "inchat"

export interface Chat{
    _id: string,
    participants:Participant[],
    admins: [],
    unSeenMessages:{
            message: {
                _id: string,
                sender: {
                    _id: string,
                    displayPicSrc: string,
                    email: string,
                    userType: string,
                    firstName: string,
                    lastName: string
                },
                content: string,
                iv: string,
                chat: string,
                createdAt: string,
                updatedAt: string,
                __v:number
            },
            seen:string [],
            _id: string
        }[],
    createdAt: string,
    updatedAt: string,
    __v: number,
    lastMessage?: {
        _id: string,
        sender: string,
        content: string,
        iv: string,
        chat: string,
        createdAt:string,
        updatedAt: string,
        __v: number
    }
}

export interface Participant{
    _id: string,
    displayPicSrc: string,
    email: string,
    userType: "student"| "member",
    firstName: string,
    lastName: string,
    activity:chatParticipantActions,
    lastSeenMessageId?:string,
    role:string
}

export interface Message{
    _id: string,
    sender?: {
        _id: string,
        displayPicSrc: string|ImageSourcePropType,
        email: string,
        userType: string,
        firstName: string,
        lastName: string
    },
    content?:string,
    iv?: string,
    chat?: string,
    createdAt?: string,
    updatedAt?: string,
    type:"seen" | "normal" | "typing"
    __v?: number
}

export interface WorkExperience{
    _id?:string,
    companyName:string,
    sector:string//"entertainment"|"finance"|"medical"|"information technology"| "education"| "textile"| "media and news"| "food processing"|"hospitality"|"construction and engineering"| "law"|"paper"| "real estate"| "automobile"| "aviation"|"pharmaceutical"|"fertilizers"|"advertising"|"metallurgy"| "energy"|"telecommunications"|"retail"| "manufacturing"|"agriculture"|"chemicals"| "transportation and logistics"|"consumer goods"| "healthcare",
    type:string,//"full-time"|"part-time"|"freelancing"|"contract"|"remote"|"flexible"|"shift work"
    designation:string,
    startDate:string
    endDate:string
    Ongoing:boolean
    docId?:Document|undefined
}

export interface UniversityListObj{
    location: Location,
    currency: {
        symbol: string,
        code: string
    },
    _id: string,
    name: string,
    logoSrc: string,
    type: string,
    establishedYear: number,
    cost: {
        _id:string,
        name: string,
        lowerLimit: number,
        upperLimit: number
    }[],
    uni_rating: number,
    courses: number,
    acceptanceRate: string,
    graduationRate: string
}

export interface CourseListObj{
    tuitionFee: {
        tuitionFee: number,
        tuitionFeeType: string
    },
    stemDetails: {
        stem: boolean
    },
    currency: {
        symbol: string,
        code: string
    },
    _id:string,
    university: {
        location:Location ,
        _id: string,
        name: string,
        logoSrc: string,
        type: string,
        uni_rating: number
    },
    name:  string,
    subDiscipline: string,
    schoolName:  string,
    discipline:  string,
    studyLevel:  string,
    duration: number,
    studyMode: string [],
    startDate: {
        _id: string,
        courseStarting: string,
        Deadline: string,
        courseStartingMonth: number,
        deadlineMonth: number
    }[]
}

export interface EducationHistory{
    school?: EducationHistory_School ,
    plus2?:EducationHistory_Plus2 ,
    underGraduation?: EducationHistory_UnderGraduation ,
    postGraduation?:EducationHistory_PostGraduation 
}

export interface EducationHistory_School{
    instituteName:string,
    city: string,
    state: string,
    country: string,
    languageOfInstruction: string, // enum hindi telugu eng other
    gradingSystem: string, // enum % grade gpa 
    board: string,// enum 
    totalScore: string, // for grade A+..., for Percent 0-100, gpa 0-10
    startDate: string,
    endDate: string,
}

export interface EducationHistory_Plus2 {
    instituteName: string,
    city: string,
    state: string,
    country: string,
    languageOfInstruction: string, // enum hindi telugu eng other
    gradingSystem: string, // enum % grade gpa 
    board: string,// enum ISC, state, 
    totalScore: string, // for grade A+..., for Percent 0-100, gpa 0-10
    startDate: string,
    endDate: string,
    stream: string, // enum mpc,bipc,mec....
    backlogs:number,
    isCompleted: boolean
}

export interface EducationHistory_UnderGraduation{
    instituteName:string,
    city: string,
    state: string,
    country: string,
    programMajor: string,// enum  eee,ese,ece
    degreeProgram: string,// enum btech,bedu,bsc.... 
    gradingSystem: string,// enum % grade gpa cgpa
    affiliatedUniversity: string,
    totalScore:number, // for grade A+..., for Percent 0-100, gpa 0-10
    startDate:string,
    endDate:string,
    backlogs:number,
    isCompleted: boolean
}

export interface EducationHistory_PostGraduation {
    instituteName:string,
    city: string,
    state: string,
    country: string,
    specialization: string,// enum  power and energy systems,computer engineering,data science
    degreeProgram: string,// enum mtech,medu,msc.... 
    gradingSystem: string,// enum % grade gpa cgpa
    affiliatedUniversity: string,
    totalScore:number, // for grade A+..., for Percent 0-100, gpa 0-10
    startDate: string,
    endDate:string,
    backlogs:number,
    isCompleted: boolean
}

export type UserRoles="student" | "guest" | "developer" | "counsellor" | "coordinator" 

export interface User {
    _id: string,
    firstName:string,
    lastName:string,
    displayPicSrc: string,
    email: string,
    userType: "student"| "member",
    role?:UserRoles
}

export interface Document{
    _id:string,
    name: string,
    contentType: string,
    createdAt: string
  }

export interface Documents{
    test?:{
        languageProf?:Document[]
        general?:Document[]
    },
    workExperiences:Document[],
    personal?:{
        resume?:Document
        passportBD?:Document
        passportADD?:Document
    },
    academic?:{
        degree?:Document
        secondarySchool?:Document
        plus2?:Document
        bachelors?:{
            transcripts?:Document,
            bonafide?:Document,
            CMM?:Document,
            PCM?:Document,
            OD?:Document
        }
        masters?:{
            transcripts?:Document,
            bonafide?:Document,
            CMM?:Document,
            PCM?:Document,
            OD?:Document
        }
    }
}

export type Preferences={
    degree?: string,
    intake?: Date,
    budget?: {
        upper: number,
        lower: number
    },
    courses?: string[],
    country?: string[],
    exploreButton?: boolean,
    theme?: string,
    currency?: string,
    language?: string,// enum eng, tel, hindi
}

export type Address={
    city: string,
    state: string,
    pinCode: number,
    country: string,
    addressLine1?: string,
    addressLine2?: string,
    addressLine3?: string
}

export type FamilyInfo={
    GuardianFirstName: string,
    GuardianLastName: string,
    GuardianEmail: string,
    GuardianOccupation: string,
    GuardianQualification: string,
    RelationshipWithStudent: string, // enum father, mother, spouse, guardian
    GuardianContactNumber: Phone,
}

export type Phone={ 
    countryCode: string, 
    number: string 
}

export type Test={
    _id?:string,
    name: string,
    scores: {
        _id?:string,
        description:string,
        count: number,
    }[],
    testDate: string,
    docId:Document
}

export interface TestSection{
    testName:string,
    sectionName:string,
    score:number,
    testDate?:Date
}

export interface TriggerObject{
    action:string,
    sender:User,
    recievers?:User[],
    data:any
}

export interface Advisor{
    assignedCountries: string[],
    info: {
        _id:string,
        role: string,
        displayPicSrc: string,
        email: string,
        userType: string,
        firstName: string,
        lastName: string,
        language: string[],
        expertiseCountry: string[]
    },
    _id: string
}