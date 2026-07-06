 import React from 'react'
import { Container, PostForm } from '../components'
import { useParams, useNavigate } from 'react-router-dom'
import appwriteService from '../appwrite/configAppWrite'
import { useSelector } from 'react-redux'


function EditPost() {
    const [post, setPost] = React.useState(null)
    const { slug } = useParams()
    const navigate = useNavigate()

    const userData = useSelector((state) => state.auth.userData)

    React.useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                console.log("EditPost: Fetched post:", post);
                if (post) {
                    // Check if the current user is the author of the post
                    if (userData && post.userId === userData.$id) {
                        setPost(post)
                    } else {
                        // User is not authorized to edit this post
                        console.log("EditPost: User not authorized to edit this post");
                        navigate('/')
                    }
                }
            }).catch((error) => {
                console.log("EditPost: Error fetching post:", error);
                navigate('/')
            })

        } else {
            navigate('/')
        }
    }, [slug, navigate, userData])
    return post ? (
        <div className='py-12 bg-[var(--bg-primary)]'>
            <Container>
                <div className='mb-8'>
                    <h1 className='text-3xl font-bold text-[var(--text-primary)]'>Edit Article</h1>
                    <p className='text-[var(--text-secondary)] mt-2'>Refine and update your published content.</p>
                </div>
                <PostForm post={post} />
            </Container>
        </div>
    ) : null
}

export default EditPost