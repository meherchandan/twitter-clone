import {saveLikeToggle,saveTweet} from './../utils/api'; 
import { showLoading, hideLoading} from 'react-redux-loading'; 
export const RECEIVE_TWEETS = 'RECEIVE_TWEETS';
export const TOGGLE_TWEETS = 'TOGGLE_TWEETS';
export const ADD_TWEETS = 'ADD_TWEETS';

function addTweet(tweet){
    return{
        type:ADD_TWEETS,
        tweet
    }
}

export function handleAddTweet(text, replyingTo){
    return (dispatch,getState)=>{
        const {authUser} = getState();
        dispatch(showLoading());
        return saveTweet({text,author:authUser,  replyingTo})
            .then((tweet)=>dispatch(addTweet(tweet) ))
            .then(dispatch(hideLoading()))

    }
}
export function receiveTweets (tweets){
    return {
        type: RECEIVE_TWEETS,
        tweets
    }
}

 function toggleTweet ({id,authUser,hasLiked}){
    return {
        type: TOGGLE_TWEETS,
        id,
        authUser,
        hasLiked
    }
}

export function handleToggleTweet(info){
    return (dispatch)=>{
        dispatch(toggleTweet(info))
        return saveLikeToggle(info)
            .catch( (e)=>{
                console.warn("Error in toggle tweet",e);
                dispatch(toggleTweet(info))
                alert("There was an error liking the tweet. Try Again.")
            })
    }
}