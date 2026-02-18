 import React, { useState, useEffect } from 'react'
import { Container, PostCard } from '../components'
import appwriteService from '../appwrite/configAppWrite'
import { Databases } from 'appwrite'

function Home() {
    // state to hold posts
    const [posts, setPosts] = useState([])
    // fetch posts from appwrite
    useEffect(() => {
        appwriteService.getPosts()
            .then((posts) => {
                console.log('Home - getPosts response:', posts);
                if (posts) {
                    // New TablesDB API uses 'rows' instead of 'documents'
                    setPosts(posts.rows || posts.documents || [])

                }
            }).catch((err) => console.error('getPosts error', err))
    }, [])
    // if there are no posts
    if (posts && posts.length === 0) {
        return (
            <div className='w-full py-8  mt-4  text-center'>
                <Container>
                    <div className=' flex flex-wrap gap-4 justify-center items-center'>
                        <div className=' p-2 w-full'>
                            <h1 className=' text-2xl font-bold'>No posts yet|| Login to read posts</h1>
                        </div>
                    </div>
                </Container>
            </div>
        )

    }


    /// if there are posts
    return (
        /// display posts in a grid
        <div className='w-full p-2'>
            <Container>
                <div className='flex flex-wrap gap-0'>
                    {
                        posts?.map((post) => (
                            <div key={post.$id} className='p-1 w-full sm:w-1/2 lg:w-1/3 xl:w-1/4'>
                                <PostCard {...post} />
                            </div>
                        ))
                    }
                </div>
            </Container>
        </div>

    )

}

export default Home