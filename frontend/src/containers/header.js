import just_streamit from "/just_streamit.svg";

export function Header() {
  return `
    <header class="w-full">
      <div class="flex gap-12 justify-start items-center px-8 py-5 max-w-6xl mx-auto bg-slate-600 text-white ">
        <img src="${just_streamit}" alt="Streamit Logo" class="logo" />
        <h1>Vidéos à la demande</h1>
      </div>
    </header>
  `;
}
