import just_streamit from "/just_streamit.svg";

export function Header() {
  return `
    <header class="w-full">
      <div class="flex gap-12 md:justify-start justify-center items-center p-5 bg-slate-600 text-white">
        <img src="${just_streamit}" alt="Streamit Logo" class="logo md:pl-6" />
        <h1 class="md:block hidden">Vidéos à la demande</h1>
      </div>
    </header>
  `;
}
