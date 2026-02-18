import React, { useState } from "react";
import { AiOutlineLike, AiFillLike } from "react-icons/ai";
import { AiOutlineDislike, AiFillDislike } from "react-icons/ai";

function LikeDislike() {
    const [liked, setLiked] = useState(false);
    const [disliked, setDisliked] = useState(false);

    const handleLike = () => {
        setLiked(!liked);
        if (disliked) setDisliked(false);
    };

    const handleDislike = () => {
        setDisliked(!disliked);
        if (liked) setLiked(false);
    };

    return (
        <div className="flex items-center gap-6 text-2xl ">

            {/* LIKE */}
            <button
                onClick={handleLike}
                className={`transition ${liked ? "text-blue-600" : "text-white hover:text-blue-600"
                    }`}
            >
                {liked ? <AiFillLike /> : <AiOutlineLike />}
            </button>

            {/* DISLIKE */}
            <button
                onClick={handleDislike}
                className={`transition ${disliked ? "text-red-600" : "text-white hover:text-red-600"
                    }`}
            >
                {disliked ? <AiFillDislike /> : <AiOutlineDislike />}
            </button>

        </div>
    );
}

export default LikeDislike;
