import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from '../appwrite/configAppWrite'
import { Button, Container, ShareButtons, CommentSection, LikeDislike } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
    const [post, setPost] = useState(null);
    const [scrollProgress, setScrollProgress] = useState(0);
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);
    const isAuthor = post && userData ? post.userId === userData.$id : false;

    // Scroll progress handler
    useEffect(() => {
        const handleScroll = () => {
            const totalScroll = document.documentElement.scrollTop;
            const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scroll = `${totalScroll / windowHeight}`;
            setScrollProgress(scroll);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

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

    // Calculate reading time
    const getReadingTime = (content) => {
        if (!content) return 1;
        const plainText = content.replace(/<[^>]*>?/gm, '');
        const wordCount = plainText.trim().split(/\s+/).length;
        return Math.max(1, Math.ceil(wordCount / 200));
    };

    // Generate basic TOC
    const generateTOC = (content) => {
        if (!content) return [];
        const regex = /<h([1-3])[^>]*>(.*?)<\/h\1>/g;
        const toc = [];
        let match;
        while ((match = regex.exec(content)) !== null) {
            toc.push({ level: parseInt(match[1]), text: match[2].replace(/<[^>]+>/g, '') });
        }
        return toc;
    };

    if (!post) return (
        <div className='w-full min-h-[60vh] flex items-center justify-center'>
            <div className='w-12 h-12 rounded-full border-4 border-t-rose-500 border-rose-100 animate-spin'></div>
        </div>
    );

    const toc = generateTOC(post.content);

    return (
        <div className="relative pb-16 bg-[var(--bg-primary)]">
            {/* Reading Progress Bar */}
            <div 
                className="fixed top-0 left-0 h-1 bg-[var(--accent-primary)] z-[100] transition-all duration-150 ease-out"
                style={{ width: `${scrollProgress * 100}%` }}
            />

            {/* Post Header Hero */}
            <div className="w-full bg-[var(--bg-secondary)] border-b border-[var(--color-cream-200)] py-12 lg:py-20">
                <Container>
                    <div className="max-w-4xl mx-auto text-center">
                        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-[var(--text-primary)] leading-tight mb-6">
                            {post.title}
                        </h1>
                        <div className="flex items-center justify-center gap-4 text-[var(--text-secondary)] font-medium">
                            <span className="flex items-center gap-1">⏱️ {getReadingTime(post.content)} min read</span>
                            <span>•</span>
                            <span className="flex items-center gap-1">📅 {new Date(post.$createdAt || Date.now()).toLocaleDateString()}</span>
                        </div>
                        
                        {isAuthor && (
                            <div className="mt-8 flex justify-center gap-4">
                                <Link to={`/edit-post/${post.$id}`}>
                                    <Button className="bg-[var(--bg-primary)] text-[var(--text-primary)] border border-[var(--color-cream-200)] hover:bg-[var(--color-cream-200)] hover:text-black shadow-sm transition-all rounded-full px-6">
                                        Edit Article
                                    </Button>
                                </Link>
                                <Button onClick={deletePost} className="bg-red-50 text-red-600 border border-red-200 hover:bg-red-600 hover:text-white shadow-sm transition-all rounded-full px-6">
                                    Delete Article
                                </Button>
                            </div>
                        )}
                    </div>
                </Container>
            </div>

            <Container>
                <div className="max-w-5xl mx-auto mt-[-3rem] md:mt-[-4rem] relative z-10 px-4">
                    {post.featuredImage && (
                        <div className="w-full h-[40vh] md:h-[60vh] rounded-2xl overflow-hidden shadow-xl border border-[var(--color-cream-200)] bg-white mb-12">
                            <img
                                src={appwriteService.getFilePreview(post.featuredImage)}
                                alt={post.title}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    )}

                    <div className="flex flex-col lg:flex-row gap-12">
                        {/* Main Content */}
                        <article className="w-full lg:w-3/4 bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-[var(--color-cream-200)] prose prose-lg prose-rose max-w-none">
                            {post.content ? parse(post.content) : <p>No content available</p>}
                            
                            <div className="flex items-center justify-between mt-12 pt-6 border-t border-[var(--color-cream-200)]">
                                <ShareButtons title={post.title} url={window.location.href} />
                                <div>
                                    <LikeDislike postId={post.$id} initialLikes={post.likes || 0} />
                                </div>
                            </div>

                            <CommentSection postId={post.$id} initialCommentsCount={post.comments?.length || 0} />
                        </article>

                        {/* Sidebar (TOC) */}
                        <aside className="w-full lg:w-1/4">
                            <div className="sticky top-24 bg-white p-6 rounded-2xl shadow-sm border border-[var(--color-cream-200)]">
                                <h3 className="text-lg font-bold text-[var(--text-primary)] mb-4 border-b border-[var(--color-cream-200)] pb-2">Table of Contents</h3>
                                {toc.length > 0 ? (
                                    <ul className="space-y-3 text-sm">
                                        {toc.map((item, idx) => (
                                            <li 
                                                key={idx} 
                                                className={`text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors cursor-pointer ${item.level === 2 ? 'ml-4' : item.level === 3 ? 'ml-8' : ''}`}
                                            >
                                                {item.text}
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p className="text-sm text-[var(--text-muted)]">No headers found.</p>
                                )}
                            </div>
                        </aside>
                    </div>
                </div>
            </Container>
        </div>
    );
}