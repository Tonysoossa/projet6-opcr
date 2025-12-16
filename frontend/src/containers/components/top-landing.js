export function TopLanding() {
  const html = `
    <section class="w-full">
      <div class="flex flex-col gap-12 text-black py-12">
        <h2 class="text-black font-semibold text-5xl">Meilleurs films</h2>

        <div class="border-2 flex flex-col md:flex-row gap-12 p-4 md:h-[370px] overflow-hidden">

          <div class="h-full w-full md:w-auto flex justify-center">
            <img id="best-movie-img" class="h-full w-auto object-cover rounded" />
          </div>

          <div class="flex flex-col gap-6 justify-between h-full w-full p-4">

            <div class="flex flex-col gap-6 overflow-hidden ">
              <h3 id="best_movie_title" class="text-black font-semibold text-5xl"></h3>

              <p id="best_movie_description" class="font-extralight text-[22px] leading-snug overflow-y-auto pr-2"></p>
            </div>

            <div class="flex justify-center md:justify-end">
              <button
                id="best_movie_details_btn"
                class="details-btn bg-red-600 text-white text-[24px] px-4 py-2 rounded-2xl hover:bg-red-700 transition cursor-pointer"
              >
                Détails
              </button>
            </div>

          </div>
        </div>
      </div>
    </section>
  `;

  requestAnimationFrame(() => {
    const movieId = "71562";

    fetch(`http://localhost:8000/api/v1/titles/${movieId}`)
      .then((res) => res.json())
      .then((data) => {
        document.getElementById("best-movie-img").src = data.image_url;
        document.getElementById("best_movie_title").textContent = data.title;
        document.getElementById("best_movie_description").textContent =
          data.description;

        document.getElementById("best_movie_details_btn").dataset.id = data.id;
      })
      .catch(() => {
        console.warn("API request failed");
      });
  });

  return html;
}
