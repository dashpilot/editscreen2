<script>
export let item;
export let key;
export let val;

</script>

<input type="text" name="{key}" class="form-control" bind:value="{item[key]}">

<style>
.form-control {
    margin-bottom: 10px;
}
</style>
