import React, { useState, useEffect } from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

function LikeDislike({ postId, initialLikes = 0 }) {
    const [liked, setLiked] = useState(false);
    const [likesCount, setLikesCount] = useState(initialLikes);

    // Load from localStorage on mount
    useEffect(() => {
        if (!postId) return;
        
        // Load global likes count for this post
        const storedCount = localStorage.getItem(`likes_count_${postId}`);
        if (storedCount) {
            setLikesCount(parseInt(storedCount, 10));
        } else if (initialLikes > 0) {
            // Set initial and save
            setLikesCount(initialLikes);
            localStorage.setItem(`likes_count_${postId}`, initialLikes);
        }

        // Load if current user liked it
        const userLiked = localStorage.getItem(`user_liked_${postId}`);
        if (userLiked === 'true') {
            setLiked(true);
        }
    }, [postId, initialLikes]);

    const handleLike = (e) => {
        e.preventDefault(); // Prevent navigation if inside a Link
        if (!postId) return;

        let newCount = likesCount;

        if (liked) {
            setLiked(false);
            newCount = Math.max(0, likesCount - 1);
            localStorage.setItem(`user_liked_${postId}`, 'false');
        } else {
            setLiked(true);
            newCount = likesCount + 1;
            localStorage.setItem(`user_liked_${postId}`, 'true');
        }
        
        setLikesCount(newCount);
        localStorage.setItem(`likes_count_${postId}`, newCount.toString());
    };

    return (
        <div className="flex items-center gap-4 text-xl z-10 relative">
            <button
                onClick={handleLike}
                className={`flex items-center gap-1 transition-all ${liked ? "text-rose-500 scale-110" : "text-[var(--text-muted)] hover:text-rose-500"}`}
                title={liked ? "Unlike" : "Like this post"}
            >
                {liked ? <AiFillHeart /> : <AiOutlineHeart />}
                <span className="text-sm font-medium">{likesCount > 0 ? likesCount : ''}</span>
            </button>
        </div>
    );
}

export default LikeDislike;
