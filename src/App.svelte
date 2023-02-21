<svelte:head>
	<link rel="stylesheet" href="https://unpkg.com/easymde/dist/easymde.min.css">
	<script src="https://unpkg.com/easymde/dist/easymde.min.js"></script>
	<style>
		.editable{
			border: 1px solid transparent;
		}
		.editable:hover {
			border: 1px dashed #999;
			cursor: pointer;
		}
	</style>
	
	<link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.9.0/css/all.min.css" rel="stylesheet">

	<link rel="stylesheet" href="{cfg.basePath}vendor/iconpicker/iconpicker-1.5.0.css" />
	<script src="{cfg.basePath}vendor/iconpicker/iconpicker-1.5.0.js"></script>

</svelte:head>

<script>
import { fade, fly } from 'svelte/transition';
import  { onMount  } from "svelte";
import {setTab} from './components/Helpers.svelte';
import Input from "./fieldtypes/Input.svelte";
import TextEditor from "./fieldtypes/TextEditor.svelte";
import Markdown from "./fieldtypes/Markdown.svelte";
import Image from "./fieldtypes/Image.svelte";
import Gallery from "./fieldtypes/Gallery.svelte";
import Icon from "./fieldtypes/Icon.svelte";
import Dock from "./components/Dock.svelte";

let data = {};
data.categories = [{name: "Home", slug: "home"}];
data.design = {};


let item = false;
let fields = [];
let curId = false;
let loading = false;
let error = false;
let user = false;
let tabs = ['title'];
let imgWidth = false;

onMount(async function() {

	const response = await fetch(cfg.dataPath + '?i=' + Date.now(), {
		method: 'get'
	});
	data = await response.json();

	let root = document.documentElement;
	root.style.setProperty('--bg-color', data.design.bgcolor);
  root.style.setProperty('--fg-color', data.design.fgcolor);

	document.addEventListener('click', function(e){



	if (e.target.closest('.editable') && e.target.tagName !== 'A') {
		let el = e.target.closest('.editable');
		curId = el.id;

		if (el.hasAttribute("data-width")) {
			imgWidth = el.getAttribute("data-width");
		}

		if (el.hasAttribute("data-fields")) {
			// you can also define the layout as key=value&amp;key-value
			let myfields = el.getAttribute('data-fields');
			var params = new URLSearchParams(myfields);
			fields = Object.fromEntries(params.entries())
			var layout = curId;
		}else{
			error = "no fields defined";
		}

		item = data.posts.filter(x => x.id === curId);
		if(item.length > 0){
			item = item[0];
			//item.layout = layout;
			if(typeof item.date == 'undefined'){
				item.date = formatDate();
			}

			// if this is a new item, populate fields
			Object.entries(fields).forEach(function(field){
				let key = field[0];
				if(typeof item[key] == 'undefined'){
					item[key] = '';
				}

			});

		}

		tabs = ['title'];
		// create tabs
		Object.values(fields).forEach(function(type, i){
			//console.log(type);
			if(type=='img' || type=='gal' || type=='icon'){
				tabs.push('images');
			}else if(type=='del'){
				tabs.push('options');
			}
		});
		tabs = tabs.filter(onlyUnique);

		//console.log(item);
		//console.log(fields);

	}

	});

});

function deleteItem(){
	var r = confirm("Are you sure you want to delete this item?");
	if (r == true) {
	let curIndex = data.posts.findIndex(x => x.id == curId);
	data.posts.splice(curIndex, 1);
	data = data;
	save();

	}
}

function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}

function save(){
	
	window.render(data);
	item = false;

}


function formatDate() {
		var date = new Date();
    var d = date.getDate();
    var m = date.getMonth() + 1; //Month from 0 to 11
    var y = date.getFullYear();
    return '' + y + '-' + (m<=9 ? '0' + m : m) + '-' + (d <= 9 ? '0' + d : d);
}
</script>



{#if item}
<div class="backdrop" spellcheck="false" transition:fade={{duration: 200}}>
<div id="editor" class="wdgt">

<div class="no-gutters wdgt-cols">
<div class="wdgt-side">

{#each tabs as tab}

	{#if tab=='title'}
	<a on:click="{() => setTab(tab)}" class="active-tab go-{tab}">{tab}</a>
	{:else}
	<a on:click="{() => setTab(tab)}" class="go-{tab}">{tab}</a>
	{/if}

{/each}



</div><div class="wdgt-main">



<div class="close" on:click="{() => item = false}">&times;</div>

{#if error}

	<div class="alert alert-danger"><b>CMS configuration error:</b> {error}</div>

{:else}

{#each Object.entries(fields) as [key, val] (key) }

	{#if val === 'txt'}

	<div class="tab-title wdgt-tab">
		<div class="label">{key.replace('_', ' ')}</div>
		<Input bind:key bind:val bind:item />
	</div>

	{:else if val === 'txta'}

	<div class="tab-title wdgt-tab">
		<div class="label">{key.replace('_', ' ')}</div>
		<textarea bind:value="{item[key]}" class="form-control"></textarea>
	</div>

	{:else if val === 'rte'}

	<div class="tab-title wdgt-tab">
		<div class="label">{key.replace('_', ' ')}</div>
		<TextEditor bind:key bind:val bind:item />
	</div>

	{:else if val === 'mde'}

	<div class="tab-title wdgt-tab">
		<div class="label">{key.replace('_', ' ')}</div>
		<Markdown bind:key bind:html={item[key]} />
	</div>

	{:else if val === 'icon'}

	<div class="tab-images wdgt-tab">
		<div class="label">{key.replace('_', ' ')}</div>
		<Icon bind:key bind:val bind:item />
	</div>

	{:else if val === 'img'}

	<div class="tab-images wdgt-tab">
		<div class="label">{key.replace('_', ' ')}</div>
		<Image bind:key bind:val bind:item bind:imgWidth />
	</div>


	{:else if val === 'gal'}

	<div class="tab-images wdgt-tab">
		<div class="label">{key.replace('_', ' ')}</div>
		<Gallery bind:key bind:val bind:item bind:imgWidth />
	</div>

	{:else if val === 'del' || val === 'date'}

	<div class="tab-options wdgt-tab">

{#if val === 'date'}
	<div class="label">Date</div>
	<input class="form-control date-field" bind:value="{item.date}" placeholder="YYYY-MM-DD"  />
{/if}


{#if val === 'del'}
		<div class="label">Delete</div>
		<button class="btn btn-outline-secondary delete-item" on:click="{deleteItem}">

			<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-trash" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
			  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
			  <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
			</svg>

			&nbsp;Delete

		</button>

{/if}


	</div>

	{/if}

{/each}





{/if}

 </div>
</div>

<div class="wdgt-footer">

<button class="btn btn-primary float-right" on:click="{save}">

{#if loading}<span class="spinner-border spinner-border-sm mr-1" role="status" aria-hidden="true"></span>{/if}
Save</button>
<div class="clear"></div>
</div>

</div>
</div>
{/if}

<Dock bind:data />
