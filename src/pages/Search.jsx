import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Container, PostCard } from '../components'
import appwriteService from '../appwrite/configAppWrite'
import { Query } from 'appwrite'

function Search() {
    const [searchParams] = useSearchParams()
    const query = searchParams.get('q') || ''
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (!query) {
            setPosts([])
            setLoading(false)
            return
        }

        setLoading(true)
        // Note: Appwrite requires a text index on 'title' to use Query.search()
        // If they don't have it, Query.equal or multiple conditions may be needed.
        // Assuming user has created a search index on 'title'. If not, this might fail,
        // so we'll fallback to fetching all active posts and filtering client-side for simplicity if needed.
        appwriteService.getPosts([Query.search("title", query)])
            .then((res) => {
                const results = res.rows || res.documents || [];
                setPosts(results)
            })
            .catch((err) => {
                console.error('Search error, falling back to client-side filtering:', err)
                // Fallback to client-side filter
                appwriteService.getPosts()
                    .then((res) => {
                        const allPosts = res.rows || res.documents || [];
                        const filtered = allPosts.filter(p => 
                            p.title.toLowerCase().includes(query.toLowerCase()) || 
                            p.content.toLowerCase().includes(query.toLowerCase())
                        )
                        setPosts(filtered)
                    })
            })
            .finally(() => setLoading(false))

    }, [query])

    return (
        <div className='w-full py-12'>
            <Container>
                <div className='mb-8'>
                    <h1 className='text-3xl font-bold text-[var(--text-primary)]'>Search Results</h1>
                    <p className='text-[var(--text-secondary)] mt-2'>
                        Showing results for: <span className="font-semibold text-[var(--accent-primary)]">"{query}"</span>
                    </p>
                </div>
                
                {loading ? (
                    <div className='w-full py-20 flex justify-center'>
                        <div className='w-12 h-12 rounded-full border-4 border-t-rose-500 border-rose-100 animate-spin'></div>
                    </div>
                ) : posts.length === 0 ? (
                    <div className='w-full py-20 flex flex-col items-center justify-center bg-white rounded-2xl border border-[var(--color-cream-200)] shadow-sm'>
                        <div className="w-16 h-16 mb-4 rounded-full bg-[var(--bg-secondary)] flex items-center justify-center">
                            <span className="text-2xl">🔍</span>
                        </div>
                        <p className='text-[var(--text-secondary)]'>No articles found matching your query.</p>
                    </div>
                ) : (
                    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
                        {posts.map((post) => (
                            <div key={post.$id} className='w-full'>
                                <PostCard {...post} />
                            </div>
                        ))}
                    </div>
                )}
            </Container>
        </div>
    )
}

export default Search
