(() => {
  const config = window.SKUYLAND_CONFIG || {};
  const number = String(config.whatsappNumber || "").replace(/\D/g, "");
  const messageUrl = (message) => number
    ? `https://wa.me/${number}?text=${encodeURIComponent(message)}`
    : `https://wa.me/?text=${encodeURIComponent("Nomor WhatsApp Skuyland belum dikonfigurasi. " + message)}`;

  document.querySelectorAll(".wa-link").forEach(link => {
    link.href = messageUrl(config.whatsappGreeting || "Halo, saya ingin bertanya tentang menu Skuyland Seblak.");
    link.addEventListener("click", event => {
      if (!number) {
        event.preventDefault();
        alert("Nomor WhatsApp usaha belum diatur. Buka config.js lalu isi whatsappNumber dengan nomor resmi Skuyland.");
      }
    });
  });

  document.querySelectorAll(".quick-order").forEach(button => {
    button.addEventListener("click", () => {
      const item = button.dataset.item || "menu";
      if (!number) {
        alert("Nomor WhatsApp usaha belum diatur. Buka config.js lalu isi whatsappNumber dengan nomor resmi Skuyland.");
        return;
      }
      window.open(messageUrl(`Halo Skuyland Seblak, saya ingin pesan/bertanya tentang ${item}. Apakah tersedia?`), "_blank", "noopener,noreferrer");
    });
  });

  const filters = document.querySelectorAll(".filter");
  const cards = document.querySelectorAll(".menu-card");
  filters.forEach(filter => filter.addEventListener("click", () => {
    filters.forEach(item => item.classList.toggle("active", item === filter));
    const category = filter.dataset.filter;
    cards.forEach(card => card.classList.toggle("hidden", category !== "all" && card.dataset.category !== category));
  }));

  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".nav");
  toggle?.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Tutup navigasi" : "Buka navigasi");
    toggle.textContent = open ? "×" : "☰";
  });
  nav?.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
    nav.classList.remove("open");
    toggle?.setAttribute("aria-expanded", "false");
    if (toggle) { toggle.textContent = "☰"; toggle.setAttribute("aria-label", "Buka navigasi"); }
  }));
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
})();