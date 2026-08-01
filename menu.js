/* CARREGAMENTO DO MENU */
fetch("menu.html")
  .then(res => res.text())
  .then(html => {
    // "afterbegin" garante que o menu seja o primeiro elemento do body,
    // evitando que herde larguras de containers de conteúdo da página.
    document.body.insertAdjacentHTML("afterbegin", html);
    initMenu();
  })
  .catch(err => console.error("Erro ao carregar o menu:", err));

function initMenu() {
  const openMenu  = document.getElementById("openMenu");
  const closeMenu = document.getElementById("closeMenu");
  const sideMenu  = document.getElementById("sideMenu");
  const overlay   = document.getElementById("menuOverlay");

  if (openMenu && closeMenu && sideMenu && overlay) {

    // Função para fechar o menu e liberar o scroll
    const closeSideMenu = () => {
      sideMenu.classList.remove("active");
      overlay.classList.remove("active");
      document.body.classList.remove("no-scroll");
    };

    // Função para abrir o menu e travar o scroll
    openMenu.onclick = () => {
      sideMenu.classList.add("active");
      overlay.classList.add("active");
      document.body.classList.add("no-scroll");
    };

    closeMenu.onclick = closeSideMenu;
    overlay.onclick   = closeSideMenu;

    // Fecha o menu se a tecla Esc for pressionada
    document.addEventListener('keydown', (e) => {
      if (e.key === "Escape") closeSideMenu();
    });
  }

  setActivePage();
}

/* MARCA PÁGINA ATUAL */
function setActivePage() {
  // Pega o nome do arquivo atual (ex: index.html)
  const current = location.pathname.split("/").pop() || "index.html";

  // Mapeamento dos IDs dos links
  const pages = {
    "index.html": "menuHome",
    "units.html": "menuUnits",
    "tier-list.html": "menuTierList",
    "guia.html": "menuGuia",
    "equipamentos.html": "menuEquipamentos",
    "effects.html": "menuEffects",
    "modifiers.html": "menuModifiers",
    "update-log.html": "menuUpdate"
  };

  // Remove classes active de todos os links para evitar duplicidade
  document.querySelectorAll(".side-menu a").forEach(link => link.classList.remove("active"));

  if (pages[current]) {
    const activeElement = document.getElementById(pages[current]);
    if (activeElement) activeElement.classList.add("active");
  }
}