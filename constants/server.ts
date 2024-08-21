const serverResponses={
    VerificationFailed:"Token Verification Failed",
    TokenMissing:"Access Token Missing"
}

const endPoints=[
    {
        id:"login",
        category:"auth",
        tail:"login",
        type:"GET",
    },
    {
        id:"profile",
        category:"student",
        tail:"profile",
        type:"GET",
    },
    {
        id:"post-review",
        category:"student",
        tail:"post-review",
        type:"GET",
    },
    {
        ENUM:"edit-review",
        TYPE:"student",
        
    },
    {
        id:"dashboard",
        category:"student",
        tail:"dashboard",
        type:"GET",
    },
    {
        ENUM:"check-availability",
        TYPE:"student",
        
    },
    {
        ENUM:"verify-email",
        TYPE:"student",
        
    },
    {
        ENUM:"send-sms-otp",
        TYPE:"student",
        
    },
    {
        ENUM:"verify-sms-otp",
        TYPE:"student",
        
    },
    {
        ENUM:"phone",
        TYPE:"student"
    },
    {
        ENUM:"email",
        TYPE:"student"
    },
    {
        ENUM:"profile",
        TYPE:"student",
        
    },
    {
        ENUM:"phone",
        TYPE:"student",
        
    },
    {
        ENUM:"counsellor-events",
        TYPE:"student",
        
    },
    {
        ENUM:"book-slot",
        TYPE:"student",
        
    },
    {
        ENUM:"modify-slot",
        TYPE:"student",
        
    },
    {
        ENUM:"booked-slots",
        TYPE:"student",
        
    },
    {
        ENUM:"request-counsellor",
        TYPE:"student",
        
    },
    {
        ENUM:"generate-recommendations",
        TYPE:"student",
        
    },
    {
        ENUM:"add-to-short-list",
        TYPE:"student",
        
    },
    {
        ENUM:"edit-short-list",
        TYPE:"student",
        
    },
    {
        id:"upload-profile",
        category:"student",
        tail:"upload-profile",
        type:"POST",
        
    },
    {
        id:"delete-uploaded-profile",
        category:"student",
        tail:"delete-uploaded-profile",
        type:"POST",
    },
    {
        ENUM:"download",
        TYPE:"student",
        
    },
    {
        ENUM:"apply",
        TYPE:"student",
        
    },
    {
        ENUM:"apply-force",
        TYPE:"student",
        
    },
    {
        ENUM:"apply-omit-force",
        TYPE:"student",
        
    },
    {
        ENUM:"upload-application",
        TYPE:"student",
        
    },
    {
        ENUM:"delete-uploaded-application",
        TYPE:"student",
        
    },
    {
        ENUM:"request-cancellation",
        TYPE:"student",
        
    },
    {
        ENUM:"all-students",
        TYPE:"student",
        
    },
    {
        ENUM:"single-student",
        TYPE:"student",
        
    },
    {
        ENUM:"events",
        TYPE:"student",
        
    },
    {
        id:"universities",
        category:"public",
        tail:"listings/universities",
        type:"POST",
    },
    {
        id:"programs",
        category:"public",
        tail:"listings/courses",
        type:"POST",
        
    },
    {
        ENUM:"single_university",
        TYPE:"public",
        
    },
    {
        ENUM:"single_course",
        TYPE:"public",
        
    },
    {
        ENUM:"profile",
        TYPE:"public",
        
    },
    {
        ENUM:"profiles",
        TYPE:"public",
        
    },
    {
        ENUM:"counsellors",
        TYPE:"public",
        
    },
    {
        ENUM:"university",
        TYPE:"public",
        
    },
    {
        ENUM:"login",
        TYPE:"auth",
        
    },
    {
        ENUM:"student-register",
        TYPE:"auth",
        
    },
    {
        ENUM:"verify",
        TYPE:"auth",
        
    },
    {
        ENUM:"logout",
        TYPE:"auth",
        
    },
    {
        ENUM:"team-register",
        TYPE:"auth",
        
    },
    {
        ENUM:"forgot-password",
        TYPE:"auth",
        
    },
    {
        ENUM:"verify-otp",
        TYPE:"auth",
        
    },
    {
        ENUM:"google/login",
        TYPE:"auth",
        
    },
    {
        ENUM:"chats",
        TYPE:"communication",
        
    },
    {
        ENUM:"message",
        TYPE:"communication",
    },
    {
        ENUM:"seen",
        TYPE:"communication",
    }
]

const baseURL="https://campusroot.com/api/v1"

export {baseURL,endPoints,serverResponses}