/* ===========================
   NavBar (igual que antes)
   =========================== */
const toggle = document.getElementById("menu-toggle");
const navbarMenu = document.querySelector(".navbar-menu");

if (toggle && navbarMenu) {
  toggle.addEventListener("click", () => {
    navbarMenu.classList.toggle("active");
    toggle.classList.toggle("active");
  });
} else {
  // Si alguno no existe, no rompe la ejecución
  // console.warn('menu-toggle o .navbar-menu no encontrado');
}

/* ========================================================
   Carrusel superior, todo encapsulado para no afectar otras variables globales
   ======================================================== */
(function initTopCarousel() {
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  const slidesTop = Array.from(document.querySelectorAll(".carousel-slide"));
  const indicatorsContainer = document.getElementById("carouselIndicators");

  if (slidesTop.length === 0 || !indicatorsContainer) {
    return;
  }

  let topIndex = 0;
  let topInterval = null;
  const TOP_DELAY = 5000;

  indicatorsContainer.innerHTML = "";
  slidesTop.forEach((_, i) => {
    const dot = document.createElement("span");
    dot.classList.add("indicator");
    if (i === 0) dot.classList.add("active");
    dot.addEventListener("click", () => {
      stopTopAuto();
      goToTopSlide(i);
      startTopAuto();
    });
    indicatorsContainer.appendChild(dot);
  });
  const topDots = Array.from(indicatorsContainer.querySelectorAll(".indicator"));

  slidesTop.forEach((s, idx) => {
    s.style.position = "absolute";
    s.style.left = 0;
    s.style.top = 0;
    s.style.width = "100%";
    s.style.transition = "transform 0.45s ease";
    s.style.transform = `translateX(${idx * 100}%)`;
  });

  function updateTopIndicators() {
    topDots.forEach((d, i) => d.classList.toggle("active", i === topIndex));
  }

  function goToTopSlide(i) {
    topIndex = ((i % slidesTop.length) + slidesTop.length) % slidesTop.length;
    slidesTop.forEach((s, idx) => {
      s.style.transform = `translateX(${(idx - topIndex) * 100}%)`;
    });
    updateTopIndicators();
  }

  function nextTopSlide() {
    goToTopSlide(topIndex + 1);
  }

  function prevTopSlide() {
    goToTopSlide(topIndex - 1);
  }

  function startTopAuto() {
    stopTopAuto();
    topInterval = setInterval(nextTopSlide, TOP_DELAY);
  }

  function stopTopAuto() {
    if (topInterval) {
      clearInterval(topInterval);
      topInterval = null;
    }
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      stopTopAuto();
      nextTopSlide();
      startTopAuto();
    });
  }
  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      stopTopAuto();
      prevTopSlide();
      startTopAuto();
    });
  }

  // inicio
  goToTopSlide(0);
  startTopAuto();

  // si cambian tamaño, reposicionamos sin animación
  let topResizeTimer = null;
  window.addEventListener("resize", () => {
    if (topResizeTimer) clearTimeout(topResizeTimer);
    topResizeTimer = setTimeout(() => goToTopSlide(topIndex), 120);
  });
})();

/* ========================================================
   Carrusel #carrusel1 (aislado para que no choque)
   ======================================================== */
(function initCarrusel1() {
  const wrapper = document.getElementById("carrusel1");
  if (!wrapper) return;

  const slider = wrapper.querySelector(".slider");
  const slides1 = slider ? Array.from(slider.querySelectorAll("img")) : [];
  const navButtons = Array.from(wrapper.querySelectorAll(".slider-nav button"));

  if (!slider || slides1.length === 0) return;

  slider.style.display = "flex";
  slider.style.willChange = "transform";
  slider.style.transition = "transform 0.5s ease";

  slides1.forEach(img => {
    img.style.flex = "0 0 100%";
    img.style.width = "100%";
    img.style.display = "block";
    img.style.objectFit = img.style.objectFit || "cover";
  });

  let currentIndex1 = 0;
  const total1 = slides1.length;
  const DELAY1 = 4000;
  let interval1 = null;

  function showSlide1(i) {
    currentIndex1 = ((i % total1) + total1) % total1;
    slider.style.transform = `translateX(${-currentIndex1 * 100}%)`;
    navButtons.forEach((b, idx) => b.classList.toggle("active", idx === currentIndex1));
  }

  function nextSlide1() {
    showSlide1(currentIndex1 + 1);
  }

  function startAuto1() {
    stopAuto1();
    interval1 = setInterval(nextSlide1, DELAY1);
  }

  function stopAuto1() {
    if (interval1) {
      clearInterval(interval1);
      interval1 = null;
    }
  }

  navButtons.forEach((btn, i) => {
    btn.addEventListener("click", (ev) => {
      if (ev && ev.preventDefault) ev.preventDefault();
      stopAuto1();
      showSlide1(i);
      startAuto1();
    });
  });

  showSlide1(0);
  startAuto1();

  // reajustar al redimensionar si hace falta
  let resizeTimer1 = null;
  window.addEventListener("resize", () => {
    if (resizeTimer1) clearTimeout(resizeTimer1);
    resizeTimer1 = setTimeout(() => showSlide1(currentIndex1), 120);
  });
})();

/* ==============================
   Botones Inicio / Admin (igual)
   ============================== */
function back(){
    window.history.back();
}

function ingresar() {
    const usuarioCorrecto = "adminindertuquerres";
    const contraseñaCorrecta = "inder2025@";
    const usuarioIngresado = document.getElementById("name").value;
    const contraseñaIngresada = document.getElementById("password").value;

    if (usuarioIngresado === usuarioCorrecto && contraseñaIngresada === contraseñaCorrecta) {  
        window.location.href = "edicion.html";
    } else {
        alert("Usuario o contraseña incorrectos");
    }
}

/* ==============================
   ANIMACION SCROLL
   ============================== */

const secciones = document.querySelectorAll("section, article, main, .bloque");

const observer = new IntersectionObserver((entradas, observer) => {
  entradas.forEach(entrada => {
    if (entrada.isIntersecting) {
      entrada.target.classList.add("aparece");
      observer.unobserve(entrada.target); 
    }
  });
}, {
  threshold: 0.1
});

secciones.forEach(sec => observer.observe(sec));


