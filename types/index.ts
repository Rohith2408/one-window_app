import React from "react"
import { ImageSourcePropType } from "react-native"
import { FormAction } from "../reducers/FormReducer"
import { NavigationActions } from "../reducers/PathReducer"

export type Device="MobileS"|"MobileM"|"MobileL"|"Tab"

export interface Event{
    name:string,
    data?:any,
    triggerBy:string | number
}

export type Tabbar={
    tabChangeHandler:(tab:string)=>void,
    currentTab:string,
    fitWidth?:boolean,
    tabs:{icon?:string,title:string}[]
}

export type ListInfo={
    id:string,
    basketid:string,
    formid?:string,
    card:React.FC<any>,
    filters?:{
        additional:AdditionalFilterInfo[],
        quick:QuickFilterInfo[]
    },
    selectionMode?:"single"|"multi",
    itemsPerPage?:number,
    showSearch?:boolean,
    pagnation?:boolean,
    searchEvaluator?:(data:any)=>boolean,
    pageUpdator?:(page:number)=>NavigationActions,
    listFetcher:(data:Listquery)=>Promise<ServerResponse>
}

export type Listquery={
    search:string,
    //appliedFilters:AppliedFilter[],
    page:number,
    filters:any[],
    selectedList?:any[],
    fullList?:any[]
}

export type AppliedFilter={
    type:string,
    data:ListItem[]
}

export type AppliedQuickFilter={
    type:string,
    data:AppliedFilter[]
}

export type AdditionalFilterInfo={
    type:string,
    title:string,
    //handler?:(currentAppliedFilter:AppliedFilter[],data:any)=>AppliedFilter[]
    icon:string,
    // container?:{
    //     component:React.FC<any>,
    //     props?:any
    // }
}

export type QuickFilterInfo={
    type:string,
    title:string,
    icon:string,
    filters:AppliedFilter[]
}

// export type FilterInfo={
//     type:string,
//     title:string,
//     handler?:(currentAppliedFilter:AppliedFilter[],data:any)=>AppliedFilter[]
//     icon:string,
//     container?:{
//         component:React.FC<any>,
//         props?:any
//     }
// }

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

export type ScreenInfo={
    id:string,
    component:React.FC<any>,
    props?:string[],
    title?:string,
    type:"Screen"|"Partial"|"Layout"|"Popup"|"Flyer",
    swipeDirection?:"X"|"Y"|"XY",
    shiftOriginToCenter?:boolean,
    isTransparent?:boolean,
    showTouchCaptureScreen?:boolean,
    occupyFullScreen?:boolean,
    animationStyle?:"HorizontalSlideToLeft"|"HorizontalSlideToRight"|"VerticalSlideToTopPartial"|"VerticalSlideToTop"|"CenterPopIn"|"CenterFadeIn"|"FadeIn"|"Custom",
    removalThreshold?:number,
    customPlacement?:{
        initial:{x:number,y:number,scale:number,opacity:number,height:number,width:number},
        final:{x:number,y:number,scale:number,opacity:number,height:number,width:number}
    }
}

export type Form={
    id:string,
    fields:FormField[],
    initialFormData:FormData[],
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
    //value:any,
    // isFocussed:boolean,
    onUpdate?:{
        event:string,
        handler?:(fields:FormData[],data:any)=>FormData[]
    },
    onFocus?:{
        event:string,
        handler?:any
    }
}

export type FormData={
    id:string,
    value:any
}

export type ListItem={
    label:string,
    value:string
}

export type Dropdown={
    options:{
        list?:any[],
        card:React.FC<any>,
        fetcher?:(data?:any)=>Promise<any>,
        idExtractor:(item:any)=>string,
        labelExtractor:(item:any)=>string,
        searchEvaluator:(item:any,query:string)=>boolean
    },
    isAsync?:boolean,
    basketid:string,
    selectionMode:"single"|"multi",
    apply:(data:any[])=>NavigationActions
    //eventHandler?:(event:Event)=>void
    //isFocussed?:boolean,
    //optionsCard?:React.FC<any>,
    //optionsFetcher?:(data?:any)=>Promise<ListItem[]>,
    //selectedHandler?:(data:any)=>any,
}

export type FormInfo={
    id:string,
    title?:string,
    getInitialData:(id:string|undefined)=>FormData[],
    onLoad?:()=>void
    submit:{
        dataConverter?:(data:FormData[],id?:string)=>any,
        onSubmit:(data:any)=>Promise<ServerResponse>,
        redirect?:(data:any)=>NavigationActions,
        //callback?:(data:any)=>void,
        successText:string,
        failureText:string,
        idleText:string
    },
    allFields:{
        id:string,
        componentInfo:{
            component:React.FC<any>,
            props:any
        },
        title:string,
        isOptional?:boolean,
        emptyChecker?:(data:any)=>ServerResponse,
        validator?:(data:any)=>ServerResponse,
        onUpdate:{
            event:string,
            handler?:any
        },
        onFocus:{
            event:string,
            handler?:any
        }
    }[]
}

export type List<type>={
    direction:"Horizontal"|"Vertical",
    mode:"Swipe"|"Scroll",
    card:React.FC<type>,
    cardStyles?:any,
    list:type[]
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
    component:string,
    props:any,
}

export type TabNavigator={
    screens:TabScreen[],
    currentTab:ComponentInfo,
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
        startDate: ProgramIntake[],
        elite: true
    },
    intake: string,
    _id: string
}

export type ProgramIntake={
    _id: string,
    courseStarting: string,
    Deadline: string,
    courseStartingMonth: number,
    deadlineMonth: number
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

export type ServerRequest={
    url:string,
    reqType:"GET"|"PUT"|"DELETE"|"POST",
    responseType?:"JSON"|"BLOB",
    routeType?:"public"|"private",
    preventStringify?:boolean,
    body?:any
}

export interface ServerResponse{
    success:boolean,
    data:any,
    message:string,
    AccessToken?:string
}

export interface Request<datatype>{
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

export type Location={
    country: string,
    state: string,
    city: string
}

export interface UniversitySearchObj{
    _id: string,
    code: string,
    community: string, 
    location: Location,
    logoSrc: string,
    name:string
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

export interface Course{
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
        //uni_rating: number,
        establishedYear:number
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
    }[],
    elite:boolean
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
    custom:boolean
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

export type PickedDoc={
    _id?:string,
    name?:string|null,
    uri:string,
    type?:string
}

export interface Document{
    _id: string,
    data: {
        FileName: string,
        resource_id: string,
        mimetype: string,
        originalname: string,
        preview_url:string
    }
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

export interface Personalinfo{
    DOB?: string,
    Gender?: string, // enum
    temporaryAddress?:Address,
    permanentAddress?: Address,
    nationality?: string,// enum
    countyOfBirth?: string, // enum
    maritalStatus?: string, // enum 
    validPassport?: string,// enum yes no and processing
    validPermit?: string,// enum yes no and processing,
    visaRejectedDetails?: string,
}

export interface Sharedinfo{
    _id?:string,
    firstName?:string,
    lastName?:string,
    displayPicSrc?:string,
    email?:string,
    phone?:Phone,
    LeadSource?: string,
    // isPlanningToTakeAcademicTest: boolean,
    // isPlanningToTakeLanguageTest: boolean,
}

export type Verification={
    type: "email" | "phone", 
    status: boolean,
    token: {
        data: string, // jwt
        expiry: Date, // expiry date
    }
}

export type ResearchPaper={
    title: string,
    publication: string,
    fieldOfStudy: "entertainment"|"finance"|"medical"|"information technology"| "education"| "textile"| "media and news"| "food processing"|"hospitality"|"construction and engineering"| "law"|"paper"| "real estate"| "automobile"| "aviation"|"pharmaceutical"|"fertilizers"|"advertising"|"metallurgy"| "energy"|"telecommunications"|"retail"| "manufacturing"|"agriculture"|"chemicals"| "transportation and logistics"|"consumer goods"| "healthcare",
    publishedDate: Date,
}

export interface Meeting{
    _id:string,
    description:string,
    attendees:string[],
    link:string,
    calenderLink?:string,
    startDate:{
        dateTime:  string,
        timeZone:  string
      },
    endDate:{
        dateTime:  string,
        timeZone:  string
      },
    status:"completed" | "cancelled" | "rescheduled" | "upcoming",
    member:User
}

export type Countrycode={
    name:string,
    dial_code:string,
    code:string
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

export interface Meeting_Server{
    _id:string,
    user: User,
    member: User,
    data: {
      kind: string,
      etag:string,
      id: string,
      status: string,
      htmlLink: string,
      created: string,
      updated:  string,
      summary:  string,
      description:  string,
      creator: {
        email:  string,
        self:boolean
      },
      organizer: {
        email:  string,
        self: boolean
      },
      start: {
        dateTime:  string,
        timeZone:  string
      },
      end: {
        dateTime:  string,
        timeZone:  string
      },
      iCalUID:  string,
      sequence: number,
      attendees: {
        email: string,
        responseStatus: string
      }[],
      hangoutLink: string,
      conferenceData: {
        createRequest: {
          requestId: string,
          conferenceSolutionKey: {
            type: string
          },
          status: {
            statusCode: string
          }
        },
        entryPoints: {
            entryPointType: string,
            uri: string,
            label:string
          }[],
        conferenceSolution: {
          key: {
            type: string
          },
          name: string,
          iconUri: string
        },
        conferenceId: string
      },
      reminders: {
        useDefault: false,
        overrides: {
            method: string,
            minutes: number
          }[]
      },
      eventType: string
    },
    status: string,
    createdAt: string,
    updatedAt: string,
    __v: number
}

export interface Product{
    category:string,
    intake:string,
    course:{
        id:string,
        name:string,
        icon?:string
    }
}

export interface UG_Institutes{
    instituteName:string,
    city:string,
    state:string,
    country:string,
    affiliatedUniversity:string
}

export interface PurchasedProduct{
    info: {
        notes: string[],
        questionnaire: string[]
    },
    _id: string,
    course:CourseListObj,
    intake: string, //ex. 2024-11-30T18:30:00.000Z
    deadline: string, //ex. 2024-11-30T18:30:00.000Z
    user: string,
    category: string,
    cancellationRequest: boolean,
    advisors: string[],//ex. ids
    docChecklist:  {
        name: string,
        isChecked: false,
        doc: Document,
        _id: string
    }[],
    log: {
        status: string,
        stages: {
            name: string,
            updatedAt: string,
            _id: string
        }[],
        _id: string
    }[],
    __v: 10,
    createdAt:string, //ex. "2024-08-03T08:05:42.665Z"
    updatedAt: string, //ex. "2024-08-03T08:05:42.665Z"
    order: string,
    stage: string,
    status:string
}

export interface Order{
    paymentDetails: {
        razorpay_order_id: string,
        amount: number,
        amount_due: number,
        created_at: string,
        currency: string,
        paymentStatus:string,
        misc: {
            id: string,
            entity: string,
            amount: number,
            amount_paid: number,
            amount_due: number,
            currency: string,
            receipt: null,
            offer_id: null,
            status: string,
            attempts: number,
            notes: {
                item_ids: {
                    package: string,
                    products: string[]
                },
                note_key: string
            },
            created_at: number
        }
    },
    _id: string,
    Package:Package,
    products: PurchasedProduct[],
    status: string,
    logs: {
        action: string,
        time: string,//ex.2024-08-02T20:48:24.751Z
        details: string,// ex. "{\"note_key\":\"purchase initiated by Rohith Kumar\",\"item_ids\":{\"package\":null,\"products\":[\"66ad463cedb6f560dea4327a\",\"66ad463cedb6f560dea4327b\"]}}"
        _id: string
    }[]
}

export interface Package{
    priceDetails: {
        currency: {
            symbol: string,
            code: string
        },
        totalPrice: number
    },
    _id: string,
    name: string,
    description: string,
    country: string[],
    requirements: string[],
    benefits: string[],
    termsAndConditions: string
    active: boolean,
    products: {
        _id:string,
        category: string,
        quantity:number
    }[]
}

export type Institute={
    IEH: {
      exists: boolean
    },
    _id: string,
    InstitutionName: string,
    District:string,
    State: string,
    university: string[]
  }

export interface AvailableSlot{
    availableSlots: {
        endTime: string, 
        startTime: string
    }[],
    date: string
}

export type Recommendation={
    university: {
      location: Location,
      _id:string,
      name: string,
      logoSrc: string,
      type: string,
      establishedYear:number
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
      _id: string,
      name: string,
      subDiscipline: string,
      schoolName: string,
      discipline: string,
      studyLevel: string,
      duration:string,
      studyMode: string[]
    },
    possibilityOfAdmit: string,
    _id: string
}

export type RecommendationType={
    criteria: {
    ug_gpa?:string,
    gre?:string,
    sub_discipline?: string[]
    }|undefined,
    data:Recommendation[]
}

export interface RequestInfo{
    id:string,
    inputValidator:(data:any)=>ServerResponse,
    serverCommunicator:(data?:any)=>Promise<ServerResponse>,
    responseHandler:(data:ServerResponse)=>void
}

export interface PreferenceInfo{
    id:string,
    title:string,
    options:{
        list:any[],
        idExtractor:(item:any)=>any,
        labelExtractor:(item:any)=>any,
        card:React.FC<any>,
        selectionMode:"single"|"multi",
        selectionLimit?:number
    },
    dataConverter:(data:any[])=>any,
    responseHandler:(data:any)=>void,
    serverCommunicator:(data:any)=>Promise<ServerResponse>,
    getInitialData:()=>any
}

