import { VideoEl } from "../../components/HTMLelements";
import { home } from "../../pages/home/home";
import { getItem } from "../localStorage/getItem";
import { setItem } from "../localStorage/setItem";
import { Pokemon } from "../fetch/data";

export const startlogIn = (
  input: string,
  main: HTMLElement,
  logout: HTMLButtonElement,
  pokemonList:Pokemon[]
) => {
  setItem("userPK", input);
  const startBtn=document.querySelector<HTMLButtonElement>('.startLogin') as HTMLButtonElement
  startBtn.setAttribute('disabled','true')
  if (getItem(`${getItem("userPK")}records`)==null){setItem(`${getItem("userPK")}records`,['Easy',0,1000,'bugpoison'].toString())}
  logout.setAttribute("disabled", "true");
  /* ---------------------------------------------------------ANIMACIÓN PIKACHU */
  const video: HTMLVideoElement = VideoEl(
    "pikachuVideo",
    "https://res.cloudinary.com/di0zpa5yw/video/upload/v1675961751/gamesHub/introPK_q6abpo.mp4",
    "intro pokemon yellow"
  );
  video.setAttribute("muted", "true");
  video.setAttribute("autoplay", "true");
  main.appendChild(video);
  setTimeout(() => {
    home(pokemonList);
  }, 4500);
};
