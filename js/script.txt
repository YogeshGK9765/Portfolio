const certificates = [
  {
    title: "Java Web Development",
    issuer: "Passion Software Solution, Jalgaon",
    date: "2 June 2025 — 25 August 2025",
    description: "12 weeks in-plant training as per MSBTE curriculum.",
    file: "certificates/java-web-development.jpg",
    type: "image"
  },
  {
    title: "AI Tools and ChatGPT Workshop",
    issuer: "be10X",
    date: "10 August 2025",
    description: "Successful completion of the AI tools and ChatGPT workshop.",
    file: "certificates/be10x-ai-tools.pdf",
    type: "pdf"
  },
  {
    title: "Introduction to Cybersecurity Awareness",
    issuer: "HP LIFE / HP Foundation",
    date: "21 October 2024",
    description: "Successful completion of the HP LIFE online course.",
    file: "certificates/cybersecurity-awareness-hp.pdf",
    type: "pdf"
  },
  {
    title:
      "Navigating the Future: Digital Transformation Powered by Emerging Technologies",
    issuer: "Grok Learning Pvt. Ltd.",
    date: "26 April 2025",
    description: "Participation in the webinar.",
    file: "certificates/Groq-learning.pdf",
    type: "pdf"
  },
  {
    title: "Software Engineering",
    issuer: "Infosys / Springboard",
    date: "15 October 2025",
    description: "Successful completion of the course.",
    file: "certificates/Infosis-Software-Engineering.pdf",
    type: "pdf"
  },
  {
    title: "Bio-cultural Diversity Conservation and Climate Action",
    issuer: "Youth Leadership for Climate Action",
    date: "26 March 2025",
    description: "Successful completion of the online course.",
    file: "certificates/climate-biodiversity.png",
    type: "image"
  },
  {
    title: "Energy Management and Climate Action",
    issuer: "Youth Leadership for Climate Action",
    date: "27 March 2025",
    description: "Successful completion of the online course.",
    file: "certificates/climate-energy.png",
    type: "image"
  },
  {
    title: "Handaji Campaign",
    issuer: "Youth Leadership for Climate Action",
    date: "26 March 2025",
    description: "Successful completion of the online course.",
    file: "certificates/climate-handaji.png",
    type: "image"
  },
  {
    title: "Waste Management and Climate Action",
    issuer: "Youth Leadership for Climate Action",
    date: "26 March 2025",
    description: "Successful completion of the online course.",
    file: "certificates/climate-waste.png",
    type: "image"
  },
  {
    title: "Living with Climate Change and Water Management",
    issuer: "Youth Leadership for Climate Action",
    date: "26 March 2025",
    description: "Successful completion of the online course.",
    file: "certificates/climate-water-management.png",
    type: "image"
  }
];


// ===============================
// Certificate Elements
// ===============================

const grid = document.getElementById("certificateGrid");

const modal = document.getElementById("certificateModal");
const modalTitle = document.getElementById("modalTitle");
const modalIssuer = document.getElementById("modalIssuer");
const modalPreview = document.getElementById("modalPreview");
const modalOpen = document.getElementById("modalOpen");
const modalClose = document.getElementById("modalClose");


// ===============================
// Render Certificates
// ===============================

function renderCertificates() {
  grid.innerHTML = certificates
    .map(
      (certificate, index) => `
        <article
          class="certificate-card glass reveal"
          data-index="${index}"
          tabindex="0"
          role="button"
          aria-label="View ${certificate.title}"
        >
          <div class="certificate-body">

            <div class="certificate-number">
              ${String(index + 1).padStart(2, "0")}
            </div>

            <h3>${certificate.title}</h3>

            <p class="certificate-issuer">
              ${certificate.issuer}
            </p>

            <p class="certificate-date">
              ${certificate.date}
            </p>

            <p class="certificate-description">
              ${certificate.description}
            </p>

            <button
              class="certificate-view"
              type="button"
            >
              View Certificate ↗
            </button>

          </div>
        </article>
      `
    )
    .join("");


  // Certificate click events
  document.querySelectorAll(".certificate-card").forEach(card => {

    const open = () => {
      const index = Number(card.dataset.index);
      openCertificate(certificates[index]);
    };


    card.addEventListener("click", open);


    // Keyboard accessibility
    card.addEventListener("keydown", event => {

      if (event.key === "Enter" || event.key === " ") {

        event.preventDefault();
        open();

      }

    });

  });
}


// ===============================
// Open Certificate Modal
// ===============================

function openCertificate(certificate) {

  modalTitle.textContent = certificate.title;

  modalIssuer.textContent =
    `${certificate.issuer} · ${certificate.date}`;

  modalOpen.href = certificate.file;


  // Image certificate
  if (certificate.type === "image") {

    modalPreview.innerHTML = `
      <img
        src="${certificate.file}"
        alt="${certificate.title} certificate"
      >
    `;

  }

  // PDF certificate
  else {

    modalPreview.innerHTML = `
      <iframe
        src="${certificate.file}"
        title="${certificate.title} certificate PDF"
      ></iframe>
    `;

  }


  modal.classList.add("is-open");

  modal.setAttribute("aria-hidden", "false");

  document.body.classList.add("modal-open");
}


// ===============================
// Close Certificate Modal
// ===============================

function closeCertificate() {

  modal.classList.remove("is-open");

  modal.setAttribute("aria-hidden", "true");

  modalPreview.innerHTML = "";

  document.body.classList.remove("modal-open");
}


// Close button
modalClose.addEventListener("click", closeCertificate);


// Close when clicking backdrop
modal.addEventListener("click", event => {

  if (event.target.hasAttribute("data-close-modal")) {
    closeCertificate();
  }

});


// Close with Escape key
document.addEventListener("keydown", event => {

  if (
    event.key === "Escape" &&
    modal.classList.contains("is-open")
  ) {
    closeCertificate();
  }

});


// ===============================
// Mobile Navigation
// ===============================

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");


menuToggle.addEventListener("click", () => {

  const isOpen = navLinks.classList.toggle("open");

  menuToggle.setAttribute(
    "aria-expanded",
    String(isOpen)
  );

});


// Close mobile menu after clicking a link
navLinks.querySelectorAll("a").forEach(link => {

  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
  });

});


// ===============================
// Scroll Reveal Animation
// ===============================

const observer = new IntersectionObserver(
  entries => {

    entries.forEach(entry => {

      if (entry.isIntersecting) {

        entry.target.classList.add("visible");

        observer.unobserve(entry.target);

      }

    });

  },
  {
    threshold: 0.08
  }
);


// ===============================
// Footer Year
// ===============================

document.getElementById("year").textContent =
  new Date().getFullYear();


// ===============================
// Initialize
// ===============================

renderCertificates();

document
  .querySelectorAll(".reveal")
  .forEach(element => observer.observe(element));
