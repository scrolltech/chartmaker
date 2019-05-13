<template>
  <div class="notification" :class="type">
    {{ message }}
  </div>
</template>

<script>
export default {
  props: ['message', 'type'],

  mounted() {
    console.log('message: ', this.message);
  }
};
</script>

<style>
.notification {
  position: absolute;
  top: 0;
  width: 100%;
  font-size: 16px;
  padding: 10px;
  background: green;
  color: white;
}

.notification.error {
  background: red;
}
</style>
