# Editscreen

On-page CMS and page-builder that works with any front-end or back-end language. The included demo uses a simple Handlebars template, but you can use it with a JS framework like Vue or a backend language like Nodejs or php.

## How to make a section editable?

Just add a class of `editable`, a unique `id` and a `data-fields` attribute, like so:

```
<div class="editable" id="item-123" data-fields="title=txt&amp;body=rte&amp;delete=del">
<h1>This title is now editable</h1>
This body text is now editable
</div>
```

If the user clicks on the text, the editor will open with the defined fields.

The data-fields attribute contains key value pairs where the first is the name of the field, and the second is the type of field. Current field types are:

- txt: single-line text input
- txta: multi-line textarea
- rte: rich text editor
- mde: markdown editor
- icon: font awesome icon picker
- img: single image upload
- gal: multi image-upload (gallery)
- del: option to delete the post

## Installation

To install the editor, add the following code to the head of each page:

```
<link rel='stylesheet' href='https://editscreen.vercel.app/global.css'>
<link rel='stylesheet' href='https://editscreen.vercel.app/build/bundle.css'>
<script defer src='https://editscreen.vercel.app/build/bundle.js'></script>
<script>
    window.page = 'home'; // pass the name of the current page to the editor
</script>
```

## Configuration

Currently, the following options are available:

```
cfg = {};
cfg.basePath = 'https://editscreen.vercel.app/'; // The URL of your site, with trailing slash
cfg.dataPath = 'data.json'; // where will the json data be stored
cfg.apiPath = '/api/';
cfg.assetsPath = '/assets/'; // where is the assets folder?
cfg.imgPath = ''; // where are images stored?
cfg.imgWidth = '400'; // image width
cfg.buttons = ['add', 'design', 'settings', 'publish']; // which buttons should be displayed in the interface?
cfg.layoutPreview = 'png'; // preview images in `/assets/layouts`, remove if you don't want a preview
cfg.settings = ['layouts']; // which settings should be displayed on the `settings` screen
cfg.layouts = ['banner', 'post', 'features', 'featured', 'news'];
cfg.page = window.page; // used to keep track of the current page
cfg.rte = ['h1', 'h2', 'h3'] // add buttons to the rich text editor
```

## Saving data

Every time the user saves data, the render() function is called. To hook into your back-end, define the render function, for example:

```
function render(data) {
  let opts = {};
  opts.type = 'json';
  opts.page = window.page;
  opts.data = data;
  fetch('/api/save', {
    method: 'post',
    body: JSON.stringify(opts)
  }).then(function(response) {
    return response.text();
  }).then(function(data) {
    document.querySelector('#page').innerHTML = data;
  });
}
```

## Demo

https://editscreen.vercel.app
