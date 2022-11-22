import React, { useState, useEffect }  from "react";
import * as likeService from "../../services/likes-service";
import * as dislikeService from "../../services/dislikes-service";
const TuitStats = ({tuit, likeTuit = () => {},dislikeTuit=()=>{}}) => {
  const [hasLiked, setHasLike] = useState(null);
    const [hasDisliked, setHasDisliked] = useState(null);

    const checkLike = async() => {
      const userLiked = await likeService.userLikesTuit("me",tuit._id);
      if (userLiked.length===1) {
        setHasLike(false);

      }else{
        setHasLike(true)
      }
    }

    const checkDislike = async() => {
      const userDisliked = await dislikeService.userDislikesTuit("me",tuit._id);
      if (userDisliked.length===1) {
        setHasDisliked(false);

      }else{
        setHasDisliked(true)
      }
    }


    const likedByUser = async() => {
      likeTuit(tuit);
      await checkLike();
    }

    const dislikedByUser = async() => {
      dislikeTuit(tuit);
      await checkDislike();
    }
    return (
      <div className="row mt-2">
        <div className="col">
          <i className="far fa-message me-1"></i>
          {tuit.stats && tuit.stats.replies}
        </div>
        <div className="col">
          <i className="far fa-retweet me-1"></i>
          {tuit.stats && tuit.stats.retuits}
        </div>
        <div className="col">
          <span onClick={() => likedByUser}>
              {
                tuit.stats && tuit.stats.likes && tuit.stats.likes > 0 &&
                  <i className="fas fa-thumbs-up me-1" style={{color: 'red'}}></i>
              }
              {
                tuit.stats && tuit.stats.likes && tuit.stats.likes <= 0 &&
                  <i className="far fa-thumbs-up me-1"></i>
              }
            {tuit.stats && tuit.stats.likes}
          </span>
        </div>
        <div className="col">
          <span onClick={() => dislikedByUser}>
              {
                tuit.stats && tuit.stats.dislikes && tuit.stats.dislikes > 0 &&
                  <i className="fas fa-thumbs-down me-1" style={{color: 'black'}}></i>
              }
              {
                tuit.stats && tuit.stats.likes && tuit.stats.likes <= 0 &&
                  <i className="far fa-thumbs-down me-1" style={{color: 'black'}}></i>
              }
            {tuit.stats && tuit.stats.dislikes}
          </span>
        </div>
        <div className="col">
          <i className="far fa-inbox-out"></i>
        </div>
      </div>
    );
}
export default TuitStats;
