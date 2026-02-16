 // import React, { useCallback } from 'react'
// import appwriteService from '../../appwrite/configAppWrite'
// import { useForm, useWatch } from 'react-hook-form'
// import { Button, Input, RTE, Select } from '../index'
// import { useNavigate } from 'react-router-dom'
// import { useSelector } from 'react-redux'

// /// PostForm component for creating and editing blog posts, utilizing react-hook-form for form handling and appwriteService for interacting with the backend

// export default function PostForm({ post }) { // post prop is passed when editing an existing post, otherwise it will be undefined for creating a new post
//     const { register, handleSubmit,   setValue, getValues, control } = useForm({ // initializing the form with default values based on the post prop, if it exists, otherwise using empty strings or default values for each field
//         defaultValues: {
//             title: post?.title || '',
//             slug: post?.slug || '',
//             content: post?.content || '',
//             image: post?.image || null,
//             status: post?.status || 'draft',

//         }
//     })

//     const navigate = useNavigate() // hook from react-router-dom for programmatic navigation after form submission
//     const userData = useSelector(state => state.auth.userData) // accessing user data from the Redux store to associate the post with the current user

//     const submit = async (data) => { // submit function to handle form submission, which will either create a new post or update an existing post based on the presence of the post prop

//         if (post) {
//             // If post exists, we are in edit mode
//             let file = null;
//             if (data.image[0]) {
//                 file = await appwriteService.uploadFile(data.image[0]);
//             }

//             if (file) {
//                 // If a new file is uploaded, delete the old file from storage
//                 appwriteService.deleteFile(post.featureImage);
//             }

//             // Update the post in the database
//             const dbPost = await appwriteService.updatePost(post.$id, {
//                 ...data,
//                 featureImage: file ? file.$id : post.featureImage
//             });

//             if (dbPost) {
//                 navigate(`/post/${dbPost.$id}`);
//             } else {
//                 console.error('Failed to update post');
//             }
//         } else {
//             // Creating a new post
//             let file = null;
//             if (data.image[0]) {
//                 file = await appwriteService.uploadFile(data.image[0]);
//             }

//             if (file) {
//                 const fileId = file.$id;
//                 const dbPost = await appwriteService.createPost({
//                     ...data,
//                     featuredImage: fileId,
//                     userId: userData.$id,

//                 });

//                 if (dbPost) {
//                     navigate(`/post/${dbPost.$id}`);
//                 } else {
//                     console.error('Failed to create post');
//                 }
//             } else {
//                 console.error('No image uploaded');
//             }
//         }
//     }

//     // useCallback hook to create a memoized function for transforming the title into a slug format, which will be used to automatically generate the slug based on the title input field value
//     const slugTransform = useCallback((value) => {
//         if (value && typeof value === 'string')
//             return value
//                 .trim()
//                 .toLocaleLowerCase()
//                 .replace(/^[a-zA-Z\d\s] +/g, '-')
//                 .replace(/\s/g, '-')

//         return ''


//     }, [])


//  // useEffect hook to watch for changes in the title field and automatically generate the slug based on the title using the slugTransform function, and update the slug field value accordingly using setValue from react-hook-form
//     const titleValue = useWatch({ control, name: 'title' });

//     React.useEffect(() => {
//         if (titleValue !== undefined) {
//             const slug = slugTransform(titleValue);
//             setValue('slug', slug);
//         }
//     }, [titleValue, slugTransform, setValue])






//     return (
//         <form onSubmit={handleSubmit(submit)} className='w-full flex flex-col gap-4 p-4 bg-white rounded-md shadow-md'>
//             <div className=' w-2/3 px-2'>
//                  <Input
//                     label='Title'
//                     placeholder='Post Title'
//                     className='mb-4'
//                     {...register("title", { required: true, maxLength: 100 })} // registering the title input field with validation rules for required and maximum length
//                 />
//                 <Input // slug input field with validation rules for required and maximum length
//                     label='Slug'
//                     placeholder='post-slug'
//                     className='mb-4'
//                     {...register('slug', { required: true, maxLength: 100 })} // 
//                     onInput={(e) => {
//                         setValue('slug', slugTransform(e.currentTarget.value),
//                             { shouldValidate: true,})
//                     }}
//                 />
//                 <RTE 
//                 label="Content :" 
//                 name="content"
//                 control={control} 
//                 defaultValue={getValues("content")}
//              />
//             </div>
//              <div className='w-1/3 px-2'>
//                 <Input // Input field for featured image upload, with validation rules for required file upload when creating a new post, and displaying the existing featured image if editing an existing post
//                     label='Featured Image'
//                     type='file'
//                     accpet='image/*'
//                     className='mb-4'
//                     {...register("image", { required: !post })} // registering the image input field with validation rules for optional file upload
//                 />
//                  {post && (
//                     <div className='mb-4'>
//                         <img src={appwriteService.getFilePreview(post.featureImage)} alt={post.title}
//                             className='rounded-lg'
//                         />
//                     </div>
//                 )}
//                  <Select
//                     options={
//                         ["active", "draft", "archived"].map(status => ({ label: status, value: status })) // mapping the status options to an array of objects with label and value properties for the Select component
//                     }
//                     label="Status"
//                     {...register("status", { required: true })} // registering the status select field without specific validation rules, as it will default to "draft" if not provided
//                 />
//                  <Button
//                     type='submit'
//                     bgColor={post ? "bg-green-500" : undefined}
//                     className='w-full' >
//                     {post ? "Update Post" : "Create Post"}
//                 </Button>

//             </div>
//         </form>

//     )
// }////////////////////////////////////////////////////////////////////////////////
////////////////////////////////
// const titleValue = useWatch({ control, name: 'title' , defaultValue: "" });

//     React.useEffect(() => {
//         if (titleValue) {
//             const slug = slugTransform(titleValue);
//             setValue('slug', slug,
//                 { shouldValidate: true }
//             );

//         }
//     }, [titleValue, slugTransform, setValue])
import React, { useCallback, useEffect } from "react";
import { useForm, useWatch, Controller } from "react-hook-form";
import { Button, Input, RTE, Select } from "..";
import appwriteService from "../../appwrite/configAppWrite";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PostForm({ post }) {
    console.log("PostForm: Received post prop:", post);
    const { register, handleSubmit, setValue, control, getValues } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.slug || "",
            content: post?.content || "",
            status: post?.status || "active",
            image: null,
        },
    });
    console.log("PostForm: Form defaultValues initialized with:", {
        title: post?.title || "",
        slug: post?.slug || "",
        content: post?.content || "",
        status: post?.status || "active",
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
            if (!userData?.$id) {
                console.error("User not logged in");
                return;
            }

            let fileId = post?.featuredImage || null;

            // Upload new image if provided
            if (data.image && data.image[0]) {
                const uploadedFile = await appwriteService.uploadFile(data.image[0]);
                if (!uploadedFile) {
                    console.error("File upload failed");
                    return;
                }
                fileId = uploadedFile.$id;

                // Delete old image on update
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
            } else {
                console.error("Post creation/update failed", dbPost);
            }
        } catch (error) {
            console.error("Submit error:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit(createPost)} className="flex flex-wrap">
            <div className="w-full md:w-2/3 px-2">
                <div>
                    <Input
                        label="Title..."
                        placeholder="Title"
                        className="mb-4"
                        {...register("title", { required: true })}
                    />
                </div>

                <div>
                    <Input
                        label="Slug..."
                        placeholder="Slug"
                        className="mb-4"
                        {...register("slug", { required: true })}
                        onInput={(e) =>
                            setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true })
                        }
                    />
                </div>

                <div>
                    <RTE
                        label="Content..."
                        name="content"
                        control={control}
                        defaultValue={getValues("content")}
                    />
                </div>
            </div>

            <div className="w-full md:w-1/3 px-2">
                <div>
                    <Input
                        label="Featured Image..."
                        type="file"
                        className="mb-4 w-full"
                        accept="image/png, image/jpg, image/jpeg, image/gif"
                        {...register("image", { required: !post })}
                    />
                </div>

                {post?.featuredImage && (
                    <div className="w-full mb-4">
                        <img
                            src={appwriteService.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}

                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4 bg-blue-500 hover:bg-blue-600 w-full md:w-auto"
                    {...register("status", { required: true })}
                />

                <div>
                    <Button type="submit" bgColor={post ? "bg-green-500" : undefined}
                        className="w-full md:w-auto bg-blue-500 hover:bg-blue-600 text-white">
                        {post ? "Update" : "Submit"}
                    </Button>
                </div>
            </div>
        </form>
    );
}




///////////////////////////////////////////////////////////////////////////
/////////////////////// GPT




