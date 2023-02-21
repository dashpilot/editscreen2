<script>
import { fade, fly } from 'svelte/transition';
import  { beforeUpdate, afterUpdate  } from "svelte";
import {setTab} from './Helpers.svelte';

export let showSettings;
export let data;
let title;
let grouped = false;

afterUpdate (async function() {


});

function addCat(){
	let newCat = {};
	newCat.id = Date.now();
	newCat.title = title;
	if(title.length < 4){
		alert('Title should be at least 4 characters long')
	}else{
	newCat.slug = slugify(title);
	title = '';
	data.categories.push(newCat);
	data.categories = data.categories;
	}
}

function deleteCat(i){
	var result = confirm("Are you sure you want to delete this category?");
	if (result) {
	data.categories.splice(i, 1);
	data.categories = data.categories;
	}
}

function save(){
	window.render(data);
	showSettings = false;
}

function close(){
  showSettings = false;
}

function slugify(text)
{
  return text.toString().toLowerCase()
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
    .replace(/\-\-+/g, '-')         // Replace multiple - with single -
    .replace(/^-+/, '')             // Trim - from start of text
    .replace(/-+$/, '');            // Trim - from end of text
}

function move(array, from, to) {
  if (to === from) return array

  var target = array[from]
  var increment = to < from ? -1 : 1

  for (var k = from; k != to; k += increment) {
    array[k] = array[k + increment]
  }
  array[to] = target
  return array
}

function moveDown(what, index) {

    var newindex = index + 1

  if (typeof data[what][newindex] !== 'undefined') {
    data[what] = move(data[what], index, index + 1)
    data[what] = data[what];
  }
}

function groupByKey(array, key) {
   return array
     .reduce((hash, obj) => {
       if(obj[key] === undefined) return hash;
       return Object.assign(hash, { [obj[key]]:( hash[obj[key]] || [] ).concat(obj)})
     }, {})
}

</script>

{#if showSettings}
<div class="backdrop" transition:fade={{duration: 200}}>
<div id="settings" class="wdgt">


<div class="wdgt-cols">
<div class="wdgt-side settings-screen">
<h5>Settings</h5>

<a on:click="{() => setTab('categories')}" class="active-tab go-categories">Categories</a>

{#if cfg.settings.includes("settings")}
<a on:click="{() => setTab('settings')}" class="go-settings">Settings</a>
{/if}

{#if cfg.settings.includes("updates")}
<a on:click="{() => setTab('updates')}" class="go-updates">Updates</a>
{/if}

<a on:click="{() => setTab('account')}" class="go-account">Account</a>


<br>

<h5>Sections</h5>

{#if cfg.settings && cfg.settings.includes("layouts")}
	{#each cfg.layouts as layout}
	<a on:click="{() => setTab(layout)}" class="go-{layout}">{layout}</a>
	{/each}
{/if}

</div><div class="wdgt-main">

<div class="close" on:click="{close}">&times;</div>


<div class="tab-categories wdgt-tab" style="display: block;">
<h5 class="text-capitalize">Categories</h5>

<div class="input-group mb-3 mt-3 w-50">
  <input type="text" class="form-control add-cat" placeholder="Category title" bind:value="{title}">
  <div class="input-group-append">
    <button class="btn btn-outline-secondary" type="button" on:click="{addCat}">Add</button>
  </div>
</div>

<ul class="list-group mt-3">
	{#each data.categories as item, i}
		<li class="list-group-item">

{#if item.slug !== 'home'}
<div class="mt-2 float-left">{item.title}</div>
{:else}
{item.title}


<button class="btn btn-outline-secondary opacity-0">
	<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-caret-down" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
	  <path fill-rule="evenodd" d="M3.204 5L8 10.481 12.796 5H3.204zm-.753.659l4.796 5.48a1 1 0 0 0 1.506 0l4.796-5.48c.566-.647.106-1.659-.753-1.659H3.204a1 1 0 0 0-.753 1.659z"/>
	</svg>
</button>
{/if}

{#if item.slug !== 'home'}
		<div class="btn-group float-right">

		<button class="btn btn-outline-secondary" on:click="{() => moveDown('categories', i)}">
		<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-caret-down" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
		  <path fill-rule="evenodd" d="M3.204 5L8 10.481 12.796 5H3.204zm-.753.659l4.796 5.48a1 1 0 0 0 1.506 0l4.796-5.48c.566-.647.106-1.659-.753-1.659H3.204a1 1 0 0 0-.753 1.659z"/>
		</svg>
		</button>

		<button class="btn btn-outline-secondary float-right" on:click="{() => deleteCat(i)}">
		<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-trash" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
			<path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
			<path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
		</svg>
		</button>

		</div>
{/if}

		</li>
	{/each}
</ul>

</div>


{#if cfg.settings && cfg.settings.includes("layouts")}

{#each cfg.layouts as type}
<div class="tab-{layout} wdgt-tab" style="display: none;">

<h5 class="text-capitalize">{layout}</h5>

<ul class="list-group mt-1 mb-4">
	{#each data.posts as item, i}

{#if item.type==type}

		<li class="list-group-item">

		<div class="row no-gutters">
		<div class="col-md-10">

<div class="item-title text-truncate">{#if item.title==''}<div class="color-grey">Untitled</div>{:else}{item.title}{/if}</div>
</div>


	<div class="col-md-2">
		<div class="btn-group float-right">

		<button class="btn btn-outline-secondary" on:click="{() => moveDown('posts', i)}">
		<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-caret-down" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
		  <path fill-rule="evenodd" d="M3.204 5L8 10.481 12.796 5H3.204zm-.753.659l4.796 5.48a1 1 0 0 0 1.506 0l4.796-5.48c.566-.647.106-1.659-.753-1.659H3.204a1 1 0 0 0-.753 1.659z"/>
		</svg>
		</button>

		</div>
</div>
</div>

		</li>

		{/if}
	{/each}
</ul>
</div>
	{/each}

	{/if}

<div class="tab-account wdgt-tab">

<h5 class="text-capitalize">Account</h5>

	<a href="/api/logout" class="btn btn-outline-secondary">Log Out</a>

</div>


<div class="tab-settings wdgt-tab">

	<h5 class="text-capitalize">Settings</h5>

{#if cfg.settings.includes("settings")}
{#each Object.keys(data.settings) as key}

<div class="label">{key}</div>
<input type="text" class="form-control" bind:value={data.settings[key]} />

{/each}
{/if}
	

</div>



<div class="tab-updates wdgt-tab">

	<h5 class="text-capitalize">Updates</h5>

	<div class="alert alert-warning">Up to date! Current version: 1.2</div>

</div>




</div>
</div>




<div class="wdgt-footer">

    <button class="btn btn-primary float-right" on:click="{save}">Save</button>

<div class="clear"></div>
</div>

</div>
</div>

{/if}

<style>
	.add-cat{
		border-right: 0;
		height: 38px;
	}
	
	.opacity-0{
		opacity: 0;
	}
	
	.item-title{
		margin-top: 6px;
	}
</style>
