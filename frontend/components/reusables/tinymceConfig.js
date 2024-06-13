// reusables/tinymceConfig.js
export const tinymceConfig = {
    height: 500,
    menubar: 'file edit view insert format tools table help',
    plugins: [
        'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview', 'anchor',
        'searchreplace', 'visualblocks', 'code', 'fullscreen',
        'insertdatetime', 'media', 'table', 'help', 'wordcount'
    ],
    toolbar:
        'undo redo | formatselect | bold italic backcolor | ' +
        'alignleft aligncenter alignright alignjustify | ' +
        'bullist numlist outdent indent | removeformat | help | ' +
        'link image media',
    block_formats:
        'Paragraph=p; Heading 1=h1; Heading 2=h2; Heading 3=h3; Heading 4=h4; Heading 5=h5; Heading 6=h6;',
    content_style: 'body { background-color: #ffffff; padding: 15px; color: #000000; font-family: Arial, sans-serif; }',
    file_picker_callback: function (callback, value, meta) {
        const input = document.createElement('input');
        input.setAttribute('type', 'file');

        if (meta.filetype === 'image') {
            input.setAttribute('accept', 'image/*');
        } else if (meta.filetype === 'media') {
            input.setAttribute('accept', 'video/*, audio/*');
        }

        input.onchange = function () {
            const file = input.files[0];
            const reader = new FileReader();
            reader.onload = function (e) {
                callback(e.target.result, {
                    alt: file.name
                });
            };
            reader.readAsDataURL(file);
        };
        input.style.display = 'none';
        document.body.appendChild(input);
        input.click();
        document.body.removeChild(input);
    }
};
