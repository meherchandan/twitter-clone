import React, { Component } from 'react'
import {connect} from 'react-redux';
import {formatTweet,formatDate} from './../utils/helpers';
import {TiArrowBackOutline,TiHeartFullOutline,TiHeartOutline} from 'react-icons/ti'
import {handleToggleTweet} from './../actions/tweet';
import {Link,withRouter } from 'react-router-dom'; 
class Tweet extends Component {
    toParent = (e,id)=>{
        e.preventDefault();
        this.props.history.push(`/tweet/${id}`);

    }
    handleLike = (e)=>{
        e.preventDefault();
        const {dispatch,tweet,authUser} =  this.props;
        dispatch(handleToggleTweet({id:tweet.id,hasLiked:tweet.hasLiked,authUser}))

    }
    render() {
        const tweet = this.props.tweet;
        if(tweet==null){
            return <p>this tweet doesn't exist</p>
        }
        const {
            name, avatar,timestamp,text,hasLiked, likes,replies,id,parent
        } = tweet;
        return (
            <Link to={`/tweet/${id}`} className="tweet">

                <img src={avatar} alt ={`Avatar of ${name}`} className="avatar"/>
                <div className="tweet-info">
                    <div>
                        <span>{name}</span>
                        <div>{formatDate(timestamp)}</div>
                        {parent && (
                            <button className="replying-to" onClick={(e)=>this.toParent(e,parent.id)}>
                                Replying to @{parent.author}
                            </button>
                        )}
                        <p>{text}</p>
                    </div>
                    <div className="tweet-icons">
                        <TiArrowBackOutline className="tweet-icon" />
                        <span>{replies!==0 && replies} </span>
                        <button className="heart-button" onClick={(e)=>{this.handleLike(e)}}>
                            {
                                hasLiked?<TiHeartFullOutline color="#e0245e" className="tweet-icon"/>:
                                <TiHeartOutline className="tweet-icon"/>
                            }
                        </button>
                        <span>{likes!==0 && likes}</span>
                    </div>
                  </div>
            </Link>
        )
    }
}

const mapStateToProps = ({authUser,users,tweets},{id}) => {
    const tweet = tweets[id];
    const parentTweet = tweet?tweets[tweet.replyingTo]:null
    return {
        authUser,
        tweet:tweet?formatTweet(tweet,users[tweet.author],authUser,parentTweet):null
    }
}

export default withRouter(connect(mapStateToProps)(Tweet)) ;