<template>
  <v-row no-gutters justify="center" align="center">
    <v-btn
      icon
      x-large
      color="#4472C4"
      style="transform: rotateY(180deg)"
      @click="changePage('-')"
    >
      <v-icon x-large>forward</v-icon>
    </v-btn>
    <div style="height: 40px; width: 50px">
      <v-text-field
        single-line
        solo
        class="pa-0 ma-0"
        dense
        v-model="pager.current_page"
      ></v-text-field>
    </div>
    <span> / {{ pager.last_page }}</span>
    <v-btn icon x-large color="#4472C4" @click="changePage('+')">
      <v-icon x-large>forward</v-icon>
    </v-btn>
  </v-row>
</template>

<script>
export default {
  props: ["pager"],
  data() {
    return {};
  },
  async fetch() {},
  methods: {
    changePage(e) {
      switch (e) {
        case "+":
          if (this.pager.current_page < this.pager.last_page)
            this.pager.current_page += 1;
          else return;
          break;
        case "-":
          if (this.pager.current_page > 1) this.pager.current_page -= 1;
          else return;
          break;
      }
    },
  },
  watch: {
    "pager.current_page": function () {
      this.$emit("changePage", this.pager.current_page);
    },
  },
};
</script>