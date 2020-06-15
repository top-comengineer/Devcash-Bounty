<template>
  <div>
    <label
      :class="type=='white'?'text-dtText hover_bg-dtText-15 focus_bg-dtText-15 checkbox-container checkbox-container-white':'hover_bg-dtPrimary-15 focus_bg-dtPrimary-15 checkbox-container'"
      class="flex flex-row items-center p-1 transition-colors duration-200 rounded-md"
    >
      <input :checked="checked" type="checkbox" :name="name" />
      <span
        v-if="type=='white'"
        class="rounded-tl-md rounded-br-md rounded-tr-sm rounded-bl-sm border-dtText normal-checkmark-white"
      ></span>
      <span
        v-else-if="$store.state.theme.dt"
        class="rounded-tl-md rounded-br-md rounded-tr-sm rounded-bl-sm border-dtText normal-checkmark-dt"
      ></span>
      <span
        v-else
        class="rounded-tl-md rounded-br-md rounded-tr-sm rounded-bl-sm border-ltText normal-checkmark-lt"
      ></span>
      <h5 class="leading-tight font-bold">{{text}}</h5>
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
.normal-checkmark-dt,
.normal-checkmark-lt,
.normal-checkmark-white {
  position: absolute;
  top: 0.25rem;
  left: 0.25rem;
  height: 1.2rem;
  width: 1.2rem;
  border-width: 0.1rem;
  border-style: solid;
}

/* On mouse-over, add a grey background color */
/* .checkbox-container:hover input ~ .normal-checkmark-dt {}

/* When the checkbox is checked, add a blue background */
.checkbox-container input:checked ~ .normal-checkmark-dt,
.checkbox-container input:checked ~ .normal-checkmark-lt {
  background-color: #675cff;
  border-color: #675cff;
}

.checkbox-container input:checked ~ .normal-checkmark-white {
  background-color: #f2f1ff;
  border-color: #f2f1ff;
}

/* Create the checkmark/indicator (hidden when not checked) */
.normal-checkmark-dt:after,
.normal-checkmark-lt:after,
.normal-checkmark-white:after {
  content: "";
  position: absolute;
  display: none;
}

.checkbox-container input:checked ~ h5 {
  color: #675cff;
}
.checkbox-container-white input:checked ~ h5 {
  color: #f2f1ff;
}

/* Show the checkmark when checked */
.checkbox-container input:checked ~ .normal-checkmark-dt:after,
.checkbox-container input:checked ~ .normal-checkmark-lt:after,
.checkbox-container input:checked ~ .normal-checkmark-white:after {
  display: block;
}

/* Style the checkmark/indicator */
.checkbox-container .normal-checkmark-dt:after {
  top: 0.05rem;
  left: 0.35rem;
  width: 0.4rem;
  height: 0.8rem;
  border: solid #181726;
  border-width: 0 2px 2px 0;
  -webkit-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
}
/* Style the checkmark/indicator */
.checkbox-container .normal-checkmark-lt:after {
  top: 0.05rem;
  left: 0.35rem;
  width: 0.4rem;
  height: 0.8rem;
  border: solid #f2f1ff;
  border-width: 0 2px 2px 0;
  -webkit-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
}
.checkbox-container .normal-checkmark-white:after {
  top: 0.05rem;
  left: 0.35rem;
  width: 0.4rem;
  height: 0.8rem;
  border: solid #675cff;
  border-width: 0 2px 2px 0;
  -webkit-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
}
</style>