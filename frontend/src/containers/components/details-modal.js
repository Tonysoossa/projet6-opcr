export function DetailsModal() {
  const html = `
   <div id="movie-modal-overlay" class="fixed inset-0 bg-black/60 backdrop-blur-sm hidden justify-center items-center z-50">
      <div class="bg-gray-100 max-w-6xl w-full p-4 md:p-12 overflow-y-auto max-h-[90vh] relative border-4 border-black">

        <button id="modal_close_btn_mobile" class="md:hidden absolute top-4 right-4 text-red-600 hover:text-red-700 text-5xl font-bold transition cursor-pointer z-10 leading-none">
          ×
        </button>

        <div class="flex flex-col md:flex-row md:justify-between gap-8 mb-8">
          <div class="flex flex-col gap-6 w-full md:w-4/5">

            <h2 id="modal_title" class="text-5xl font-bold text-black"></h2>

            <div class="flex flex-col gap-2 text-2xl text-black">
              <p id="modal_year_genre_runtime"></p>
              <p id="modal_rating_duration"></p>
              <p id="modal_rating"></p>
              <p id="modal_boxoffice"></p>
            </div>

            <div class="mt-4">
              <p class="font-bold text-2xl text-black">Réalisé par:</p>
              <p id="modal_directors" class="text-2xl text-black"></p>
            </div>

          </div>

          <div class="hidden md:flex md:w-1/5 justify-end">
            <img id="modal_image" class="object-cover w-full h-auto border-4 border-black" />
          </div>
        </div>

        <div class="mb-8">
          <p id="modal_description" class="text-xl leading-relaxed text-black"></p>
        </div>

        <div class="flex md:hidden justify-center mb-8">
          <img id="modal_image_mobile" class="object-cover w-full max-w-md h-auto border-4 border-black" />
        </div>

        <div class="mb-8">
          <p class="font-bold text-2xl text-black mb-2">Avec:</p>
          <p id="modal_actors" class="text-xl text-black"></p>
        </div>

        <div class="hidden md:flex justify-center pt-4">
          <button id="modal_close_btn" class="bg-red-600 text-white text-2xl font-normal px-16 py-4 rounded-full hover:bg-red-700 transition">
            Fermer
          </button>
        </div>

      </div>
    </div>
  `;

  requestAnimationFrame(() => {
    document.addEventListener("click", (e) => {
      const btn = e.target.closest(".details-btn");
      if (btn) {
        const movieId = btn.dataset.id;
        if (!movieId) return;

        const overlay = document.getElementById("movie-modal-overlay");
        overlay.classList.remove("hidden");
        overlay.classList.add("flex");

        fetch(`http://localhost:8000/api/v1/titles/${movieId}`)
          .then((res) => res.json())
          .then((data) => {
            document.getElementById("modal_title").textContent = data.title;
            document.getElementById("modal_year_genre_runtime").textContent =
              `${data.year} - ${data.genres.join(", ")}`;
            document.getElementById("modal_rating_duration").textContent =
              `${data.rated || "PG-13"} - ${data.duration} minutes (${data.countries?.join(" / ") || "USA"})`;
            document.getElementById("modal_rating").textContent =
              `IMDB score: ${data.imdb_score}/10`;
            document.getElementById("modal_boxoffice").textContent =
              `Recettes au box-office: ${data.worldwide_gross_income || "N/A"}`;
            document.getElementById("modal_directors").textContent =
              data.directors.join(", ");
            document.getElementById("modal_description").textContent =
              data.long_description || data.description;
            document.getElementById("modal_actors").textContent =
              data.actors.join(", ");
            document.getElementById("modal_image").src = data.image_url;
            document.getElementById("modal_image_mobile").src = data.image_url;
          })
          .catch(() => {
            console.log("API response error");
          });
      }

      if (
        e.target.id === "modal_close_btn" ||
        e.target.id === "modal_close_btn_mobile" ||
        e.target.id === "movie-modal-overlay"
      ) {
        const overlay = document.getElementById("movie-modal-overlay");
        overlay.classList.add("hidden");
        overlay.classList.remove("flex");
      }
    });
  });

  return html;
}
