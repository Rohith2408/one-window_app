import { configureStore } from "@reduxjs/toolkit";
import workexperienceSlice from "./slices/workexperienceSlice"
import skillsSlice from "./slices/skillsSlice";
import shortlistedCoursesSlice from "./slices/shortlistedCoursesSlice";
import chatsSlice from "./slices/chatsSlice";
import educationHistorySlice from "./slices/educationHistorySlice";
import personalinfoSlice from "./slices/personalinfoSlice";
import counsellorinfoSlice from "./slices/counsellorinfoSlice";
import testScoresSlice from "./slices/testScoresSlice";
import preferencesSlice from "./slices/preferencesSlice";
import applicationsSlice from "./slices/applicationsSlice";
import documentsSlice from "./slices/documentsSlice";
import communityPostsSlice from "./slices/communityPostsSlice";
import communityFeedSlice from "./slices/communityFeedSlice";
import messagesSlice from "./slices/messagesSlice";
import communityJoinedSlice from "./slices/communityJoinedSlice";
import userAuthStatusSlice from "./slices/userAuthStatusSlice";
import errorSlice from "./slices/errorSlice";
import notificationsSlice from "./slices/notificationsSlice";
import appLayoutSlice from "./slices/appLayoutSlice";
import familyInfoSlice from "./slices/familyInfoSlice";
import popupSlice from "./slices/popupSlice";
import sharedinfoSlice from "./slices/sharedinfoSlice";
import verificationSlice from "./slices/verificationSlice";
import meetingsSlice from "./slices/meetingsSlice";
import advisorsSlice from "./slices/advisorsSlice";
import recommendationsSlice from "./slices/recommendationsSlice";
import productsSlice from "./slices/productsSlice";
import cartSlice from "./slices/cartSlice";
import wishlistSlice from "./slices/wishlistSlice";
import suggestedpackageSlice from "./slices/suggestedpackageSlice";

const store = configureStore({
        reducer:{
            personalinfo:personalinfoSlice,
            sharedinfo:sharedinfoSlice,
            familyinfo:familyInfoSlice,
            verification:verificationSlice,
            workexperience:workexperienceSlice,
            meeting:meetingsSlice,
            skills:skillsSlice,
            advisors:advisorsSlice,
            educationhistory:educationHistorySlice,
            recommendations:recommendationsSlice,
            testscores:testScoresSlice,
            preferences:preferencesSlice,
            shortlistedcourses:shortlistedCoursesSlice,
            applications:applicationsSlice,
            documents:documentsSlice,
            chats:chatsSlice,
            messages:messagesSlice,
            counsellorinfo:counsellorinfoSlice,
            communityposts:communityPostsSlice,
            communityfeed:communityFeedSlice,
            communityjoined:communityJoinedSlice,
            userauthstatus:userAuthStatusSlice,
            error:errorSlice,
            notifications:notificationsSlice,
            // applayout:appLayoutSlice,
            popup:popupSlice,
            products:productsSlice,
            cart:cartSlice,
            wishlist:wishlistSlice,
            suggestedpackages:suggestedpackageSlice
        }
    });

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export {store};