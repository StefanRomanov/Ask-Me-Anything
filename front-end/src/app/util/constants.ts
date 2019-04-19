export default {
    AUTH_URL: "http://localhost:3000/auth/",
    FEED_URL: "http://localhost:3000/feed/",
    QUERY_EDITOR_MODULES: {
        toolbar: [
            ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
            ['blockquote', 'code-block'],

            [{ 'header': 1 }, { 'header': 2 }],               // custom button values
            [{ 'list': 'ordered'}, { 'list': 'bullet' }],
            [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
            [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
            [{ 'direction': 'rtl' }],                         // text direction

            [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
            [{ 'font': [] }],
            [{ 'align': [] }],

            ['clean'],                                         // remove formatting button

            ['link', 'image']                         // link and image, video
        ]
    },
    ANSWER_EDITOR_MODULES : {
        toolbar: [
            ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
            ['blockquote', 'code-block'],
            [{ 'list': 'ordered'}, { 'list': 'bullet' }],
            [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
            [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
            [{ 'direction': 'rtl' }],                         // text direction
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
            [{ 'align': [] }],

            ['clean'],                                         // remove formatting button

            ['link', 'image']                         // link and image, video
        ]
    }
};
