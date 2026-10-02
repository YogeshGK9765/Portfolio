const certificates = [
  {title:"Java Web Development", issuer:"Passion Software Solutions, Jalgaon", file:"certificates/java-web-development.jpg", type:"image"},
  {title:"AI Tools and ChatGPT Workshop", issuer:"be10x", file:"certificates/be10x-ai-tools.pdf", type:"pdf"},
  {title:"Introduction to Cybersecurity Awareness", issuer:"HP LIFE / HP Foundation", file:"certificates/cybersecurity-awareness-hp.pdf", type:"pdf"},
  {title:"Navigating the Future: Digital Transformation Powered by Emerging Technologies", issuer:"Grok Learning Pvt. Ltd.", file:"certificates/Groq-learning.pdf", type:"pdf"},
  {title:"Software Engineering", issuer:"Infosys / Springboard", file:"certificates/Infosys-Software-Engineering.pdf", type:"pdf"},
  {title:"Bio-cultural Diversity Conservation and Climate Action", issuer:"Youth Leadership for Climate Action", file:"certificates/climate-biodiversity.png", type:"image"},
  {title:"Energy Management and Climate Action", issuer:"Youth Leadership for Climate Action", file:"certificates/climate-energy.png", type:"image"},
  {title:"Handaji Campaign", issuer:"Youth Leadership for Climate Action", file:"certificates/climate-handaji.png", type:"image"},
  {title:"Waste Management and Climate Action", issuer:"Youth Leadership for Climate Action", file:"certificates/climate-waste.png", type:"image"},
  {title:"Living with Climate Change and Water Management", issuer:"Youth Leadership for Climate Action", file:"certificates/climate-water-management.png", type:"image"}
];

const grid = document.getElementById("certificateGrid");
const modal = document.getElementById("certificateModal");
const modalTitle = document.getElementById("modalTitle");
const modalIssuer = document.getElementById("modalIssuer");
const modalPreview = document.getElementById("modalPreview");
const modalOpen = document.getElementById("modalOpen");
const modalClose = document.getElementById("modalClose");

function renderCertificates() {
  grid.innerHTML = certificates.map((c, i) => `
    <article class="certificate-card glass reveal" data-index="${i}" tabindex="0" role="button" aria-label="View ${c.title}">
      <div class="certificate-thumb ${c.type === "pdf" ? "pdf-thumb" : ""}">
        ${c.type === "image"
          ? `<img src="${c.file}" alt="${c.title} certificate" loading="lazy">`
          : `<div><div class="pdf-mark">PDF</div><p style="color:#8f9bad;font-size:10px;margin-top:6px">Click to view original certificate</p></div>`
        }
      </div>
      <div class="certificate-body">
        <h3>${c.title}</h3>
        <p>${c.issuer}</p>
        <small>View certificate ↗</small>
      </div>
    </article>
  `).join("");

  document.querySelectorAll(".certificate-card").forEach(card => {
    const open = () => openCertificate(certificates[Number(card.dataset.index)]);
    card.addEventListener("click", open);
    card.addEventListener("keydown", e => {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); open(); }
    });
  });
}

function openCertificate(c) {
  modalTitle.textContent = c.title;
  modalIssuer.textContent = c.issuer;
  modalOpen.href = c.file;
  modalPreview.innerHTML = c.type === "image"
    ? `<img src="${c.file}" alt="${c.title} certificate">`
    : `<iframe src="${c.file}" title="${c.title} certificate PDF"></iframe>`;
  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
}

function closeCertificate() {
  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden", "true");
  modalPreview.innerHTML = "";
  document.body.classList.remove("modal-open");
}

modalClose.addEventListener("click", closeCertificate);
modal.addEventListener("click", e => {
  if (e.target.hasAttribute("data-close-modal")) closeCertificate();
});
document.addEventListener("keydown", e => {
  if (e.key === "Escape" && modal.classList.contains("is-open")) closeCertificate();
});

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
menuToggle.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(open));
});
navLinks.querySelectorAll("a").forEach(a => a.addEventListener("click", () => navLinks.classList.remove("open")));

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, {threshold: 0.08});

document.getElementById("year").textContent = new Date().getFullYear();
renderCertificates();
document.querySelectorAll(".reveal").forEach(el => observer.observe(el));
