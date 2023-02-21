<script>
export let key;
export let val;
export let item;


	import { onMount } from 'svelte';



onMount(async () => {
IconPicker.Init({
  // Required: You have to set the path of IconPicker JSON file to "jsonUrl" option. e.g. '/content/plugins/IconPicker/dist/iconpicker-1.5.0.json'
  jsonUrl: '/vendor/iconpicker/iconpicker-1.5.0.json',
  // Optional: Change the buttons or search placeholder text according to the language.
  searchPlaceholder: 'Search Icon',
  showAllButton: 'Show All',
  cancelButton: 'Cancel',
  noResultsFound: 'No results found.', // v1.5.0 and the next versions
  borderRadius: '20px', // v1.5.0 and the next versions
});
IconPicker.Run('#launchIconPicker-'+key, function(){
  item[key] = document.querySelector('#iconPicker-'+key).value;
  console.log(item);
});
});

</script>


<button id="launchIconPicker-{key}" class="btn btn-outline-secondary mb-2" data-iconpicker-input="#iconPicker-{key}" data-iconpicker-preview="#icon-preview-{key}">
  <i id="icon-preview-{key}" class="{item[key]}"></i>
  &nbsp;Choose Icon</button>
<input type="hidden" id="iconPicker-{key}" class="form-control">