<template>
  <div>
    <label
      :for="name"
      :class="type=='light'?'text-c-light hover:bg-c-light-15 focus:bg-c-light-15 checkbox-container checkbox-container-light':'hover:bg-c-primary-15 focus:bg-c-primary-15 checkbox-container'"
      class="flex flex-row items-center p-1 transition-colors duration-200 rounded-md"
    >
      <input :id="name" :checked="checked" type="checkbox" :name="name" />
      <span
        v-if="type=='light'"
        class="rounded-tl-md rounded-br-md rounded-tr-sm rounded-bl-sm border-c-light normal-checkmark-light"
      ></span>
      <span
        v-else
        class="rounded-tl-md rounded-br-md rounded-tr-sm rounded-bl-sm border-c-text normal-checkmark"
      ></span>
      <h5
        :class="type=='light'?'text-c-light':'text-c-text'"
        class="leading-tight font-bold"
      >{{text}}</h5>
    </label>
  </div>
</template>
<script>
import Icon from "~/components/Icon.vue";
export default {
  components: {
    Icon
  },
  props: {
    name: null,
    text: null,
    checked: null,
    type: null
  }
};
</script>
<style>
/* Customize the label (the container) */
.checkbox-container {
  position: relative;
  padding-left: 2rem;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

/* Hide the browser's default checkbox */
.checkbox-container input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

/* Create a custom checkbox */
.normal-checkmark,
.normal-checkmark-light {
  position: absolute;
  top: 0.25rem;
  left: 0.25rem;
  height: 1.2rem;
  width: 1.2rem;
  border-width: 0.1rem;
  border-style: solid;
}

/* When the checkbox is checked, add a blue background */
.checkbox-container input:checked ~ .normal-checkmark {
  background-color: var(--c-primary);
  border-color: var(--c-primary);
}

.checkbox-container input:checked ~ .normal-checkmark-light {
  background-color: var(--c-light);
  border-color: var(--c-light);
}

/* Create the checkmark/indicator (hidden when not checked) */
.normal-checkmark:after,
.normal-checkmark-light:after {
  content: "";
  position: absolute;
  display: none;
}

.checkbox-container input:checked ~ h5 {
  color: var(--c-primary);
}
.checkbox-container-light input:checked ~ h5 {
  color: var(--c-light);
}

/* Show the checkmark when checked */
.checkbox-container input:checked ~ .normal-checkmark:after,
.checkbox-container input:checked ~ .normal-checkmark-light:after {
  display: block;
}

/* Style the checkmark/indicator */
.checkbox-container .normal-checkmark:after {
  top: 0.05rem;
  left: 0.35rem;
  width: 0.4rem;
  height: 0.8rem;
  border: solid var(--c-background);
  border-width: 0 2px 2px 0;
  -webkit-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
}
.checkbox-container .normal-checkmark-light:after {
  top: 0.05rem;
  left: 0.35rem;
  width: 0.4rem;
  height: 0.8rem;
  border: solid var(--c-primary);
  border-width: 0 2px 2px 0;
  -webkit-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
}
</style>