<script>
import { onMount } from 'svelte';
export let item;
export let key;
export let imgWidth;
let uploading = false;

onMount(async () => {

  document.getElementById('fileInput-'+key).addEventListener('change', function(e) {

    uploading = true;

    if(imgWidth){
      var width = imgWidth;
    }else if(cfg.imgWidth){
      var width = cfg.imgWidth;
    }else{
      var width = 800;
    }
    var img = new Image();
    img.onload = function() {
      var canvas = document.createElement('canvas'),
        ctx = canvas.getContext("2d"),
        oc = document.createElement('canvas'),
        octx = oc.getContext('2d');

      canvas.width = width; // destination canvas size
      canvas.height = canvas.width * img.height / img.width;

      var cur = {
        width: Math.floor(img.width * 0.5),
        height: Math.floor(img.height * 0.5)
      }

      oc.width = cur.width;
      oc.height = cur.height;

      octx.drawImage(img, 0, 0, cur.width, cur.height);

      while (cur.width * 0.5 > width) {
        cur = {
          width: Math.floor(cur.width * 0.5),
          height: Math.floor(cur.height * 0.5)
        };
        octx.drawImage(oc, 0, 0, cur.width * 2, cur.height * 2, 0, 0, cur.width, cur.height);
      }

      ctx.drawImage(oc, 0, 0, cur.width, cur.height, 0, 0, canvas.width, canvas.height);
      var base64Image = canvas.toDataURL('image/jpeg')

      //console.log(base64Image);



      if(cfg.apiPath){

        fetch(cfg.apiPath+"save", {
            method: 'post',
            body: JSON.stringify({type: 'img', data: base64Image}),
          }).then(function(response) {
            return response.json();
          }).then(function(data) {
            console.log(data);
            item[key] = data.filename;
            uploading = false;
          })
          .catch(function(error) {
            console.log(error);
            uploading = false;
          });
      }else{
        item[key] = base64Image;
        uploading = false;
      }

      // cleaning up
      URL.revokeObjectURL(img.src)

    }
    img.src = URL.createObjectURL(e.target.files[0]);

  })

});

function clickSelect(mykey){
  document.querySelector('#fileInput-'+mykey).click();
}

function deleteImage(key){
  console.log(key);

  var r = confirm("Are you sure you want to delete this image?");
  if (r == true) {

  if(cfg.apiPath){

    fetch(cfg.apiPath+"delete/", {
        method: 'post',
        body: JSON.stringify({filename: item[key]}),
      }).then(function(response) {
        return response.json();
      }).then(function(data) {
        console.log(data);
        item[key] = '';
      })
      .catch(function(error) {
        console.log(error);
      });

  }else{
    item[key] = '';
  }

  }

}
</script>



{#if item[key]}
<ul class="list-group">
<li class="list-group-item">

<div class="row">
  <div class="col-md-1"><div class="box" style="background-image: url({cfg.imgPath}{item[key]});"></div></div>
  <div class="col-md-5"></div>
  <div class="col-md-6">
  <button class="btn btn-outline-secondary float-right" on:click="{() => deleteImage(key)}">
  <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-trash" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
    <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
  </svg>
  </button>

  </div>
</div>

</li>
</ul>


{:else}

<button class="btn btn-outline-secondary" on:click="{() => clickSelect(key)}">


{#if uploading}
<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
{:else}
<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-card-image" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
  <path fill-rule="evenodd" d="M14.5 3h-13a.5.5 0 0 0-.5.5v9c0 .013 0 .027.002.04V12l2.646-2.354a.5.5 0 0 1 .63-.062l2.66 1.773 3.71-3.71a.5.5 0 0 1 .577-.094L15 9.499V3.5a.5.5 0 0 0-.5-.5zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13zm4.502 3.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
</svg>
{/if}

&nbsp;Choose Image</button>
<br />
{/if}
<input type="file" id="fileInput-{key}" class="fileInput" accept="image/*" data-name="{key}" />




<style>
.fileInput{
  display: none;
}

.btn {
    margin-bottom: 0px;
}


.box{
  display: inline-block;
  width: 39px;
  height: 39px;
  border: 1px solid #6c757d;
  background-size: cover;
  border-radius: 4px;
  margin-bottom: 0;
}

.list-group-item{
  padding-bottom: 6px;
  padding-left: 15px;
  padding-right: 15px;
  margin-bottom: 10px;
}
</style>
