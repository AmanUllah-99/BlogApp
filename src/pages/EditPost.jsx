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
        <div className='py-4 sm:py-6 md:py-8'>
            <Container>
                <PostForm post={post} />
            </Container>
        </div>
    ) : null
}

export default EditPost