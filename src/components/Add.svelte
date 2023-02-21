<script>
import { fade, fly } from 'svelte/transition';
export let showAdd;
export let data;
let loading = false;

function insertBlock(layout){

  let fields = [];

  //fields = data.layouts.filter(x => x.name === layout);
  //fields = fields[0].fields;

  const item = {};
  item.id = "item-" + Date.now();
  item.title = 'Lorem Ipsum';
  item.body = '';
  item.layout = layout;
  if(cfg.category){
    item.category = cfg.category;
  }else{
    var mycat = window.location.pathname.replace('/', '');
    if(mycat==''){
      item.category = 'home';
    }else{
      item.category = window.location.pathname.replace('/', '');
    }
    
  }

  console.log(item);
  data.entries.unshift(item);
  window.render(data);

  showAdd = false;

}
</script>

{#if showAdd}
  <div class="wdgt wdgt-left" id="add-item" transition:fly="{{x:-300, duration: 600 }}" spellcheck="false">
  <div class="wdgt-header">
  <h6 class="float-left">Add content blocks</h6>

  {#if loading}
  <span class="spinner-border spinner-border-sm float-right" role="status" aria-hidden="true"></span>
  {:else}
  <div class="close" on:click="{() => showAdd = false}">&times;</div>
  {/if}
  </div>

  <div class="wdgt-content pt-3">

  {#if cfg.layouts}
    {#if cfg.layoutPreview}
      {#each cfg.layouts as item}
      <img src="{cfg.basePath}assets/layouts/{item}.png" alt="{item}" class="box" on:click="{() => insertBlock(item)}" />
      {/each}
    {:else}
      <ul class="list-group">
        {#each cfg.layouts as item}
        <li class="list-group-item add-item" on:click="{() => insertBlock(item)}">{item}</li>
        {/each}
      </ul>

    {/if}

  {:else}

  <div class="note">No content blocks found for this page.</div>

  {/if}

  </div>

  </div>
{/if}
