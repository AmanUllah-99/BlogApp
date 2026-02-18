import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from '../appwrite/configAppWrite'
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);

    const isAuthor = post && userData ? post.userId === userData.$id : false;

    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                if (post) setPost(post);
                else navigate("/");
            });
        } else navigate("/");
    }, [slug, navigate]);

    const deletePost = () => {
        appwriteService.deletePost(post.$id).then((status) => {
            if (status) {
                appwriteService.deleteFile(post.featuredImage);
                navigate("/");
            }
        });
    };

    return post ? (
        <div className="py-4 sm:py-6 md:py-8 ">
            <Container>
                <div className="w-full h-80 flex justify-center mb-4 relative border rounded-xl p-2 sm:p-4">
                    {post.featuredImage && (
                        <img
                            src={appwriteService.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="rounded-xl w-full  object-cover"
                        />
                    )}

                    {isAuthor && (
                        <div className="absolute right-2 top-2 sm:right-4 sm:top-4 md:right-6 md:top-6 flex flex-col sm:flex-row gap-2">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button bgColor="bg-green-500" className="text-sm sm:text-base">
                                    Edit
                                </Button>
                            </Link>
                            <Button bgColor="bg-red-500" onClick={deletePost} className="text-sm sm:text-base">
                                Delete
                            </Button>
                        </div>
                    )}
                </div>
                <div className="w-full mb-6">
                    <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold">
                        {post.title}
                    </h1>
                </div>
                <div className="browser-css">
                    {post.content ? parse(post.content) : <p>No content available</p>}
                </div>
            </Container>

        </div>
    ) : null;
}