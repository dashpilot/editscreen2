cfg = {};
cfg.basePath = "https://editscreen.vercel.app/";
cfg.dataPath = "data.json";
cfg.buttons = ["add", "design", "settings", "publish"];
cfg.assetsPath = "/assets/";
cfg.layoutPreview = "png";
cfg.settings = ["layouts", "settings"];
cfg.layouts = ["banner", "post", "features", "featured", "news"];
cfg.rte = [];

mytemplate = `
<div id="content">

      {{#each posts}}

      {{#ifEq layout 'banner'}}
      <section class="text-center layout-banner">
        <div class="container editable" id="{{id}}" data-fields="title=txt&amp;subtitle=txt&amp;button_text=txt&amp;button_link=txt&amp;icon=icon&amp;delete=del">
        <i class="{{default icon 'fas fa-crown'}} fa-big"></i>
        <h1>{{default title 'Lorem ipsum'}}</h1>
        <p>{{default subtitle 'Lorem ipsum dolor site amet'}}</p>
        <a href="{{button_link}}" class="btn btn-secondary">{{default button_text 'Contact Us'}}</a>
        </div>
      </section>

      {{/ifEq}}

      {{#ifEq layout 'featured'}}

      <section class="layout-featured">
       <div class="container editable" id="{{id}}" data-fields="title=txt&amp;body=rte&amp;delete=del">
         <div class="w-50 m-auto text-center">
         <h2>{{default title 'Lorem ipsum'}}</h2>
         {{{default body 'Lorem ipsum dolor site amet'}}}
         </div>
       </div>
      </section>

      {{/ifEq}}

      {{#ifEq layout 'news'}}

      <section class="layout-news">
      <div class="container editable" id="{{id}}" data-fields="title=txt&amp;body=mde&amp;delete=del">
        <div class="row">
        <div class="col-md-6">
          <h2>{{default title 'Lorem ipsum'}}</h2>
          {{{default body 'Lorem ipsum dolor site amet'}}}
        </div>
        <div class="col-md-6">
          <img src="{{default image 'https://editscreen.vercel.app/assets/img/placeholder.jpg'}}" class="img-fluid" />
        </div>
        </div>
      </div>
      </section>

      {{/ifEq}}


    {{#ifEq layout 'post'}}
    <section class="layout-post">
     <div id="{{id}}" class="container editable" data-fields="title=txt&amp;body=rte&amp;delete=del">
       <h2>{{default title 'Mauris eleifend ligula'}}</h2>
       {{{default body '<p>Mauris in porttitor elit. Aenean elementum eleifend quam, in tristique eros auctor porta. Donec et est in tellus blandit feugiat id nec nunc.</p>'}}}
     </div>
     </section>
     {{/ifEq}}


    {{#ifEq layout 'features'}}

    <section class="layout-features">
      <div class="container editable" id="{{id}}" data-fields="title=txt&amp;subtitle=txt&amp;title_2=txt&amp;subtitle_2=txt&amp;delete=del">
        <div class="row">
        <div class="col-md-6 text-center">
          <h3>{{default item.title 'Lorem Ipsum'}}</h3>
          <p>{{default item.subtitle 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris eleifend ligula ut augue scelerisque venenatis.'}}</p>
        </div>
        <div class="col-md-6 text-center">
          <h3>{{default item.title_2 'Lorem Ipsum'}}</h3>
          <p>{{default item.subtitle_2 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris eleifend ligula ut augue scelerisque venenatis.'}}</p>
        </div>
        </div>
      </div>
      </section>

    {{/ifEq}}

    {{/each}}

</div>`;
