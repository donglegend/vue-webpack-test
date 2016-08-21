<template>
	<ul>
		<li v-for="v in list" v-text="v"></li>
	</ul>
</template>


<style>
	li{
		background: #ccc;
		padding: 10px 0;
		margin: 8px 0;
		color: #000;
	}
	li:hover{
		background: #f90;
	}

</style>

<script>
	export default {
		data () {
			return {
				list: ['衡山','恒山','泰山','华山','嵩山']
			}
		}
	}
</script>