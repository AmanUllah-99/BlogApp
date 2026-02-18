import React from 'react'
import configAppWrite from '../appwrite/configAppWrite'
import { Link } from 'react-router-dom'
import parse from 'html-react-parser'
import DawnloadBtn from './DawnloadBtn'
import LikeDislike from './LikeDislike'
function PostCard({
    ///////////////////// Destructuring Post Data
    $id, title, featuredImage, content
}) {
    return (
        //////////////////////////////////////////// Post Card Container
        <Link to={`/post/${$id}`}  >
            <div className=' w-[80%] bg-gray-500 rounded-xl p-3 sm:p-4   '>

                <div>
                    {featuredImage && (
                        <img src={configAppWrite.getFilePreview(featuredImage)} alt={title}
                            className='rounded-xl w-[200px] h-[200px] object-cover  mx-auto'
                        />
                    )}
                </div>

                <h2 className='text-lg sm:text-xl md:text-2xl font-bold mt-3  text-center text-white '
                >{title}</h2>


                <div className=" text-white line-clamp-6  ">
                    {content ? parse(content) : <p>No content available</p>}
                </div>

                <div className='w-full flex  border-2 border-gray-400 rounded-xl  mt-1  justify-center  '>
                    <div className='flex justify-around w-full  '>
                        <LikeDislike />
                        <DawnloadBtn fileId={featuredImage} fileName={title} />

                    </div>
                </div>

            </div>


        </Link>
    )
}

export default PostCard