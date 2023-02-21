<script context="module">
export function setTab(tab){
	document.querySelectorAll('.wdgt-tab').forEach(function(e){
		e.style.display = 'none';
	})

	document.querySelectorAll('.tab-'+tab).forEach(function(e){
		e.style.display = 'block';
	})

	document.querySelectorAll('.active-tab').forEach(function(e){
		e.classList.remove('active-tab');
	})

	document.querySelector('.go-'+tab).classList.add('active-tab');
}
</script>
