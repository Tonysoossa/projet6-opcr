export function BestFilms() {
  const html = `
    <section class="w-full mb-12">
      <h2 class="text-4xl font-bold mb-6 text-black">Films les mieux notés</h2>
      <div id="best-films-grid" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      </div>
    </section>
  `;

  requestAnimationFrame(() => {
    fetch(
      "http://localhost:8000/api/v1/titles/?sort_by=-imdb_score&page_size=50",
    )
      .then((res) => res.json())
      .then((data) => {
        const grid = document.getElementById("best-films-grid");
        if (!grid) return;

        const shuffled = data.results.sort(() => 0.5 - Math.random());
        const selectedMovies = shuffled.slice(0, 6);

        grid.innerHTML = selectedMovies
          .map(
            (movie) => `
          <div class="relative w-full h-[250px] overflow-hidden group cursor-pointer">
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
        `,
          )
          .join("");
      })
      .catch((error) => {
        console.error("Erreur lors du chargement des films:", error);
        const grid = document.getElementById("best-films-grid");
        if (grid) {
          grid.innerHTML =
            '<p class="text-white col-span-3 text-center">Erreur lors du chargement des films.</p>';
        }
      });
  });

  return html;
}
