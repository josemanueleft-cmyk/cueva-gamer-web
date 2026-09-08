/* =============================================================
   Catálogo de juegos — Cueva Gamer
   =============================================================
   Cómo agregar un juego nuevo: copia un objeto del arreglo de
   abajo, pégalo antes del cierre "];" y cambia sus valores.
   No necesitas tocar ningún otro archivo.

   Campos:
   - id           número único (usa el siguiente disponible)
   - name         nombre del juego
   - platforms    arreglo con una o más de: "ps5","xbox","switch","pc","vr"
   - genre        una de: "accion","aventura","deportes","carreras",
                  "peleas","shooter","estrategia","otros"
   - players      texto libre, ej: "1-4 jugadores"
   - available    true = 🟢 Disponible / false = 🔴 No disponible
   - image        ruta a una imagen propia (ej: "assets/img/mi-foto.jpg").
                  Déjalo como "" para usar el póster con degradado e
                  ícono generado automáticamente (sin flyers oficiales).
   - url          página oficial del juego (se usa como "Ver ficha oficial")
   - description  descripción corta para el modal
   ============================================================= */
window.GAMES_DATA = [
  {
    id: 1,
    name: "FC 25",
    platforms: ["ps5"],
    genre: "deportes",
    players: "1-4 jugadores",
    available: true,
    image: "",
    url: "https://www.ea.com/games/ea-sports-fc/fc-25",
    description: "El simulador de fútbol más jugado de la sala. Ideal para picarte con el escuadrón completo."
  },
  {
    id: 2,
    name: "GTA V",
    platforms: ["ps5"],
    genre: "accion",
    players: "1-2 jugadores",
    available: true,
    image: "",
    url: "https://www.rockstargames.com/gta-v",
    description: "Mundo abierto, misiones y caos total en Los Santos. Un clásico que nunca falla."
  },
  {
    id: 3,
    name: "Call of Duty: Warzone",
    platforms: ["ps5"],
    genre: "shooter",
    players: "1-4 jugadores",
    available: true,
    image: "",
    url: "https://www.callofduty.com/warzone",
    description: "Battle royale a toda velocidad. Armá tu escuadra y buscá la victoria."
  },
  {
    id: 4,
    name: "God of War Ragnarök",
    platforms: ["ps5"],
    genre: "aventura",
    players: "1 jugador",
    available: true,
    image: "",
    url: "https://www.playstation.com/en-us/games/god-of-war-ragnarok/",
    description: "La saga nórdica de Kratos y Atreus, con una historia y combate de otro nivel."
  },
  {
    id: 5,
    name: "Gran Turismo 7",
    platforms: ["ps5"],
    genre: "carreras",
    players: "1-2 jugadores",
    available: true,
    image: "",
    url: "https://www.gran-turismo.com/us/gt7/",
    description: "Simulador de carreras de precisión, con o sin volante — para los amantes de la velocidad."
  },
  {
    id: 6,
    name: "The Last of Us Part I",
    platforms: ["ps5"],
    genre: "aventura",
    players: "1 jugador",
    available: true,
    image: "",
    url: "https://www.playstation.com/en-us/games/the-last-of-us-part-i/",
    description: "Una de las historias mejor contadas del gaming. Supervivencia, tensión y emoción."
  },
  {
    id: 7,
    name: "Halo Infinite",
    platforms: ["xbox"],
    genre: "shooter",
    players: "1-4 jugadores",
    available: true,
    image: "",
    url: "https://www.halowaypoint.com/",
    description: "El regreso del Jefe Maestro, con multijugador local para todo el escuadrón."
  },
  {
    id: 8,
    name: "Halo: The Master Chief Collection",
    platforms: ["xbox"],
    genre: "shooter",
    players: "1-4 jugadores",
    available: true,
    image: "",
    url: "https://www.halowaypoint.com/",
    description: "Toda la saga Halo clásica reunida, perfecta para partidas locales por equipos."
  },
  {
    id: 9,
    name: "Gears 5",
    platforms: ["xbox"],
    genre: "shooter",
    players: "1-4 jugadores",
    available: true,
    image: "",
    url: "https://www.xbox.com/en-us/games/gears-5",
    description: "Acción cover-shooter brutal, con campaña cooperativa y multijugador competitivo."
  },
  {
    id: 10,
    name: "Mario Kart 8 Deluxe",
    platforms: ["switch"],
    genre: "carreras",
    players: "1-4 jugadores",
    available: true,
    image: "",
    url: "https://www.nintendo.com/us/store/products/mario-kart-8-deluxe-switch/",
    description: "El clásico que nunca falta en La Cueva. Carreras, caparazones y risas garantizadas."
  },
  {
    id: 11,
    name: "Super Smash Bros. Ultimate",
    platforms: ["switch"],
    genre: "peleas",
    players: "1-4 jugadores",
    available: true,
    image: "",
    url: "https://www.nintendo.com/us/store/products/super-smash-bros-ultimate-switch/",
    description: "El crossover de peleas más grande de Nintendo. Ideal para torneos entre amigos."
  },
  {
    id: 12,
    name: "Zelda: Breath of the Wild",
    platforms: ["switch"],
    genre: "aventura",
    players: "1 jugador",
    available: true,
    image: "",
    url: "https://www.nintendo.com/us/store/products/the-legend-of-zelda-breath-of-the-wild-nintendo-switch-2-edition-switch-2/",
    description: "Explorá Hyrule a tu ritmo en una de las mejores aventuras de mundo abierto."
  },
  {
    id: 13,
    name: "Nintendo Switch Sports",
    platforms: ["switch"],
    genre: "deportes",
    players: "1-4 jugadores",
    available: true,
    image: "",
    url: "https://www.nintendo.com/us/store/products/nintendo-switch-sports-switch/",
    description: "Deportes con movimiento real usando los Joy-Con. Ideal para romper el hielo en grupo."
  },
  {
    id: 14,
    name: "Super Mario Party Jamboree",
    platforms: ["switch"],
    genre: "otros",
    players: "1-4 jugadores",
    available: true,
    image: "",
    url: "https://www.nintendo.com/us/store/products/super-mario-party-jamboree-switch/",
    description: "Minijuegos y tableros por turnos — perfecto para cumpleaños y grupos grandes."
  },
  {
    id: 15,
    name: "Beat Saber",
    platforms: ["vr"],
    genre: "otros",
    players: "1 jugador",
    available: true,
    image: "",
    url: "https://www.beatsaber.com/",
    description: "Cortá bloques al ritmo de la música con sables de luz en realidad virtual."
  },
  {
    id: 16,
    name: "Superhot VR",
    platforms: ["vr"],
    genre: "shooter",
    players: "1 jugador",
    available: true,
    image: "",
    url: "https://superhotgame.com/",
    description: "El tiempo se mueve solo cuando vos te movés. Acción táctica en primera persona."
  },
  {
    id: 17,
    name: "Job Simulator",
    platforms: ["vr"],
    genre: "otros",
    players: "1 jugador",
    available: true,
    image: "",
    url: "https://owlchemylabs.com/",
    description: "Simulá trabajos absurdos en VR. Ideal para quienes prueban la realidad virtual por primera vez."
  },
  {
    id: 18,
    name: "Eleven Table Tennis",
    platforms: ["vr"],
    genre: "deportes",
    players: "1-2 jugadores",
    available: true,
    image: "",
    url: "https://forfunlabs.com/",
    description: "Tenis de mesa realista en VR, con física de pelota muy fiel al juego real."
  }
];
