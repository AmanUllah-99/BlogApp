 import React, { useState, useEffect } from 'react'
import { Container, PostCard } from '../components'
import appwriteService from '../appwrite/configAppWrite'


function AllPost() {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    appwriteService.getPosts([]).then((posts) => {
      console.log('AllPost - getPosts response:', posts);
      if (posts) {
        // New TablesDB API uses 'rows' instead of 'documents'
        setPosts(posts.rows || posts.documents || [])

      }
    }).catch((err) => console.error('getPosts error', err))
  }, [])
  return (
    <div className='w-full py-12'>
      <Container>
        <div className='mb-8'>
          <h1 className='text-3xl font-bold text-[var(--text-primary)]'>All Articles</h1>
          <p className='text-[var(--text-secondary)] mt-2'>Browse through all our published content.</p>
        </div>
        
        {posts.length === 0 ? (
          <div className='w-full py-20 flex flex-col items-center justify-center bg-white rounded-2xl border border-[var(--color-cream-200)] shadow-sm'>
             <div className="w-16 h-16 mb-4 rounded-full bg-[var(--bg-secondary)] flex items-center justify-center">
                 <span className="text-2xl">📚</span>
             </div>
             <p className='text-[var(--text-secondary)]'>No articles found.</p>
          </div>
        ) : (
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
            {posts?.map((post) => (
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

export default AllPost