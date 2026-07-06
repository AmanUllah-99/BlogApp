 import React from 'react'
import configAppWrite from '../appwrite/configAppWrite'
import { Link } from 'react-router-dom'
import parse from 'html-react-parser'
import LikeDislike from './LikeDislike'
import { FaRegComment } from 'react-icons/fa'
function PostCard({
    $id, title, featuredImage, content
}) {
    // Basic reading time calculation (200 words per minute)
    const plainText = content ? content.replace(/<[^>]*>?/gm, '') : '';
    const wordCount = plainText.trim().split(/\s+/).length;
    const readingTime = Math.max(1, Math.ceil(wordCount / 200));

    return (
        <Link to={`/post/${$id}`} className="block h-full group">
            <div className='flex flex-col h-full bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-[var(--color-cream-200)] hover:-translate-y-1'>
                <div className="relative w-full h-48 overflow-hidden bg-[var(--bg-secondary)]">
                    {featuredImage ? (
                        <img 
                            src={configAppWrite.getFilePreview(featuredImage)} 
                            alt={title}
                            className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-105'
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-[var(--text-secondary)]">No Image</div>
                    )}
                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-[var(--text-muted)] shadow-sm">
                        {readingTime} min read
                    </div>
                </div>

                <div className="p-5 flex flex-col flex-grow">
                    <h2 className='text-xl font-bold text-[var(--text-primary)] group-hover:text-[var(--accent-primary)] transition-colors line-clamp-2'>
                        {title}
                    </h2>
                    
                    <div className="text-sm text-[var(--text-secondary)] mt-3 line-clamp-3 flex-grow">
                        {content ? parse(content) : <p>No content available</p>}
                    </div>

                    <div className='flex items-center justify-between pt-4 mt-4 border-t border-[var(--color-cream-200)]'>
                        <div className='flex items-center gap-2'>
                            <LikeDislike postId={$id} />
                        </div>
                        <div className="flex items-center gap-1 text-[var(--text-muted)] hover:text-[var(--accent-primary)] transition-colors">
                            <FaRegComment className="text-lg" />
                            <span className="text-sm font-medium">Comments</span>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default PostCard