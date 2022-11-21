import React, { useState, useEffect }  from "react";
import * as likeService from "../../services/likes-service";

const TuitStats = ({tuit, likeTuit = () => {}}) => {

    /**
     * Use useState and useEffect to change like button and dislike button status.
     */
    const [hasLiked, setHasLike] = useState(null);

    /**
     * Check if a tuit has been liked by user or not.
     */
    const checkLike = async() => {
      const userLiked = await likeService.userLikesTuit("me",tuit._id);
      if (userLiked.length===1) {
        setHasLike(false);

      }else{
        setHasLike(true)
      }
    }


    /**
     * The onClick function on like button.
     */
    const clickOnLike = async() => {
      likeTuit(tuit);
      await checkLike();
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

        {/** like button */  }
        <div className="col">
          <span onClick={() => clickOnLike()}>
              {
                hasLiked ? (
                  <i className="fa-solid fa-thumbs-up"></i>
                ) : (
                  <i className="fa-regular fa-thumbs-up"></i>
                )

              }

            {tuit.stats && tuit.stats.likes}

          </span>
          </div>
        
      </div>
    );
}
export default TuitStats;
