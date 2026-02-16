import React from 'react'
import configAppWrite from '../appwrite/configAppWrite'
import { Link } from 'react-router-dom'
import parse from 'html-react-parser'
function PostCard({
    ///////////////////// Destructuring Post Data
    $id, title, featuredImage, content
}) {
    return (
        //////////////////////////////////////////// Post Card Container
        <Link to={`/post/${$id}`}  >
            <div className='w-full bg-gray-100 rounded-xl p-3 sm:p-4'>

                <div>
                    {featuredImage && (
                        <img src={configAppWrite.getFilePreview(featuredImage)} alt={title}
                            className='rounded-xl w-full h-auto object-cover'
                        />
                    )}
                </div>

                <h2 className='text-lg sm:text-xl md:text-2xl font-bold mt-3'
                >{title}</h2>

                <div className="browser-css">
                    {content ? parse(content) : <p>No content available</p>}
                </div>

            </div>

        </Link>
    )
}

export default PostCard