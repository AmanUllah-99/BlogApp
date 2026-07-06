import React from 'react'
import { Container , PostForm } from '../components'

export default function AddPost() {
  return (
    <div className='py-12 bg-[var(--bg-primary)]'>
        <Container>
            <div className='mb-8'>
                <h1 className='text-3xl font-bold text-[var(--text-primary)]'>Create New Article</h1>
                <p className='text-[var(--text-secondary)] mt-2'>Share your thoughts and insights with the world.</p>
            </div>
            <PostForm />
        </Container>
    </div>
  )
}
