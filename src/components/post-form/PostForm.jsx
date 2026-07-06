import React, { useCallback, useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import Button from "../Button.jsx";
import Input from "../Input.jsx";
import RTE from "../RTE.jsx";
import Select from "../Select.jsx";
import appwriteService from "../../appwrite/configAppWrite";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PostForm({ post }) {
    const { register, handleSubmit, setValue, control, getValues } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.slug || "",
            content: post?.content || "",
            status: post?.status || "active",
            image: null,
        },
    });

    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);

    // Auto-generate slug from title
    const slugTransform = useCallback((value) => {
        if (!value) return "";
        return value
            .trim()
            .toLowerCase()
            .replace(/[^a-z0-9\s-]/g, "")
            .replace(/\s+/g, "-")
            .replace(/-+/g, "-");
    }, []);

    const titleValue = useWatch({ control, name: "title", defaultValue: "" });

    useEffect(() => {
        if (titleValue) {
            const slug = slugTransform(titleValue);
            setValue("slug", slug, { shouldValidate: true });
        }
    }, [titleValue, slugTransform, setValue]);

    // Handle form submission
    const createPost = async (data) => {
        try {
            if (!userData?.$id) return;

            let fileId = post?.featuredImage || null;

            if (data.image && data.image[0]) {
                const uploadedFile = await appwriteService.uploadFile(data.image[0]);
                if (!uploadedFile) return;
                fileId = uploadedFile.$id;

                if (post?.featuredImage) {
                    await appwriteService.deleteFile(post.featuredImage);
                }
            }

            const payload = {
                title: data.title,
                slug: data.slug,
                content: data.content,
                status: data.status,
                featuredImage: fileId,
                userId: userData.$id,
            };

            let dbPost;
            if (post) {
                dbPost = await appwriteService.updatePost(post.$id, payload);
            } else {
                dbPost = await appwriteService.createPost(payload);
            }

            if (dbPost?.$id) {
                navigate(`/post/${dbPost.$id}`);
            }
        } catch (error) {
            console.error("Submit error:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit(createPost)} className="flex flex-col lg:flex-row gap-8">
            <div className="w-full lg:w-2/3 bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-[var(--color-cream-200)]">
                <div className="mb-6">
                    <Input
                        label="Article Title"
                        placeholder="Enter an engaging title..."
                        className="w-full border-[var(--color-cream-200)] focus:border-[var(--accent-primary)] focus:ring-1 focus:ring-[var(--accent-primary)] text-lg py-3"
                        {...register("title", { required: true })}
                    />
                </div>

                <div className="mb-6">
                    <Input
                        label="URL Slug (Auto-generated)"
                        placeholder="article-url-slug"
                        className="w-full border-[var(--color-cream-200)] focus:border-[var(--accent-primary)] bg-[var(--bg-primary)] text-[var(--text-secondary)]"
                        {...register("slug", { required: true })}
                        onInput={(e) =>
                            setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true })
                        }
                    />
                </div>

                <div className="mt-8">
                    <RTE
                        label="Content Editor"
                        name="content"
                        control={control}
                        defaultValue={getValues("content")}
                    />
                </div>
            </div>

            <div className="w-full lg:w-1/3 flex flex-col gap-6">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-[var(--color-cream-200)]">
                    <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-4 pb-2 border-b border-[var(--color-cream-200)]">Publishing Options</h3>
                    
                    <div className="mb-6">
                        <Select
                            options={["active", "inactive"]}
                            label="Visibility Status"
                            className="w-full mt-2 border-[var(--color-cream-200)]"
                            {...register("status", { required: true })}
                        />
                    </div>

                    <div className="pt-4 mt-4 border-t border-[var(--color-cream-200)]">
                        <Button type="submit" className="w-full py-3 rounded-xl font-semibold bg-[var(--accent-primary)] hover:bg-[var(--accent-hover)] text-white shadow-md hover:shadow-lg transition-all duration-300">
                            {post ? "Update Article" : "Publish Article"}
                        </Button>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm border border-[var(--color-cream-200)]">
                    <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-4 pb-2 border-b border-[var(--color-cream-200)]">Featured Media</h3>
                    
                    <Input
                        label="Upload Cover Image"
                        type="file"
                        className="w-full mb-4 border-[var(--color-cream-200)]"
                        accept="image/png, image/jpg, image/jpeg, image/webp"
                        {...register("image", { required: !post })}
                    />

                    {post?.featuredImage && (
                        <div className="w-full mt-4 rounded-xl overflow-hidden border border-[var(--color-cream-200)] shadow-sm">
                            <img
                                src={appwriteService.getFilePreview(post.featuredImage)}
                                alt={post.title}
                                className="w-full h-auto object-cover"
                            />
                        </div>
                    )}
                </div>
            </div>
        </form>
    );
}
