import "./style.css";
import { Header } from "./containers/header.js";
import { TopLanding } from "./containers/components/top-landing.js";
import { DetailsModal } from "./containers/components/details-modal.js";
import { BestFilms } from "./containers/components/best-films.js";
import { MysteryFilms } from "./containers/components/mystery.js";
import { SciFiFilms } from "./containers/components/sci-fi.js";
import { SelectCategory } from "./containers/components/select-cat.js";

function App() {
  return `
    <div class="w-full flex justify-center">
      <div class="w-full max-w-6xl md:px-8 px-0" style="font-family: Oswald, sans-serif;">
        ${Header()}
        ${TopLanding()}
        ${DetailsModal()}
        ${BestFilms()}
        ${MysteryFilms()}
        ${SciFiFilms()}
        ${SelectCategory()}
      </div>
    </div>
  `;
}

document.getElementById("app").innerHTML = App();
