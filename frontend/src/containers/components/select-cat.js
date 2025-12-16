export function SelectCategory() {
  const html = `
    <section class="w-full mb-12">
      <div class="flex flex-col md:flex-row md:items-center gap-4 mb-6">
        <h2 class="text-4xl font-bold text-black">Autres :</h2>
        <div class="relative w-full md:w-auto">
          <select
            id="category-select"
            class="text-2xl font-semibold text-black bg-white border-2 border-black px-4 py-2 pr-12 rounded cursor-pointer hover:bg-gray-50 transition appearance-none w-full"
          >
            <option value="">Sélectionner une catégorie</option>
          </select>
          <div class="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
            <svg width="20" height="18" viewBox="0 0 29 26" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M14.508 25.092L1.56462e-06 4.00543e-05H28.98L14.508 25.092Z" fill="black"/>
            </svg>
          </div>
        </div>
      </div>
      <div id="select-cat-films-grid" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      </div>
      <div id="select-cat-toggle-container" class="lg:hidden flex justify-center mt-6 hidden">
        <button id="select-cat-toggle-btn" class="bg-red-600 text-white text-2xl font-normal px-16 py-4 rounded-full hover:bg-red-700 transition">
          Voir plus
        </button>
      </div>
    </section>
  `;

  requestAnimationFrame(() => {
    fetch("http://localhost:8000/api/v1/titles/?page_size=100")
      .then((res) => res.json())
      .then((data) => {
        const genresSet = new Set();
        data.results.forEach((movie) => {
          if (movie.genres) {
            movie.genres.forEach((genre) => genresSet.add(genre));
          }
        });

        const genres = Array.from(genresSet).sort();
        const select = document.getElementById("category-select");

        if (select) {
          genres.forEach((genre) => {
            const option = document.createElement("option");
            option.value = genre;
            option.textContent = genre;
            select.appendChild(option);
          });
        }
      })
      .catch((error) => {
        console.error("Erreur lors du chargement des catégories:", error);
      });

    document.addEventListener("change", (e) => {
      if (e.target.id === "category-select") {
        const selectedGenre = e.target.value;
        const grid = document.getElementById("select-cat-films-grid");
        const toggleContainer = document.getElementById(
          "select-cat-toggle-container",
        );

        if (!selectedGenre || !grid) {
          if (grid) grid.innerHTML = "";
          if (toggleContainer) toggleContainer.classList.add("hidden");
          return;
        }

        grid.innerHTML =
          '<p class="text-black col-span-3 text-center text-xl">Chargement...</p>';

        fetch(
          `http://localhost:8000/api/v1/titles/?genre=${selectedGenre}&sort_by=-imdb_score&page_size=50`,
        )
          .then((res) => res.json())
          .then((data) => {
            if (!data.results || data.results.length === 0) {
              grid.innerHTML =
                '<p class="text-black col-span-3 text-center text-xl">Aucun film trouvé pour cette catégorie.</p>';
              if (toggleContainer) toggleContainer.classList.add("hidden");
              return;
            }

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

            if (toggleContainer) {
              toggleContainer.classList.remove("hidden");
            }

            const toggleBtn = document.getElementById("select-cat-toggle-btn");
            let isExpanded = false;

            if (toggleBtn) {
              const newToggleBtn = toggleBtn.cloneNode(true);
              toggleBtn.parentNode.replaceChild(newToggleBtn, toggleBtn);

              newToggleBtn.addEventListener("click", () => {
                const cards = grid.querySelectorAll(".movie-card");

                if (!isExpanded) {
                  cards.forEach((card) => {
                    card.classList.remove("hidden", "md:hidden", "lg:block");
                    card.classList.add("block");
                  });
                  newToggleBtn.textContent = "Voir moins";
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
                  newToggleBtn.textContent = "Voir plus";
                  isExpanded = false;
                }
              });
            }
          })
          .catch((error) => {
            console.error(
              `Erreur lors du chargement des films ${selectedGenre}:`,
              error,
            );
            grid.innerHTML =
              '<p class="text-black col-span-3 text-center">Erreur lors du chargement des films.</p>';
            if (toggleContainer) toggleContainer.classList.add("hidden");
          });
      }
    });
  });

  return html;
}
