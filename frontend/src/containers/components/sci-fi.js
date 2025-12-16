export function SciFiFilms() {
  const html = `
    <section class="w-full mb-12">
      <h2 class="text-4xl font-bold mb-6 text-black">Sci-Fi</h2>
      <div id="sci-fi-films-grid" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      </div>
      <div id="sci-fi-films-toggle-container" class="lg:hidden flex justify-center mt-6 hidden">
        <button id="sci-fi-films-toggle-btn" class="bg-red-600 text-white text-2xl font-normal px-16 py-4 rounded-full hover:bg-red-700 transition">
          Voir plus
        </button>
      </div>
    </section>
  `;

  requestAnimationFrame(() => {
    fetch(
      "http://localhost:8000/api/v1/titles/?genre=Sci-Fi&sort_by=-imdb_score&page_size=50",
    )
      .then((res) => res.json())
      .then((data) => {
        const grid = document.getElementById("sci-fi-films-grid");
        if (!grid) return;

        const shuffled = data.results.sort(() => 0.5 - Math.random());
        const selectedMovies = shuffled.slice(0, 6);

        grid.innerHTML = selectedMovies
          .map((movie, index) => {
            let hiddenClass = "";
            if (index >= 2 && index < 4) {
              hiddenClass = "hidden md:block";
            }
            if (index >= 4) {
              hiddenClass = "hidden md:hidden lg:block";
            }

            return `
          <div class="movie-card relative w-full h-[250px] overflow-hidden group cursor-pointer ${hiddenClass}" data-index="${index}">
            <img
              src="${movie.image_url}"
              alt="${movie.title}"
              class="absolute inset-0 w-full h-full object-cover"
            />
            <div class="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent"></div>
            <div class="absolute left-0 right-0 h-[102px] bg-black/50 flex flex-col justify-between px-4 py-2" style="top: 20%;">
              <h3 class="text-white font-bold text-lg line-clamp-2">${movie.title}</h3>
              <div class="flex justify-end">
                <button
                  class="details-btn text-white font-semibold rounded-[25px] transition hover:opacity-80"
                  style="width: 81px; height: 25px; padding: 2px 4px; font-size: 12px; background-color: hsla(0, 1%, 17%, 1);"
                  data-id="${movie.id}"
                >
                  Détails
                </button>
              </div>
            </div>
          </div>
        `;
          })
          .join("");

        const toggleContainer = document.getElementById(
          "sci-fi-films-toggle-container",
        );
        if (toggleContainer) {
          toggleContainer.classList.remove("hidden");
        }

        const toggleBtn = document.getElementById("sci-fi-films-toggle-btn");
        let isExpanded = false;

        if (toggleBtn) {
          toggleBtn.addEventListener("click", () => {
            const cards = grid.querySelectorAll(".movie-card");

            if (!isExpanded) {
              cards.forEach((card) => {
                card.classList.remove("hidden", "md:hidden", "lg:block");
                card.classList.add("block");
              });
              toggleBtn.textContent = "Voir moins";
              isExpanded = true;
            } else {
              cards.forEach((card, index) => {
                if (index >= 2 && index < 4) {
                  card.classList.remove("block");
                  card.classList.add("hidden", "md:block");
                } else if (index >= 4) {
                  card.classList.remove("block");
                  card.classList.add("hidden", "md:hidden", "lg:block");
                }
              });
              toggleBtn.textContent = "Voir plus";
              isExpanded = false;
            }
          });
        }
      })
      .catch((error) => {
        console.error("Erreur lors du chargement des films Sci-Fi:", error);
        const grid = document.getElementById("sci-fi-films-grid");
        if (grid) {
          grid.innerHTML =
            '<p class="text-white col-span-3 text-center">Erreur lors du chargement des films.</p>';
        }
      });
  });

  return html;
}
