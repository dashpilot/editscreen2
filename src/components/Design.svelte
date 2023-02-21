<script>
import { fade, fly } from 'svelte/transition';
export let showDesign;
export let data;
let loading = false;

function setColor(hex){
  console.log('hi');
  let root = document.documentElement;
  root.style.setProperty('--bg-color', hex);
  let contrastColor = contrast(hex);
  root.style.setProperty('--fg-color', contrastColor);

  data.design.bgcolor = hex;
  data.design.fgcolor = contrastColor;
  data = data;
}

function contrast(hex) {
    var rgb = hexToRgb(hex);
    var contrast = (Math.round(rgb.r * 299) + Math.round(rgb.g * 587) + Math.round(rgb.b * 114)) / 1000;
    return (contrast >= 160) ? '#000000' : '#FFFFFF';
}

function hexToRgb(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

</script>

{#if showDesign}
  <div class="wdgt wdgt-right" transition:fly="{{x:300, duration: 600 }}" spellcheck="false">
  <div class="wdgt-header">
  <h6 class="float-left">Edit Design</h6>

  <div class="close" on:click="{() => showDesign = false}">&times;</div>

  </div>

  <div class="wdgt-content pt-3">


<div class="label">Background-color</div>
<input bind:value="{data.design.bgcolor}" type="color" on:input="{() => setColor(data.design.bgcolor)}" class="form-control">

  </div>

  </div>
{/if}
