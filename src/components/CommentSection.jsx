import React, { useState, useEffect } from 'react';
import Button from './Button';
import Input from './Input';
import { useSelector } from 'react-redux';

export default function CommentSection({ postId, initialCommentsCount = 0 }) {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const userData = useSelector((state) => state.auth.userData);

    // Load from localStorage on mount
    useEffect(() => {
        if (!postId) return;
        const storedComments = localStorage.getItem(`comments_${postId}`);
        if (storedComments) {
            try {
                setComments(JSON.parse(storedComments));
            } catch (e) {
                console.error("Failed to parse comments from localStorage");
            }
        }
    }, [postId]);

    const handleAddComment = (e) => {
        e.preventDefault();
        if (!newComment.trim() || !userData || !postId) return;

        const commentObj = {
            $id: Date.now().toString(),
            content: newComment,
            userName: userData.name || "User",
            createdAt: new Date().toISOString()
        };

        const updatedComments = [...comments, commentObj];
        setComments(updatedComments);
        setNewComment("");
        
        // Save to localStorage
        localStorage.setItem(`comments_${postId}`, JSON.stringify(updatedComments));
    };

    return (
        <div className="mt-12 pt-8 border-t border-[var(--color-cream-200)]">
            <h3 className="text-2xl font-bold text-[var(--text-primary)] mb-6 flex items-center gap-2">
                <span>💬</span> Comments ({initialCommentsCount + comments.length})
            </h3>

            {/* Comment Input */}
            {userData ? (
                <form onSubmit={handleAddComment} className="mb-8 flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-[var(--accent-primary)] text-white flex items-center justify-center font-bold flex-shrink-0">
                        {userData.name ? userData.name.charAt(0).toUpperCase() : "U"}
                    </div>
                    <div className="flex-grow">
                        <Input
                            placeholder="Add a discussion to this post..."
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            className="w-full border-[var(--color-cream-200)]"
                        />
                        <div className="mt-2 flex justify-end">
                            <Button type="submit" className="bg-[var(--accent-primary)] hover:bg-[var(--accent-hover)] text-white px-6 py-2 rounded-full text-sm font-medium transition-colors">
                                Post Comment
                            </Button>
                        </div>
                    </div>
                </form>
            ) : (
                <div className="mb-8 p-4 bg-[var(--bg-secondary)] rounded-xl border border-[var(--color-cream-200)] text-center">
                    <p className="text-[var(--text-secondary)]">Please log in to join the conversation.</p>
                </div>
            )}

            {/* Comments List */}
            <div className="space-y-6">
                {comments.length === 0 && initialCommentsCount === 0 ? (
                    <p className="text-[var(--text-muted)] text-center py-4">No comments yet. Be the first to share your thoughts!</p>
                ) : (
                    comments.map(comment => (
                        <div key={comment.$id} className="flex gap-4">
                            <div className="w-10 h-10 rounded-full bg-[var(--bg-secondary)] flex items-center justify-center font-bold text-[var(--text-secondary)] flex-shrink-0">
                                {comment.userName.charAt(0).toUpperCase()}
                            </div>
                            <div className="flex-grow bg-white p-4 rounded-2xl border border-[var(--color-cream-200)] shadow-sm">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="font-semibold text-[var(--text-primary)]">{comment.userName}</span>
                                    <span className="text-xs text-[var(--text-muted)]">{new Date(comment.createdAt).toLocaleDateString()}</span>
                                </div>
                                <p className="text-[var(--text-secondary)]">{comment.content}</p>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
