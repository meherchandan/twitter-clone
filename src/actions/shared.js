import {getInitialData} from './../utils/api';
import {receiveTweets} from './tweet';
import {receiveUsers} from './users';
import {setAuthedUser} from './autheduser';
import { showLoading, hideLoading} from 'react-redux-loading';
const AUTHER_ID = 'tylermcginnis';
export  function handleInitialData (){
    return (dispatch)=>{
        dispatch(showLoading())
        return getInitialData()
                .then(({users,tweets})=>{
                    dispatch(receiveTweets(tweets));
                    dispatch(receiveUsers(users));
                    dispatch(setAuthedUser(AUTHER_ID));
                    dispatch(hideLoading())
                })
    }
}