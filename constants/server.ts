const serverResponses={
    VerificationFailed:"Token Verification Failed",
    TokenMissing:"Access Token Missing"
}

const endPoints=[
    {
        id:"login",
        category:"auth",
        tail:"login",
        type:"POST",
    },
    {
        id:"register",
        category:"auth",
        tail:"student-register",
        type:"POST",
    },
    {
        id:"profile",
        category:"student",
        tail:"profile",
        type:"GET",
    },
    {
        id:"regex",
        category:"public",
        tail:"university",
        type:"GET",
    },
    {
        id:"edit-phone",
        category:"student",
        tail:"phone",
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
        id:"otp-request",
        category:"student",
        tail:"send-sms-otp",
        type:"GET",
    },
    {
        id:"otp-verify",
        category:"student",
        tail:"verify-sms-otp",
        type:"GET",
    },
    {
        id:"email-verification",
        category:"student",
        tail:"verify-email",
        type:"GET",
    },
    {
        id:"forgot-password-getcode",
        category:"auth",
        tail:"forgot-password",
        type:"POST",
    },
    {
        id:"forgot-password-verifycode",
        category:"auth",
        tail:"verify-otp",
        type:"POST",
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
        id:"vacant-slots",
        category:"student",
        tail:"events",
        type:"GET",
    },
    {
        id:"book-slot",
        category:"student",
        tail:"book-slot",
        type:"POST",
        
    },
    {
        id:"modify-slot",
        category:"student",
        tail:"modify-slot",
        type:"POST"
        
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
        id:"cart",
        category:"student",
        tail:"cart",
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
        id:"program",
        category:"public",
        tail:"single_course",
        type:"POST",
    },
    {
        id:"university",
        category:"public",
        tail:"single_university",
        type:"POST",
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