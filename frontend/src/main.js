import "./style.css";
import { Header } from "./containers/header";

function App() {
  return `
    <div class="w-full" id="app" style="font-family: Oswald, sans-serif;">
      ${Header()}
    </div>
  `;
}

document.getElementById("app").innerHTML = App();
