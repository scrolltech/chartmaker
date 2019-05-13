<template>
  <div class="modal">
    <div class="fields-input-form">
      <div class="fields">
        <div
          v-for="(value, key) in currentRow.data"
          v-bind:key="key"
          class="field ui input"
        >
          <input :placeholder="key" v-model="currentRow.data[key]" />
        </div>
      </div>

      <button
        class="save-data ui primary button"
        @click="saveRow(currentRow.index, currentRow.data)"
      >
        Save
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    currentRow: {
      type: Object
    },
    saveRow: {
      type: Function,
      required: true
    }
  },

  data() {
    return {};
  }
};
</script>

<style>
.modal {
  position: absolute;
  background: rgba(0, 0, 0, 0.7);
  width: 100%;
  height: 100%;
  top: 0;
  z-index: 999;
}
.fields {
  width: 550px;
  display: inline-block;
}
.field {
  width: 160px;
  margin-right: 10px;
  display: inline-block;
}
.fields-input-form {
  position: relative;
  width: 880px;
  margin: 300px auto;
  background: rgba(255, 255, 255, 0.9);
  padding: 26px 0;
  border-radius: 9px;
}
button.save-data {
  width: 272px;
  display: inline-block;
}
</style>
