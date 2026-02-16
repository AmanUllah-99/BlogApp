import React, { useState, useEffect } from 'react'
import { Container, PostCard } from '../components'
import appwriteService from '../appwrite/configAppWrite'



function AllPost() {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    appwriteService.getPosts([]).then((posts) => {
      if (posts) {
        setPosts(posts.documents)

      }
    }).catch((err) => console.error('getPosts error', err))
  }, [])
  return (
    <div className=' w-full py-8 '>
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