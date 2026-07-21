import type { Dictionary } from "./types";

/** Polish locale. Same structure as en.ts — only the language differs. */

export const pl: Dictionary = {
  meta: {
    title: "Paweł Dziuba – Junior Full-stack AI Developer",
    description:
      "Junior Full-stack AI Developer tworzący aplikacje webowe wykorzystujące AI, narzędzia terminalowe i desktopowe oraz stojące za nimi API. Wybrane projekty w TypeScripcie, Pythonie i C#.",
    keywords: [
      "junior full-stack developer",
      "programista AI",
      "programista full-stack",
      "full-stack developer",
      "TypeScript",
      "Python",
      "C#",
      "FastAPI",
      "ASP.NET Core",
      "React",
      "Vue",
      "Electron",
      "LangChain",
    ],
    // Opis osoby w JSON-LD. Nie powtarza „AI”, bo nazwa stanowiska już je zawiera.
    role: "Junior Full-stack AI Developer — aplikacje webowe, narzędzia desktopowe i backendowe API",
  },

  nav: {
    ariaLabel: "Główna",
    links: [
      { href: "#work", label: "Projekty" },
      { href: "#stack", label: "Stack" },
      { href: "#about", label: "O mnie" },
      { href: "#contact", label: "Kontakt" },
    ],
    github: "GitHub",
    openMenu: "Otwórz menu",
    closeMenu: "Zamknij menu",
    backToTop: "powrót na górę",
    skipToContent: "Przejdź do treści",
    newTab: "(otwiera się w nowej karcie)",
    languageLabel: "Język",
  },

  hero: {
    eyebrow: "Junior Full-stack AI Developer",
    headline: ["Na wejściu sygnał,", "na wyjściu struktura."],
    lede: "Buduję oprogramowanie, które przyjmuje coś nieuporządkowanego – pytanie w języku naturalnym, odczyt GPS, surowy strumień bajtów – i zwraca coś otypowanego, weryfikowalnego i użytecznego. Backendowe API, interfejsy webowe i desktopowe oraz warstwa AI, która je spina.",
    primaryCta: "Wybrane projekty",
    status: { label: "Najnowsze", value: "LumaShell 1.0.0", detail: "wydanie z 19 lipca 2026" },
    chain: [
      { k: "01", t: "Wejście", d: "bez struktury" },
      { k: "02", t: "Transformacja", d: "otypowane + zwalidowane" },
      { k: "03", t: "Wyjście", d: "coś użytecznego" },
    ],
  },

  work: {
    index: "01",
    label: "Wybrane projekty",
    title: "Pięć projektów, pięć różnych problemów.",
    intro:
      "Każdy opisany na podstawie tego, co kod faktycznie robi. Jeśli repozytorium jest projektem zaliczeniowym albo pracą dyplomową, jest to zaznaczone.",
    featured: "Wyróżnione",
    oneDetail: "Jeden szczegół",
    viewOn: "Zobacz {project} na GitHubie",
    liveDemo: "Demo online",
    updated: "aktualizacja",
    srLanguage: "Język",
    srUpdated: "Ostatnia aktualizacja",
    srStars: "Gwiazdki",
    chainIn: "wejście",
    chainTransform: "transformacja",
    chainOut: "wyjście",
  },

  stack: {
    index: "02",
    label: "Profil techniczny",
    title: "Po jakie narzędzia faktycznie sięgam.",
    intro:
      "Pogrupowane według rodzaju problemu, a nie języka – razem z repozytoriami, w których widać każdą z tych umiejętności w praktyce.",
    seenIn: "Widoczne w",
    repoNewTab: "(repozytorium, otwiera się w nowej karcie)",
    capabilities: [
      {
        id: "interfaces",
        title: "Interfejsy",
        note: "Interfejsy aplikacji webowych i desktopowych, w tym widok terminala, który musi pozostać szybki przy nieprzerwanym strumieniu danych wyjściowych.",
        items: ["React 19", "Vue 3", "Quasar", "xterm.js (WebGL)", "Leaflet", "DearPyGui", "NiceGUI", "Bootstrap"],
        evidence: ["lumashell", "what2buy", "geopic", "pyradio"],
      },
      {
        id: "ai",
        title: "Integracja z AI",
        note: "Wywołania modeli ograniczone schematami i uprawnieniami, a nie swobodne promptowanie – ustrukturyzowane wyjście, listy dozwolonych narzędzi i wymóg zatwierdzenia, zanim cokolwiek zostanie zmienione.",
        items: [
          "LangChain / LangGraph",
          "OpenAI gpt-4o",
          "Anthropic Messages API",
          "Model Context Protocol",
          "Modele lokalne (Ollama / LM Studio)",
          "Ustrukturyzowane wyjście (Pydantic)",
        ],
        evidence: ["what2buy", "lumashell"],
      },
      {
        id: "backend",
        title: "API i backend",
        note: "Otypowane warstwy request/response z uwierzytelnianiem, walidacją i warstwą serwisową między kontrolerem a bazą danych.",
        items: ["FastAPI", "ASP.NET Core 8", "Entity Framework Core", "JWT / claimy ról", "Pydantic", "REST + Swagger"],
        evidence: ["what2buy", "carpartseshop"],
      },
      {
        id: "systems",
        title: "Systemy i protokoły",
        note: "Komunikacja z tym, co nie mówi po HTTP: pseudoterminale, sesje SSH, porty szeregowe, surowe gniazda i strumienie audio.",
        items: ["node-pty", "ssh2", "serialport", "TCP / TLS / Telnet / UDP", "WebSocket", "Icecast / ICY", "Windows Core Audio"],
        evidence: ["lumashell", "pyradio"],
      },
      {
        id: "data",
        title: "Dane i przechowywanie",
        note: "Wyciąganie danych stamtąd, skąd nie miały wyjść, i modelowanie ich, kiedy już trafią na miejsce.",
        items: ["Cloud Firestore", "T-SQL", "Tabele temporalne i triggery", "OPENJSON / otypowany XML", "BeautifulSoup", "pandas", "matplotlib"],
        evidence: ["geopic", "advanced-databases", "ceneoscrapern11"],
      },
      {
        id: "delivery",
        title: "Pakowanie i wdrażanie",
        note: "Doprowadzenie projektu do stanu, w którym uruchamia się gdzie indziej niż na maszynie, na której powstał.",
        items: ["Docker / Compose", "nginx", "electron-builder", "Service Workers", "GitHub Pages", "xUnit"],
        evidence: ["what2buy", "carpartseshop", "lumashell"],
      },
    ],
  },

  about: {
    index: "03",
    label: "O mnie",
    title: "Jak wygląda moja praca.",
    paragraphs: [
      "Pracuję na całym stacku, a najwięcej czasu spędzam nad tym, co łączy poszczególne części: kontraktem API, warstwą transportową, schematem, który narzuca odpowiedzi modelu kształt, któremu frontend może zaufać.",
      "Widać to w kolejnych repozytoriach. What2Buy zamyka LLM w schemacie Pydantic, zamiast parsować tekst. LumaShell chowa osiem różnych protokołów sesji za jednym interfejsem strumienia bajtów. GeoPic zamienia surowe współrzędne w adres, zanim je zapisze. Inne dziedziny, ten sam odruch – najpierw zdefiniować granicę, potem dopasować do niej wszystko inne.",
      "Zależy mi też na rzeczach mniej efektownych: konfiguracji w kontenerach, która wszędzie działa tak samo, testach tam, gdzie logika ma znaczenie, i dokumentacji, która tłumaczy decyzję, zamiast powtarzać to, co widać w kodzie.",
    ],
    interests: {
      label: "Interesuje mnie też",
      note: "Wymienione na profilu GitHub; nie ma tego jeszcze w żadnym publicznym repozytorium.",
      items: ["Elektronika", "Raspberry Pi", "Arduino", "Muzyka i audio"],
    },
    education:
      "Część repozytoriów to projekty zaliczeniowe ze studiów. Jedyne, które wymienia z nazwy uczelnię, odsyła do Uniwersytetu Ekonomicznego w Krakowie.",
  },

  repositories: {
    index: "04",
    label: "Przegląd repozytoriów",
    title: "Wszystko pozostałe, co jest publiczne.",
    intro:
      "Pełny obraz, razem z projektami zaliczeniowymi. Liczby pochodzą z API GitHuba i są pokazane bez zmian.",
    publicRepos: "Publiczne repozytoria",
    original: "Własne (nie forki)",
    forks: "Forki",
    firstRepo: "Pierwsze repozytorium",
    chartCaption: "Kod według języka, w bajtach",
    languageNote:
      "Mierzone w bajtach we własnych repozytoriach (bez forków). Z pominięciem repozytorium PanTadeusz – statycznej strony publikującej ~762 KB poezji z domeny publicznej, której objętość HTML przeważyłaby nad wszystkimi pozostałymi repozytoriami razem wziętymi.",
    other: "Inne",
    otherLabel: "Pozostałe repozytoria",
    coursework: "projekt zaliczeniowy",
    exclusionNote:
      "Z tej listy wyłączone są forki oraz jedno repozytorium, które linijka po linijce odtwarza opublikowany tutorial Microsoftu. W liczbach powyżej nadal są uwzględnione.",
  },

  contact: {
    index: "05",
    label: "Kontakt",
    title: "Napisz do mnie.",
    lede: "Chętnie porozmawiam o oprogramowaniu, automatyzacji, integracjach z AI albo o czymkolwiek, co dotyczy sygnałów i sprzętu. Formularz trafia prosto na moją skrzynkę.",
    name: "Imię i nazwisko",
    email: "E-mail",
    message: "Wiadomość",
    company: "Firma",
    send: "Wyślij wiadomość",
    sending: "Wysyłanie…",
    elsewhere: "Gdzie indziej",
    errors: {
      nameRequired: "Podaj imię i nazwisko.",
      nameTooLong: "To imię i nazwisko jest za długie.",
      emailInvalid: "Podaj poprawny adres e-mail.",
      messageTooShort: "Napisz co najmniej 10 znaków.",
      messageTooLong: "Zmieść się w 5000 znakach.",
    },
    messages: {
      idle: "",
      fixErrors: "Popraw zaznaczone pola.",
      notConfigured:
        "Formularz kontaktowy nie jest jeszcze skonfigurowany. W międzyczasie napisz do mnie przez GitHuba.",
      sendFailed: "Nie udało się wysłać. Spróbuj ponownie za chwilę.",
      sent: "Dziękuję – wiadomość została wysłana.",
    },
  },

  footer: {
    stackNote: "Next.js · TypeScript · Three.js",
    live: "Koniec transmisji – dane projektów zsynchronizowane z API GitHuba",
    snapshot: "Koniec transmisji – dane projektów z zapisanego w repozytorium snapshotu",
  },

  visuals: {
    hero: "Diagram: nieregularny przebieg fali wchodzi po lewej do fasetowanego rdzenia i wychodzi po prawej jako równomiernie rozłożona siatka.",
    transport: "Diagram: jeden interfejs transportu terminala rozgałęzia się na osiem implementacji protokołów.",
    agent:
      "Diagram: zapytanie w języku naturalnym przechodzi przez agenta i narzędzie do scrapowania, po czym wychodzi jako zagnieżdżony, otypowany schemat.",
    geo: "Diagram: współrzędne GPS zamienione na adres i oznaczone pinezką na mapie.",
    ledger:
      "Diagram: wszystkie pozycje koszyka są sprawdzane pod kątem stanu magazynowego, zanim zapisana zostanie jakakolwiek jego zmiana, a potem zatwierdzane jednym zapisem.",
    waveform: "Diagram: strumień audio narysowany jako przebieg fali, ze skalą strojenia i tytułem aktualnie odtwarzanego utworu.",
  },

  projects: {
    lumashell: {
      tagline:
        "Terminal dla Windows, który ukrywa lokalne powłoki, SSH, porty szeregowe i gniazda sieciowe za jednym kontraktem strumienia bajtów.",
      summary:
        "Emulator terminala w Electronie, z interfejsem w React i renderowaniem przez xterm.js z dodatkiem WebGL. Każdy typ sesji – lokalny PTY, SSH, port szeregowy, surowy TCP/TLS, Telnet, WebSocket, UDP oraz exec w Dockerze i Kubernetesie – implementuje jeden interfejs TerminalTransport, więc UI nigdy nie dowiaduje się, z jakim protokołem rozmawia. Dochodzi do tego host wtyczek działający w sandboksie i agent AI, który musi zapytać, zanim cokolwiek zrobi.",
      chain: {
        input: "naciśnięcia klawiszy, strumienie bajtów",
        transform: "jeden kontrakt TerminalTransport, osiem implementacji",
        output: "powierzchnia xterm.js na WebGL",
      },
      detail: {
        label: "Uprawnienia wtyczek egzekwuje host, a nie wtyczka",
        body: "Kod wtyczki działa w ukrytym BrowserWindow utworzonym z włączonym sandboksem i contextIsolation oraz wyłączonym nodeIntegration, więc może jedynie wysyłać wiadomości. Proces główny kontroluje go w dwóch osobnych momentach cyklu życia. Przy rejestracji narzędzie zostaje przyjęte tylko wtedy, gdy wtyczka ma uprawnienie ai.tools i statycznie zadeklarowała dokładnie to id w swoim manifeście. Przy wywołaniu te same warunki sprawdzane są jeszcze raz, zanim cokolwiek dotrze do hosta. Wywołania są korelowane wygenerowanym id, z 30-sekundowym timeoutem, więc zawieszona wtyczka nie zablokuje pętli modelu.",
      },
      context: "Wersja 1.0.0, wydana w lipcu 2026. Interfejs i dokumentacja są po polsku.",
    },
    what2buy: {
      tagline:
        "Zamienia pytanie o produkt zadane w języku naturalnym w zestawienie specyfikacji z kilku marketplace'ów, kolumna obok kolumny.",
      summary:
        "Aplikacja złożona z dwóch usług: backendu na FastAPI, który steruje agentem LangChain na gpt-4o, oraz jednostronicowego frontendu w Quasarze i Vue 3. Agent sięga po aktualne dane z marketplace'ów przez serwer MCP BrightData i jest związany zagnieżdżonym schematem Pydantic, więc odpowiedź przychodzi jako otypowane produkty i specyfikacje, a nie jako tekst. Frontend renderuje po jednej kolumnie na marketplace i wyróżnia tłem te wiersze specyfikacji, w których dwa produkty się różnią.",
      chain: {
        input: "zapytanie w języku naturalnym + wybrane marketplace'y",
        transform: "agent LangChain nad serwerem MCP do scrapowania, odpowiedź związana ze schematem Pydantic",
        output: "otypowane oferty, porównane parametr po parametrze",
      },
      detail: {
        label: "Serwer scrapujący jest podprocesem, a nie usługą",
        body: "Zamiast odpytywać hostowane API, aplikacja przy każdym żądaniu uruchamia serwer MCP BrightData lokalnie przez stdio, z danymi uwierzytelniającymi wstrzykniętymi jako zmienne środowiskowe. Jego narzędzia wykrywa w czasie działania przez load_mcp_tools i filtruje po liście dozwolonych nazw, zanim trafią do agenta. Konsekwencję widać w kontenerze: Dockerfile backendu instaluje Node 20 w obrazie python:3.11-slim wyłącznie po to, żeby npx był dostępny w czasie działania.",
      },
      context: "Powstał jako projekt do pracy licencjackiej.",
    },
    geopic: {
      tagline:
        "Feed zdjęć, który do każdego wpisu dopisuje odczyt GPS z miejsca, w którym zdjęcie powstało, i pokazuje go na osobnej mapie.",
      summary:
        "Progresywna aplikacja webowa bez etapu budowania – Vue 3 z CDN, Firebase do przechowywania plików, uwierzytelniania i danych. Wysłanie zdjęcia pobiera współrzędne urządzenia, zamienia je na adres przez odwrotne geokodowanie w Nominatimie i zapisuje oba te dane razem z obrazem. Każdy element feedu to karuzela złożona z dwóch slajdów: zdjęcie, a po nim interaktywna mapa Leaflet z pinezką w miejscu zrobienia zdjęcia.",
      chain: {
        input: "zdjęcie + odczyt GPS z urządzenia",
        transform: "odwrotne geokodowanie w Nominatimie, dokumenty Firestore",
        output: "chronologiczny feed, jedna mapa na wpis",
      },
      detail: {
        label: "Mapy powstają w momencie pokazania slajdu, a nie renderowania wpisu",
        body: "Mapa Leaflet zainicjalizowana w ukrytym slajdzie karuzeli odczytuje zerowe wymiary swojego kontenera i rysuje porozjeżdżane kafelki. Dlatego mapa powstaje dopiero w jednym delegowanym listenerze zdarzenia slid.bs.carousel: wyciąga on indeks wpisu z id elementu karuzeli, buduje mapę przy pierwszym pokazaniu i zapisuje instancję na samym węźle DOM. Przy każdym kolejnym pokazaniu, zamiast przebudowywać mapę, wywoływane jest już tylko invalidateSize().",
      },
      context: "Projekt na studia, zrobiony razem z Mikołajem Bębenkiem.",
    },
    carpartseshop: {
      tagline:
        "API sklepu na ASP.NET Core 8: katalog, role w JWT, finalizacja koszyka z walidacją stanów magazynowych i faktura wysyłana mailem.",
      summary:
        "Warstwowe Web API w .NET 8, z osobnym serwisem dla każdej encji, opartym na Entity Framework Core. Uwierzytelnianie wystawia tokeny HMAC-SHA256 z claimem roli, endpointy zapisujące są dostępne tylko dla roli Admin, a Swagger ma podpiętą definicję bearer, żeby dało się je przetestować. Całość pokrywa 31 testów [Fact] w xUnit – w projekcie testów jednostkowych i w projekcie testów integracyjnych opartym na WebApplicationFactory.",
      chain: {
        input: "uwierzytelnione żądanie REST",
        transform: "warstwa serwisowa nad change trackerem EF Core",
        output: "zamówienia z zamrożonymi cenami, faktura przez SMTP",
      },
      detail: {
        label: "Finalizacja koszyka sprawdza wszystko, zanim cokolwiek zmieni",
        body: "CheckoutAsync wykonuje dwa przebiegi w ramach jednej jednostki pracy change trackera. Pierwszy przechodzi po wszystkich pozycjach i przerywa, zwracając odpowiedź o niewystarczającym stanie magazynowym, zanim zapisana zostanie choćby jedna wartość – dzięki temu koszyk, który nie przejdzie do końca, nie zostawi po sobie częściowo zdjętych stanów magazynowych. Drugi zdejmuje stan i kopiuje aktualną cenę każdego produktu na pozycję zamówienia, więc późniejsze zmiany w katalogu nie przepiszą tego, ile kosztowało wcześniejsze zamówienie. Zmiany stanów magazynowych, nowe zamówienie i wyczyszczony koszyk zapisują się w jednym SaveChangesAsync.",
      },
      context:
        "Projekt zaliczeniowy na studia. Działa na dostawcy in-memory EF Core, więc dane nie przeżywają restartu.",
    },
    pyradio: {
      tagline:
        "Jednoplikowy odtwarzacz radia dla Windows, który czyta na bieżąco tytuły z ICY i szuka okładki aktualnie granego utworu.",
      summary:
        "Około 9 KB Pythona w jednym pliku. Wątek w tle pobiera strumień Icecast przez miniaudio, a pozbawione ramki okno DearPyGui pokazuje listę stacji, filtr wyszukiwania i przewijający się pasek z aktualnie odtwarzanym utworem. Stacje leżą w zwykłym pliku tekstowym, który aplikacja otwiera w Notatniku i przeładowuje. Kiedy strumień zgłosi nowy tytuł, aplikacja wyszukuje go w YouTubie i pokazuje miniaturę pierwszego wyniku jako okładkę.",
      chain: {
        input: "strumień Icecast z pliku tekstowego w formacie url|name",
        transform: "wątek dekodujący miniaudio, callback metadanych ICY",
        output: "dźwięk, przewijany tytuł, pobrana okładka",
      },
      detail: {
        label: "Głośność ustawiana jest poza potokiem audio",
        body: "Suwak w ogóle nie dotyka strumienia. Przechodzi przez listę sesji Windows Core Audio przy użyciu pycaw, odnajduje proces samej aplikacji i ustawia głośność główną tej sesji – działa więc na tym samym poziomie co systemowy mikser głośności poszczególnych aplikacji w Windows, zamiast skalować próbki wewnątrz miniaudio.",
      },
      context: "Tylko Windows; wymaga pywin32 i systemowego stosu audio Windows.",
    },
  },

  archive: {
    "simple-mrp": {
      name: "Simple MRP System",
      note: "Aplikacja w NiceGUI, która rozwija zestawienie materiałowe pojedynczego taboretu na sześciookresowym horyzoncie planowania, z drzewem BOM renderowanym przez Mermaid.",
    },
    "60-tka": {
      name: "60-tka",
      note: "Progresywna aplikacja webowa w czystym JS do zgłaszania lokalnych zdarzeń: zdjęcie z aparatu, pinezka GPS na mapie OpenStreetMap, adres z odwrotnego geokodowania i przekazanie całości do systemowego okna udostępniania.",
    },
    "advanced-databases": {
      name: "Zaawansowane bazy danych",
      note: "Projekt bazodanowy w SSDT, który nakłada na schemat AdventureWorksLT tabele temporalne z wersjonowaniem systemowym, triggery audytujące ceny i triggery DDL, funkcje OPENJSON oraz kolumny XML ograniczone schematem XSD.",
    },
    ceneoscrapern11: {
      name: "CeneoScraperN11",
      note: "Dwa notebooki: jeden przechodzi wszystkie strony opinii o produkcie i zapisuje je do ustrukturyzowanego JSON-a, drugi wczytuje je pandasem i rysuje rozkład ocen oraz udział rekomendacji.",
    },
    eshopservice: {
      name: "EShopService",
      note: "Podział na Domain / Application / API w .NET 8, z CRUD-em produktów na EF Core i walidatorem kart kredytowych metodą Luhna, który każdy rodzaj błędu mapuje na osobny typ wyjątku.",
    },
    "pp-simulator": {
      name: "PP-Simulator",
      note: "Turowa symulacja na siatce w C#, w której ruch łączy zachowanie stworzenia z topologią mapy – ten sam zapis ruchu zawija się na mapie torusowej, a na ograniczonej zostaje zablokowany. Interfejsy w konsoli i w Razor Pages.",
    },
    pantadeusz: {
      name: "PanTadeusz",
      note: "Statyczna strona na Bootstrapie publikująca epopeję Mickiewicza – jedna strona na księgę, ze wspólnym spisem treści.",
    },
  },
};
