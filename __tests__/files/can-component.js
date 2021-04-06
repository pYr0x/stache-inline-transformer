import {Component} from "can";
const MyCounter = Component.extend({
  tag: "my-counter",
  view: `
    <h1>Hello_{{world}}</h1>
  `,
  ViewModel: {
    count: {default: 0},
    increment() {
      this.count++;
    }
  }
});
