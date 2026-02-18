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
    <div className=' w-full p-2 gap-2 m-auto '>
      <Container>
        <div className='flex flex-wrap'>
          {posts?.map((post) => (
            <div key={post.$id}
              className='p-2 w-full sm:w-1/2 lg:w-1/3 xl:w-1/4'
            >
              <PostCard {...post} />
            </div>
          ))}

        </div>
      </Container>
    </div>
  )
}

export default AllPost