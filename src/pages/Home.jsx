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
            <div className='w-full min-h-[50vh] flex items-center justify-center py-8'>
                <Container>
                    <div className='flex flex-col items-center text-center'>
                        <div className="w-24 h-24 mb-6 rounded-full bg-[var(--bg-secondary)] flex items-center justify-center">
                            <span className="text-4xl">📝</span>
                        </div>
                        <h1 className='text-2xl md:text-3xl font-bold text-[var(--text-primary)] mb-2'>
                            No posts discovered yet
                        </h1>
                        <p className='text-[var(--text-secondary)] text-lg'>
                            Login to read exclusive content or be the first to publish!
                        </p>
                    </div>
                </Container>
            </div>
        )
    }

    /// if there are posts
    const featuredPosts = posts.slice(0, 2);
    const latestPosts = posts.slice(2);

    return (
        <div className='w-full pb-12'>
            {/* Featured Section Hero */}
            {featuredPosts.length > 0 && (
                <div className="bg-[var(--bg-secondary)] border-b border-[var(--color-cream-200)] py-12 mb-12">
                    <Container>
                        <div className='mb-8'>
                            <h2 className='text-3xl md:text-4xl font-extrabold text-[var(--text-primary)]'>Featured Reading</h2>
                            <p className='text-[var(--text-secondary)] mt-2 text-lg'>Editor's picks and trending stories this week.</p>
                        </div>
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
                            {featuredPosts.map((post) => (
                                <div key={post.$id} className='w-full'>
                                    <PostCard {...post} />
                                </div>
                            ))}
                        </div>
                    </Container>
                </div>
            )}

            {/* Latest Articles Section */}
            {latestPosts.length > 0 && (
                <Container>
                    <div className='mb-8'>
                        <h2 className='text-2xl font-bold text-[var(--text-primary)]'>Latest Articles</h2>
                        <p className='text-[var(--text-secondary)] mt-2'>Explore our most recent updates.</p>
                    </div>
                    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
                        {latestPosts.map((post) => (
                            <div key={post.$id} className='w-full'>
                                <PostCard {...post} />
                            </div>
                        ))}
                    </div>
                </Container>
            )}
        </div>
    )
}

export default Home