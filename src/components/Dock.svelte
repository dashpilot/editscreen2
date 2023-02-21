<script>
import { fade, fly } from 'svelte/transition';
import Add from './Add.svelte';
import Publish from './Publish.svelte';
import Settings from './Settings.svelte';
import Design from './Design.svelte';

export let data;
let showAdd = false;
let showDesign = false;
let showSettings = false;
let showPublish = false;


</script>

<Add bind:showAdd bind:data />
<Settings bind:showSettings bind:data />
<Publish bind:showPublish />
<Design bind:showDesign bind:data />

<div id="dock" transition:fade>

  {#if cfg.buttons.includes("add")}
    <img src="{cfg.basePath}assets/img/add.png" alt="Add content" class="dock-btn grow" on:click="{() => showAdd = true}" />
  {/if}

  {#if cfg.buttons.includes("design")}
    <img src="{cfg.basePath}assets/img/design.png" alt="Design" class="dock-btn grow" on:click="{() => showDesign = true}" />
  {/if}

  {#if cfg.buttons.includes("settings")}
    <img src="{cfg.basePath}assets/img/settings.png" alt="Settings" class="dock-btn grow" on:click="{() => showSettings = true}" />
  {/if}

  {#if cfg.buttons.includes("publish")}
    <img src="{cfg.basePath}assets/img/publish.png" alt="Publish" class="dock-btn grow" on:click="{() => showPublish = true}" />
  {/if}

</div>


<style>
#dock{
width: 320px;
position: fixed;
bottom: 20px;
left: calc(50% - 160px);
text-align: center;
}

.dock-btn{
  width: 60px;
  margin: 5px;
}

.grow { transition: all .2s ease-in-out; }
.grow:hover { transform: scale(1.1); cursor: pointer; }

</style>
