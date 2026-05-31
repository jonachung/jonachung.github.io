/* =========================================================
   Personal Portfolio — interactions
   - Mobile nav toggle
   - Smooth scroll active link
   - Reveal-on-scroll
   - Animated number counters
   - Hero "typed" tagline (rotates phrases)
   - Contact form (mailto fallback)
   - Back-to-top
   - Footer year
   ========================================================= */
(() => {
  "use strict";

  /* ---------------- footer year ---------------- */
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------------- mobile nav toggle ---------------- */
  const toggle = document.querySelector(".nav__toggle");
  const links  = document.querySelector(".nav__links");
  if (toggle && links) {
    toggle.addEventListener("click", () => {
      const open = links.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(open));
    });
    links.querySelectorAll("a").forEach((a) =>
      a.addEventListener("click", () => {
        links.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      })
    );
  }

  /* ---------------- back to top ---------------- */
  document.querySelector(".footer__top")?.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  /* ---------------- reveal on scroll ---------------- */
  const revealTargets = document.querySelectorAll(
    ".card, .section__head, .hero__cta, .window"
  );
  revealTargets.forEach((el) => el.classList.add("reveal"));

  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    revealTargets.forEach((el) => io.observe(el));
  } else {
    revealTargets.forEach((el) => el.classList.add("is-visible"));
  }

  /* ---------------- animated counters ---------------- */
  const counters = document.querySelectorAll("[data-count]");
  const formatNumber = (n, target) => {
    // preserve decimal precision of target (e.g. 99.99, 99.5)
    const decimals = String(target).split(".")[1]?.length ?? 0;
    return n.toFixed(decimals);
  };
  const animateCount = (el) => {
    const target = parseFloat(el.dataset.count);
    if (Number.isNaN(target)) return;
    const duration = 1100;
    const start = performance.now();
    const tick = (now) => {
      const t = Math.min(1, (now - start) / duration);
      // easeOutCubic
      const eased = 1 - Math.pow(1 - t, 3);
      el.textContent = formatNumber(target * eased, target);
      if (t < 1) requestAnimationFrame(tick);
      else el.textContent = formatNumber(target, target);
    };
    requestAnimationFrame(tick);
  };

  if ("IntersectionObserver" in window) {
    const io2 = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCount(entry.target);
            io2.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.6 }
    );
    counters.forEach((el) => io2.observe(el));
  } else {
    counters.forEach((el) => animateCount(el));
  }

  /* ---------------- hero typed tagline ---------------- */
  // Rotates a few short phrases at the end of the bio line.
  // Edit this array to customize what scrolls past your cursor.
  const phrases = [
    "building reliable backends.",
    "obsessed with good auth & clean APIs.",
    "software engineer padawan, constant learner, coffee enthusiast.",
    "turning brittle workflows into boring services.",
    "shipping fast, observing everything.",
  ];
  const cursor = document.getElementById("typed-cursor");
  if (cursor && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    const typed = document.createElement("span");
    typed.style.color = "var(--amber)";
    typed.style.marginLeft = "6px";
    cursor.parentNode.insertBefore(typed, cursor);

    let pi = 0; // phrase index
    let ci = 0; // char index
    let deleting = false;

    const tick = () => {
      const phrase = phrases[pi];
      if (!deleting) {
        ci++;
        typed.textContent = phrase.slice(0, ci);
        if (ci === phrase.length) {
          deleting = true;
          setTimeout(tick, 1400);
          return;
        }
      } else {
        ci--;
        typed.textContent = phrase.slice(0, ci);
        if (ci === 0) {
          deleting = false;
          pi = (pi + 1) % phrases.length;
        }
      }
      setTimeout(tick, deleting ? 30 : 55);
    };
    setTimeout(tick, 600);
  }

  /* ---------------- contact form (mailto fallback) ---------------- */
  // No backend required: opens the user's email client with the message
  // pre-filled. Swap this out for a fetch() to your form-handler of choice
  // (Formspree, Netlify Forms, your own API, etc.) when ready.
  const form = document.getElementById("contact-form");
  const status = form?.querySelector(".form__status");
  const TO_EMAIL = "hungjonathan@gmail.com";

  form?.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!status) return;
    status.classList.remove("is-error");

    const fd = new FormData(form);
    const name = String(fd.get("name") || "").trim();
    const email = String(fd.get("email") || "").trim();
    const message = String(fd.get("message") || "").trim();

    if (!name || !email || !message) {
      status.classList.add("is-error");
      status.textContent = "→ error: please fill in every field.";
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      status.classList.add("is-error");
      status.textContent = "→ error: that email doesn't look valid.";
      return;
    }

    const subject = encodeURIComponent(`Portfolio message from ${name}`);
    const body = encodeURIComponent(`${message}\n\n—\nFrom: ${name} <${email}>`);
    window.location.href = `mailto:${TO_EMAIL}?subject=${subject}&body=${body}`;
    status.textContent = "→ opening your email client…";
  });

  /* ---------------- active section highlight ---------------- */
  const sections = document.querySelectorAll("main section[id]");
  const navAnchors = document.querySelectorAll('.nav__links a[href^="#"]');
  if ("IntersectionObserver" in window && sections.length && navAnchors.length) {
    const map = new Map();
    navAnchors.forEach((a) => {
      const id = a.getAttribute("href").slice(1);
      if (id) map.set(id, a);
    });
    const io3 = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const a = map.get(entry.target.id);
          if (!a) return;
          if (entry.isIntersecting) {
            navAnchors.forEach((x) => (x.style.color = ""));
            a.style.color = "var(--prompt)";
          }
        });
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
    );
    sections.forEach((s) => io3.observe(s));
  }
})();
