<template>
  <div>
    <h2>Hello there</h2>
    <button @click="test">Click me</button>
  </div>
</template>

<script>
export default {
   
  methods: {
    test() {
      alert('I am there')
    }
  }

}
</script>