 import React from 'react'
import { Editor } from '@tinymce/tinymce-react'
import { Controller } from 'react-hook-form'
// import 'tinymce/tinymce.min.js';


export default function RTE({ name, control, label, defaultValue = "" }) {

    return (

        <div className='w-full'>

            {label && <label className='inline-block mb-1 pl-1 mr-150 font-bold'>{label}</label>}

            <Controller // from react-hook-form to control the form state of the editor
                name={name || "content"} // name of the form field, defaulting to "content" if not provided
                control={control} // control object from react-hook-form to manage the form state

                render={({ field: { onChange, value } }) => (  // render prop to render the Editor component, destructuring onChange and value from the field object provided by react-hook-form
                    <Editor  // TinyMCE Editor component
                        apiKey='3hk7414yn8od1iqp59k497iw5mhh6rfny5jsi8szhawujtuo'
                        value={value}
                        initialValue={defaultValue || ''}
                        /// initial value for the editor, using defaultValue prop
                        init={{
                            height: 500,
                            menubar: true,
                            plugins: [
                                "image",
                                "advlist",
                                "autolink",
                                "lists",
                                "link",
                                "image",
                                "charmap",
                                "preview",
                                "anchor",
                                "searchreplace",
                                "visualblocks",
                                "code",
                                "fullscreen",
                                "insertdatetime",
                                "media",
                                "table",
                                "code",
                                "help",
                                "wordcount",
                                "anchor",
                            ],
                            // toolbar configuration for the editor, specifying which buttons and features to include in the toolbar
                            toolbar: "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter bold italic forecolor |             aligncenter alignright alignjustify | bullist numlist outdent indent |removeformat | help",

                            content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",

                            skin: 'oxide-dark',


                        }}
                        onEditorChange={onChange} // when the content of the editor changes, call the onChange function provided by react-hook-form to update the form state
                    />

                )}

            />


        </div>
    )
}

