<script>
import { onMount } from 'svelte';
export let item;
export let key;
export let val;

onMount(async () => {

  const config = {
    classes: ['rich-text-editor'],
    tools: ['b', 'i', 'u', 'a', 'x'], // visible tool(s)
    text: {
      b: ['Bold', 'B', '⌘+B'],
      i: ['Italic', 'I', '⌘+I'],
      u: ['Underline', 'U', '⌘+U'],
      a: ['Link', 'A', '⌘+L'],
      x: ['Source', '&#x22ef;', '⌘+⇧+X']
    },
    tidy: true, // tidy HTML output?
    enter: true, // set to `false` to automatically submit the closest form on enter key press
    x: function(e, node) {}, // on mode change (view/source); set to `false` to disable the source view
    update: function(e, node) {} // on view/source update
  };

  new RTE(document.getElementById('rte-'+item.id), config);

  document.querySelector('.rich-text-editor-view').addEventListener('keyup', function(e){
    handleKeyUp(e);
  })

});


function handleKeyUp(e){

  let value = document.querySelector('.rich-text-editor-view').innerHTML;
  item[key] = value;

}

</script>


<textarea name="{key}" class="form-control rich-text-editor" id="rte-{item.id}">{item[key]}</textarea>
