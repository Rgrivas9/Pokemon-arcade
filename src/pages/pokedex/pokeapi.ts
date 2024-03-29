//import { Pokemon, pokemonList } from "./data";
import "./pokeapi.css";
import { Pokemon } from "../../utils/fetch/data";
import {
  filterPokemonsName,
  filterPokemonsType,
} from "../../utils/other/filterPokemons";
import { sortPokemons } from "../../utils/other/sortPokemons";
import { battleground } from "../battleground/battleground";
import { genSelect } from "../../components/genselect";
import { stickyPK } from "../../utils/other/stickyPK";
import { globalRandomNumber } from "../../utils/other/randomNumber";
import { home } from "../home/home";
import { figurePokemon } from "../../components/figurePokemon";
import { clean } from "../../utils/other/clean";
import { getItem } from "../../utils/localStorage/getItem";
import { setItem } from "../../utils/localStorage/setItem";

export const pokeapi = (pokemonList: Pokemon[]) => {
  const body = document.querySelector<HTMLBodyElement>(
    "body"
  ) as HTMLBodyElement;
  clean(body)
  const typelist: string[][] = [];
  const types: string[][] = [];
  for (const pokemon of pokemonList) {
    typelist.push(pokemon.type);
  }
  let index = 0;
  typelist.sort();
  for (const type of typelist) {
    index++;
    if (index != typelist.length) {
      if (type[0] !== typelist[index][0] || type[1] !== typelist[index][1]) {
        types.push(type);
      }
    }
  }

  const typeSelect = (): HTMLSelectElement => {
    const select: HTMLSelectElement = document.createElement("select");
    const option: HTMLOptionElement = document.createElement("option");
    option.innerHTML = "All";
    select.appendChild(option);
    for (const type of types) {
      const option: HTMLOptionElement = document.createElement("option");
      if (type.length === 1) {
        option.innerHTML = `${type[0]}`;
      }
      if (type.length === 2) {
        option.innerHTML = `${type[0]}/${type[1]}`;
      }
      select.appendChild(option);
    }
    return select;
  };

  localStorage.setItem("Poke1", "none");
  localStorage.setItem("Poke2", "none");
  localStorage.setItem("Pokeapi", "true");
  body.removeAttribute("id");
  body.setAttribute("class", "Pokemon");
  const nav: HTMLElement = document.createElement("nav");
  nav.setAttribute("class", "nav1Poke");
  const navDiv1: HTMLDivElement = document.createElement("div");
  const navDiv1h3: HTMLHeadingElement = document.createElement("h3");
  navDiv1h3.innerHTML = "Difficulty";
  const difficultyBtn: HTMLButtonElement = document.createElement("button");
  let pKDif: string = "";
  pKDif = pKDif += "init";
  const record: string[] = getItem(`${getItem("userPK")}records`).split(',')
  localStorage.setItem("PKDif",record[0])
  localStorage.setItem("PKRecordEasy",record[1])
  localStorage.setItem("PKRecordHard",record[2])
  
  difficultyBtn.innerHTML = localStorage.getItem("PKDif") as string;
  difficultyBtn.addEventListener("click", () => {
    localStorage.getItem("PKDif") == "Easy"
      ? localStorage.setItem("PKDif", "Hard")
      : localStorage.setItem("PKDif", "Easy");
    difficultyBtn.innerHTML = localStorage.getItem("PKDif") as string;
    navH2.innerHTML = `RECORD: ${
      localStorage.getItem(`PKRecord${localStorage.getItem("PKDif")}`) as string
    }`;
  });
  const navH2: HTMLHeadingElement = document.createElement("h2");
  navH2.innerHTML = `RECORD: ${
    localStorage.getItem(`PKRecord${localStorage.getItem("PKDif")}`) as string
  }`;
  const navDiv2: HTMLDivElement = document.createElement("div");
  navDiv2.setAttribute("class", "navDiv2PK");
  const htpBtn: HTMLButtonElement = document.createElement("button");
  htpBtn.innerHTML = "How2Play";
  htpBtn.setAttribute("class", "htpPK");
  const h2p: HTMLDivElement = document.createElement("div");
  body.appendChild(h2p);
  h2p.innerHTML = `<p>Juego de batalla por turnos.</p>
  <p> Selecciona una dificultad y dos pokemons.</p>
  <p> Los ataques de tu pokemon los seleccionas tú entre una lista de 5.
  En cada ataque aparece el tipo del ataque y su efectividad (acc) que influyen en como afecta al pokemon rival según su tipo.</p>
  <p> Si el acc es menor, la probabilidad de fallo es mayor, pero también el daño en caso de impacto </p>
  <p> Los ataques se ven influidos por las capacidades de ataque, defensa y velocidad de los pokemons. </p>
  <p> El pokemon rival elige su ataque aleatoriamente entre sus ataques posibles. </p>
  <p> Si derrotas al pokemon enemigo se valida la puntuación, en caso contrario no.</p>
  <p> La puntuación se calcula mediante la diferencia de la media de las estadísticas de los dos pokemons con un mínimo de 10 en el caso que tu pokemon sea superior al rival y se multiplica por los puntos de vida que
  consigas quitarle al pokemon rival.</p>
  <p>-----------</p>
  <p> IMPORTANTE: Una vez finalizado el combate, en caso de haber ganado, es necesarío salir de nuevo a esta pantalla para guardar la puntuación en caso de nuevo record.</p>`;
  h2p.setAttribute("class", "h2pPK");
  h2p.classList.add("h2pPKhidden");
  htpBtn.addEventListener("click", () => {
    h2p.classList.toggle("h2pPKhidden");
  });
  const returnBtn: HTMLButtonElement = document.createElement("button");
  returnBtn.setAttribute("class", "exitPK");
  const exitImg: HTMLImageElement = document.createElement("img");
  exitImg.setAttribute(
    "src",
    "https://res.cloudinary.com/di0zpa5yw/image/upload/v1675264883/gamesHub/salida_bspcsc.png"
  );
  //const scroll=()=>{console.log('scroll')}
  returnBtn.addEventListener("click", () => {
    if (localStorage.getItem("Pokeapi") == "true") {
      record[0]=getItem('PKDif')
      record[1]=getItem('PKRecordEasy')
      record[2]=getItem('PKRecordHard')
      setItem(`${getItem("userPK")}records`,record.toString())
      body.removeAttribute("class");
      body.setAttribute("id", "principalB");
      body.innerHTML = "";
      window.removeEventListener("scroll", stickyPK);
      home(pokemonList,types);
    }
    if (localStorage.getItem("Pokeapi") == "false") {
      body.removeAttribute("class");
      body.innerHTML = "";
      localStorage.setItem("Pokeapi", "true");
      if (localStorage.getItem("HP2") == "0") {
        if (
          parseInt(localStorage.getItem("scorePoke") as string) >
          parseInt(
            localStorage.getItem(
              `PKRecord${localStorage.getItem("PKDif") as string}`
            ) as string
          )
        ) {
          localStorage.setItem(
            `PKRecord${localStorage.getItem("PKDif") as string}`,
            localStorage.getItem("scorePoke") as string
          );
          record[1]=getItem('PKRecordEasy')
          record[2]=getItem('PKRecordHard')
          setItem(`${getItem("userPK")}records`,record.toString())
        }
        
      }
      difficultyBtn.removeAttribute("disabled");
      pokeapi(pokemonList);
      navH2.innerHTML = `RECORD: ${
        localStorage.getItem(`PKRecord${localStorage.getItem("PKDif")}`) as string
      }`
    }
  });
  returnBtn.appendChild(exitImg);
  navDiv1.appendChild(navDiv1h3);
  navDiv1.appendChild(difficultyBtn);
  navDiv2.appendChild(htpBtn);
  navDiv2.appendChild(returnBtn);
  nav.appendChild(navDiv1);
  nav.appendChild(navH2);
  nav.appendChild(navDiv2);

  const div: HTMLDivElement = document.createElement("div");
  div.setAttribute("class", "divHeader");
  const divDiv1: HTMLDivElement = document.createElement("div");
  divDiv1.setAttribute("class", "youPokemon");
  const divDiv2: HTMLDivElement = document.createElement("div");
  divDiv2.setAttribute("class", "vs");
  const divDiv3: HTMLDivElement = document.createElement("div");
  divDiv3.setAttribute("class", "opPokemon");
  const divDiv1H3: HTMLHeadingElement = document.createElement("h3");
  divDiv1H3.innerHTML = "You";
  const divDiv1Div: HTMLDivElement = document.createElement("div");
  const emptyFig: HTMLElement = document.createElement("figure");
  const emptyFig2: HTMLElement =
    document.createElement(
      "figure"
    ); /* ---------------------------------emptyfig */
  const emptyFig1img: HTMLImageElement = document.createElement("img");
  emptyFig1img.setAttribute("class", "emptyFig1img");
  const emptyFig1h2: HTMLHeadingElement = document.createElement("h2");
  emptyFig1h2.setAttribute("class", "emptyFig1h2");
  const emptyFig2img: HTMLImageElement = document.createElement("img");
  emptyFig2img.setAttribute("class", "emptyFig2img");
  const emptyFig2h2: HTMLHeadingElement = document.createElement("h2");
  emptyFig2h2.setAttribute("class", "emptyFig2h2");
  emptyFig.appendChild(emptyFig1img);
  emptyFig.appendChild(emptyFig1h2);
  emptyFig2.appendChild(emptyFig2img);
  emptyFig2.appendChild(emptyFig2h2);
  const divDiv2Btn: HTMLButtonElement = document.createElement("button");
  divDiv2Btn.innerHTML = "VS";
  divDiv2Btn.setAttribute("disabled", "true");
  divDiv2Btn.setAttribute("class", "fightbutton");
  const divDiv3H3: HTMLHeadingElement = document.createElement("h3");
  divDiv3H3.innerHTML = "Opponent";
  const divDiv3Div: HTMLDivElement = document.createElement("div");
  divDiv1.appendChild(divDiv1H3);
  divDiv1.appendChild(divDiv1Div);
  divDiv1Div.appendChild(emptyFig);
  divDiv2.appendChild(divDiv2Btn);
  divDiv3.appendChild(divDiv3H3);
  divDiv3Div.appendChild(emptyFig2);
  divDiv3.appendChild(divDiv3Div);
  div.appendChild(divDiv1);
  div.appendChild(divDiv2);
  div.appendChild(divDiv3);

  const nav2: HTMLElement = document.createElement("nav");
  nav2.setAttribute("class", "nav2Poke");
  const nav2div0: HTMLDivElement = document.createElement("div");
  const nav2div0h4: HTMLHeadingElement = document.createElement("h4");
  nav2div0h4.innerHTML = "Name";
  const nav2div0Input: HTMLInputElement = document.createElement("input");

  const nav2div1_1: HTMLDivElement = document.createElement("div");
  const nav2div1_1h4: HTMLHeadingElement = document.createElement("h4");
  nav2div1_1h4.innerHTML = "Gen";
  const nav2div1_1select: HTMLSelectElement = genSelect();
  nav2div1_1select.setAttribute("class", "searchPKgen");

  const nav2div1: HTMLDivElement = document.createElement("div");
  const nav2div1h4: HTMLHeadingElement = document.createElement("h4");
  nav2div1h4.innerHTML = "Type";
  const nav2div1select: HTMLSelectElement = typeSelect();
  nav2div1select.setAttribute("class", "searchPKtype");

  const nav2div2: HTMLDivElement = document.createElement("div");
  const nav2div2h4: HTMLHeadingElement = document.createElement("h4");
  nav2div2h4.innerHTML = "Sort";
  const nav2div2select: HTMLSelectElement = document.createElement("select");
  nav2div2select.setAttribute("class", "searchPKid");
  const sortId: HTMLOptionElement = document.createElement("option");
  sortId.innerHTML = "Id";
  const sortName: HTMLOptionElement = document.createElement("option");
  sortName.innerHTML = "Name";
  nav2div0.appendChild(nav2div0h4);
  nav2div0.appendChild(nav2div0Input);
  nav2div1_1.appendChild(nav2div1_1h4);
  nav2div1_1.appendChild(nav2div1_1select);
  nav2div1.appendChild(nav2div1h4);
  nav2div1.appendChild(nav2div1select);
  nav2div2.appendChild(nav2div2h4);
  nav2div2select.appendChild(sortId);
  nav2div2select.appendChild(sortName);
  nav2div2.appendChild(nav2div2select);
  nav2.appendChild(nav2div0);
  nav2.appendChild(nav2div1_1);
  nav2.appendChild(nav2div1);
  nav2.appendChild(nav2div2);

  const section: HTMLElement = document.createElement("section");
  section.setAttribute("class", "pokeSection");
  for (const pokemon of pokemonList) {
    const fig: HTMLElement = figurePokemon(pokemon);
    section.appendChild(fig);
  }
  body.appendChild(nav);
  body.appendChild(div);
  body.appendChild(nav2);
  body.appendChild(section);
  localStorage.setItem("namefilter", "");
  localStorage.setItem("typefilter", "All");
  localStorage.setItem("sortPokemon", "Id");
  localStorage.setItem("genFilter", "All");
  nav2div0Input.addEventListener("input", () => {
    localStorage.setItem("namefilter", nav2div0Input.value);
    section.innerHTML = "";
    localStorage.getItem("typefilter")
      ? (nav2div1select.value = localStorage.getItem("typefilter") as string)
      : (nav2div1select.value = "All");
    localStorage.getItem("sortPokemon")
      ? (nav2div2select.value = localStorage.getItem("sortPokemon") as string)
      : (nav2div2select.value = "Id");
    localStorage.getItem("genFilter")
      ? (nav2div1_1select.value = localStorage.getItem("genFilter") as string)
      : (nav2div1_1select.value = "All");
    let genPK: Pokemon[] = [];
    if ((localStorage.getItem("genFilter") as string) == "All") {
      genPK = pokemonList;
    }
    if ((localStorage.getItem("genFilter") as string) == "1st Generation") {
      genPK = pokemonList.filter(
        (pokemon) => pokemon.id > 0 && pokemon.id < 152
      );
    }
    if ((localStorage.getItem("genFilter") as string) == "2nd Generation") {
      genPK = pokemonList.filter(
        (pokemon) => pokemon.id > 151 && pokemon.id < 252
      );
    }
    if ((localStorage.getItem("genFilter") as string) == "3rd Generation") {
      genPK = pokemonList.filter(
        (pokemon) => pokemon.id > 251 && pokemon.id < 387
      );
    }
    if ((localStorage.getItem("genFilter") as string) == "4th Generation") {
      genPK = pokemonList.filter(
        (pokemon) => pokemon.id > 386 && pokemon.id < 494
      );
    }
    const typedP: Pokemon[] = filterPokemonsType(genPK, nav2div1select.value);
    const filteredP: Pokemon[] = filterPokemonsName(
      typedP,
      nav2div0Input.value
    );
    const sortedP: Pokemon[] = sortPokemons(filteredP, nav2div2select.value);
    for (const pokemon of sortedP) {
      const fig: HTMLElement = figurePokemon(pokemon);
      section.appendChild(fig);
    }
  });
  nav2div1_1select.addEventListener("change", () => {
    localStorage.setItem("genFilter", nav2div1_1select.value);
    section.innerHTML = "";
    localStorage.getItem("namefilter")
      ? (nav2div0Input.value = localStorage.getItem("namefilter") as string)
      : (nav2div0Input.value = "");
    localStorage.getItem("sortPokemon")
      ? (nav2div2select.value = localStorage.getItem("sortPokemon") as string)
      : (nav2div2select.value = "Id");
    localStorage.getItem("typefilter")
      ? (nav2div1select.value = localStorage.getItem("typefilter") as string)
      : (nav2div1select.value = "All");
    let genPK: Pokemon[] = [];
    if ((localStorage.getItem("genFilter") as string) == "All") {
      genPK = pokemonList;
    }
    if ((localStorage.getItem("genFilter") as string) == "1st Generation") {
      genPK = pokemonList.filter(
        (pokemon) => pokemon.id > 0 && pokemon.id < 152
      );
    }
    if ((localStorage.getItem("genFilter") as string) == "2nd Generation") {
      genPK = pokemonList.filter(
        (pokemon) => pokemon.id > 151 && pokemon.id < 252
      );
    }
    if ((localStorage.getItem("genFilter") as string) == "3rd Generation") {
      genPK = pokemonList.filter(
        (pokemon) => pokemon.id > 251 && pokemon.id < 387
      );
    }
    if ((localStorage.getItem("genFilter") as string) == "4th Generation") {
      genPK = pokemonList.filter(
        (pokemon) => pokemon.id > 386 && pokemon.id < 494
      );
    }
    const typedP: Pokemon[] = filterPokemonsType(genPK, nav2div1select.value);
    const filteredP: Pokemon[] = filterPokemonsName(
      typedP,
      nav2div0Input.value
    );
    const sortedP: Pokemon[] = sortPokemons(filteredP, nav2div2select.value);
    for (const pokemon of sortedP) {
      const fig: HTMLElement = figurePokemon(pokemon);
      section.appendChild(fig);
    }
  });
  nav2div1select.addEventListener("change", () => {
    localStorage.setItem("typefilter", nav2div1select.value);
    section.innerHTML = "";
    localStorage.getItem("namefilter")
      ? (nav2div0Input.value = localStorage.getItem("namefilter") as string)
      : (nav2div0Input.value = "");
    localStorage.getItem("sortPokemon")
      ? (nav2div2select.value = localStorage.getItem("sortPokemon") as string)
      : (nav2div2select.value = "Id");
    localStorage.getItem("genFilter")
      ? (nav2div1_1select.value = localStorage.getItem("genFilter") as string)
      : (nav2div1_1select.value = "All");
    let genPK: Pokemon[] = [];
    if ((localStorage.getItem("genFilter") as string) == "All") {
      genPK = pokemonList;
    }
    if ((localStorage.getItem("genFilter") as string) == "1st Generation") {
      genPK = pokemonList.filter(
        (pokemon) => pokemon.id > 0 && pokemon.id < 152
      );
    }
    if ((localStorage.getItem("genFilter") as string) == "2nd Generation") {
      genPK = pokemonList.filter(
        (pokemon) => pokemon.id > 151 && pokemon.id < 252
      );
    }
    if ((localStorage.getItem("genFilter") as string) == "3rd Generation") {
      genPK = pokemonList.filter(
        (pokemon) => pokemon.id > 251 && pokemon.id < 387
      );
    }
    if ((localStorage.getItem("genFilter") as string) == "4th Generation") {
      genPK = pokemonList.filter(
        (pokemon) => pokemon.id > 386 && pokemon.id < 494
      );
    }
    const typedP: Pokemon[] = filterPokemonsType(genPK, nav2div1select.value);
    const filteredP: Pokemon[] = filterPokemonsName(
      typedP,
      nav2div0Input.value
    );
    const sortedP: Pokemon[] = sortPokemons(filteredP, nav2div2select.value);
    for (const pokemon of sortedP) {
      const fig: HTMLElement = figurePokemon(pokemon);
      section.appendChild(fig);
    }
  });
  nav2div2select.addEventListener("change", () => {
    localStorage.setItem("sortPokemon", nav2div2select.value);
    section.innerHTML = "";
    localStorage.getItem("typefilter")
      ? (nav2div1select.value = localStorage.getItem("typefilter") as string)
      : (nav2div1select.value = "All");
    localStorage.getItem("namefilter")
      ? (nav2div0Input.value = localStorage.getItem("namefilter") as string)
      : (nav2div0Input.value = "");
    localStorage.getItem("genFilter")
      ? (nav2div1_1select.value = localStorage.getItem("genFilter") as string)
      : (nav2div1_1select.value = "All");
    let genPK: Pokemon[] = [];
    if ((localStorage.getItem("genFilter") as string) == "All") {
      genPK = pokemonList;
    }
    if ((localStorage.getItem("genFilter") as string) == "1st Generation") {
      genPK = pokemonList.filter(
        (pokemon) => pokemon.id > 0 && pokemon.id < 152
      );
    }
    if ((localStorage.getItem("genFilter") as string) == "2nd Generation") {
      genPK = pokemonList.filter(
        (pokemon) => pokemon.id > 151 && pokemon.id < 252
      );
    }
    if ((localStorage.getItem("genFilter") as string) == "3rd Generation") {
      genPK = pokemonList.filter(
        (pokemon) => pokemon.id > 251 && pokemon.id < 387
      );
    }
    if ((localStorage.getItem("genFilter") as string) == "4th Generation") {
      genPK = pokemonList.filter(
        (pokemon) => pokemon.id > 386 && pokemon.id < 494
      );
    }
    const typedP: Pokemon[] = filterPokemonsType(genPK, nav2div1select.value);
    const filteredP: Pokemon[] = filterPokemonsName(
      typedP,
      nav2div0Input.value
    );
    const sortedP: Pokemon[] = sortPokemons(filteredP, nav2div2select.value);
    for (const pokemon of sortedP) {
      const fig: HTMLElement = figurePokemon(pokemon);
      section.appendChild(fig);
    }
  });
  emptyFig.addEventListener("click", () => {
    emptyFig1img.removeAttribute("src");
    emptyFig1h2.innerHTML = "";
    localStorage.setItem("Poke1", "none");
    divDiv2Btn.innerHTML = "VS";
    divDiv2Btn.setAttribute("disabled", "true");
    divDiv2Btn.classList.remove("fightPokemons");
  });
  emptyFig2.addEventListener("click", () => {
    emptyFig2img.removeAttribute("src");
    emptyFig2h2.innerHTML = "";
    localStorage.setItem("Poke2", "none");
    divDiv2Btn.innerHTML = "VS";
    divDiv2Btn.setAttribute("disabled", "true");
    divDiv2Btn.classList.remove("fightPokemons");
  });
  divDiv2Btn.addEventListener("click", () => {
    window.removeEventListener("scroll", stickyPK);
    battleground(pokemonList);
    localStorage.setItem("Pokeapi", "false");
    difficultyBtn.setAttribute("disabled", "true");
  });
  window.addEventListener("scroll", stickyPK);
  const randomButton2: HTMLButtonElement = document.createElement("button");
  const randomButton1: HTMLButtonElement = document.createElement("button");
  randomButton2.setAttribute("class", "randomButton2");
  randomButton1.setAttribute("class", "randomButton1");
  randomButton1.innerHTML = "Vs Random";
  randomButton2.innerHTML = "Random";
  nav2.appendChild(randomButton1);
  nav2.appendChild(randomButton2);
  randomButton1.addEventListener("click", () => {
    localStorage.getItem("typefilter")
      ? (nav2div1select.value = localStorage.getItem("typefilter") as string)
      : (nav2div1select.value = "All");
    localStorage.getItem("namefilter")
      ? (nav2div0Input.value = localStorage.getItem("namefilter") as string)
      : (nav2div0Input.value = "");
    localStorage.getItem("genFilter")
      ? (nav2div1_1select.value = localStorage.getItem("genFilter") as string)
      : (nav2div1_1select.value = "All");
    let genPK: Pokemon[] = [];
    if ((localStorage.getItem("genFilter") as string) == "All") {
      genPK = pokemonList;
    }
    if ((localStorage.getItem("genFilter") as string) == "1st Generation") {
      genPK = pokemonList.filter(
        (pokemon) => pokemon.id > 0 && pokemon.id < 152
      );
    }
    if ((localStorage.getItem("genFilter") as string) == "2nd Generation") {
      genPK = pokemonList.filter(
        (pokemon) => pokemon.id > 151 && pokemon.id < 252
      );
    }
    if ((localStorage.getItem("genFilter") as string) == "3rd Generation") {
      genPK = pokemonList.filter(
        (pokemon) => pokemon.id > 251 && pokemon.id < 387
      );
    }
    if ((localStorage.getItem("genFilter") as string) == "4th Generation") {
      genPK = pokemonList.filter(
        (pokemon) => pokemon.id > 386 && pokemon.id < 494
      );
    }
    const typedP: Pokemon[] = filterPokemonsType(genPK, nav2div1select.value);
    const filteredP: Pokemon[] = filterPokemonsName(
      typedP,
      nav2div0Input.value
    );
    const sortedP: Pokemon[] = sortPokemons(filteredP, nav2div2select.value);
    const pokemon: Pokemon = sortedP[globalRandomNumber(sortedP.length) - 1];
    emptyFig2img.setAttribute("src", pokemon.images.front);
    emptyFig2h2.innerHTML = pokemon.name;
    localStorage.setItem("Poke2", pokemon.name);
    if (localStorage.getItem("Poke1") != "none") {
      divDiv2Btn.innerHTML = "FIGHT!";
      divDiv2Btn.removeAttribute("disabled");
      divDiv2Btn.classList.add("fightPokemons");
    }
  });
  randomButton2.addEventListener("click", () => {
    localStorage.getItem("typefilter")
      ? (nav2div1select.value = localStorage.getItem("typefilter") as string)
      : (nav2div1select.value = "All");
    localStorage.getItem("namefilter")
      ? (nav2div0Input.value = localStorage.getItem("namefilter") as string)
      : (nav2div0Input.value = "");
    localStorage.getItem("genFilter")
      ? (nav2div1_1select.value = localStorage.getItem("genFilter") as string)
      : (nav2div1_1select.value = "All");
    let genPK: Pokemon[] = [];
    if ((localStorage.getItem("genFilter") as string) == "All") {
      genPK = pokemonList;
    }
    if ((localStorage.getItem("genFilter") as string) == "1st Generation") {
      genPK = pokemonList.filter(
        (pokemon) => pokemon.id > 0 && pokemon.id < 152
      );
    }
    if ((localStorage.getItem("genFilter") as string) == "2nd Generation") {
      genPK = pokemonList.filter(
        (pokemon) => pokemon.id > 151 && pokemon.id < 252
      );
    }
    if ((localStorage.getItem("genFilter") as string) == "3rd Generation") {
      genPK = pokemonList.filter(
        (pokemon) => pokemon.id > 251 && pokemon.id < 387
      );
    }
    if ((localStorage.getItem("genFilter") as string) == "4th Generation") {
      genPK = pokemonList.filter(
        (pokemon) => pokemon.id > 386 && pokemon.id < 494
      );
    }
    const typedP: Pokemon[] = filterPokemonsType(genPK, nav2div1select.value);
    const filteredP: Pokemon[] = filterPokemonsName(
      typedP,
      nav2div0Input.value
    );
    const sortedP: Pokemon[] = sortPokemons(filteredP, nav2div2select.value);
    const pokemon1: Pokemon = sortedP[globalRandomNumber(sortedP.length) - 1];
    const pokemon2: Pokemon = sortedP[globalRandomNumber(sortedP.length) - 1];
    emptyFig1img.setAttribute("src", pokemon1.images.front);
    emptyFig1h2.innerHTML = pokemon1.name;
    localStorage.setItem("Poke1", pokemon1.name);
    divDiv2Btn.innerHTML = "FIGHT!";
    divDiv2Btn.removeAttribute("disabled");
    divDiv2Btn.classList.add("fightPokemons");
    emptyFig2img.setAttribute("src", pokemon2.images.front);
    emptyFig2h2.innerHTML = pokemon2.name;
    localStorage.setItem("Poke2", pokemon2.name);
  });
};
