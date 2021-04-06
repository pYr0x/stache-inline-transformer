import { StacheElement, ObservableArray } from "can";
class Counter extends StacheElement {
  static view = `
    <h1>Hello_{{world}}</h1>
  `;
  static view = '<h1>Hello_{{world}}</h1>';
  static props = {
    count: 0,
    name: String,
  };
  increment() {
    this.count++;
  }
  get latest() {
    return "latest";
  }
}
let toons = new ObservableArray([
  { title: "Looney Tunes", studio: "Warner Bros." },
  { title: "Darkwing Duck", studio: "Disney" },
  { title: "Merrie Melodies", studio: "Warner Bros." },
  { title: "Mickey Mouse", studio: "Disney" },
  { title: "The Flintstones", studio: "Hanna-Barbera" }
]);

let filtered = toons.filter(cartoon => cartoon.title === "The Flintstones");

customElements.define("count-er", Counter);
