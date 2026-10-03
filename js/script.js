const certificates=[
{title:"Java Web Development",issuer:"Passion Software Solution, Jalgaon",date:"2 June 2025 — 25 August 2025",description:"12 weeks in-plant training as per MSBTE curriculum.",file:"certificates/java-web-development.jpg",type:"image"},
{title:"AI Tools and ChatGPT Workshop",issuer:"be10X",date:"10 August 2025",description:"Successful completion of the AI tools and ChatGPT workshop.",file:"certificates/be10x-ai-tools.pdf",type:"pdf"},
{title:"Introduction to Cybersecurity Awareness",issuer:"HP LIFE / HP Foundation",date:"21 October 2024",description:"Successful completion of the HP LIFE online course.",file:"certificates/cybersecurity-awareness-hp.pdf",type:"pdf"},
{title:"Navigating the Future: Digital Transformation Powered by Emerging Technologies",issuer:"Grok Learning Pvt. Ltd.",date:"26 April 2025",description:"Participation in the webinar.",file:"certificates/Groq-learning.pdf",type:"pdf"},
{title:"Software Engineering",issuer:"Infosys / Springboard",date:"15 October 2025",description:"Successful completion of the course.",file:"certificates/Infosis-Software-Engineering.pdf",type:"pdf"},
{title:"Bio-cultural Diversity Conservation and Climate Action",issuer:"Youth Leadership for Climate Action",date:"26 March 2025",description:"Successful completion of the online course.",file:"certificates/climate-biodiversity.png",type:"image"},
{title:"Energy Management and Climate Action",issuer:"Youth Leadership for Climate Action",date:"27 March 2025",description:"Successful completion of the online course.",file:"certificates/climate-energy.png",type:"image"},
{title:"Handaji Campaign",issuer:"Youth Leadership for Climate Action",date:"26 March 2025",description:"Successful completion of the online course.",file:"certificates/climate-handaji.png",type:"image"},
{title:"Waste Management and Climate Action",issuer:"Youth Leadership for Climate Action",date:"26 March 2025",description:"Successful completion of the online course.",file:"certificates/climate-waste.png",type:"image"},
{title:"Living with Climate Change and Water Management",issuer:"Youth Leadership for Climate Action",date:"26 March 2025",description:"Successful completion of the online course.",file:"certificates/climate-water-management.png",type:"image"}
];

const grid=document.getElementById("certificateGrid"),
modal=document.getElementById("certificateModal"),
modalTitle=document.getElementById("modalTitle"),
modalIssuer=document.getElementById("modalIssuer"),
modalPreview=document.getElementById("modalPreview"),
modalOpen=document.getElementById("modalOpen"),
modalClose=document.getElementById("modalClose");

function renderCertificates(){
  grid.innerHTML=certificates.map((c,i)=>`
    <article class="certificate-card glass reveal"
      data-index="${i}"
      tabindex="0"
      role="button"
      aria-label="View ${c.title}">
      
      <div class="certificate-body">
        <div class="certificate-number">
          ${String(i+1).padStart(2,"0")}
        </div>

        <h3>${c.title}</h3>

        <p class="certificate-issuer">
          ${c.issuer}
        </p>

        <p class="certificate-date">
          ${c.date}
        </p>

        <p class="certificate-description">
          ${c.description}
        </p>

        <button class="certificate-view" type="button">
          View Certificate ↗
        </button>
      </div>
    </article>
  `).join("");

  document.querySelectorAll(".certificate-card").forEach(card=>{
    const open=()=>{
      openCertificate(
        certificates[Number(card.dataset.index)]
      );
    };

    card.addEventListener("click",open);

    card.addEventListener("keydown",e=>{
      if(e.key==="Enter"||e.key===" "){
        e.preventDefault();
        open();
      }
    });
  });
}

function openCertificate(c){
  modalTitle.textContent=c.title;

  modalIssuer.textContent=
    `${c.issuer} · ${c.date}`;

  modalOpen.href=c.file;

  modalPreview.innerHTML=
    c.type==="image"
      ? `<img src="${c.file}" alt="${c.title} certificate">`
      : `<iframe src="${c.file}" title="${c.title} certificate PDF"></iframe>`;

  modal.classList.add("is-open");

  modal.setAttribute(
    "aria-hidden",
    "false"
  );

  document.body.classList.add("modal-open");
}

function closeCertificate(){
  modal.classList.remove("is-open");

  modal.setAttribute(
    "aria-hidden",
    "true"
  );

  modalPreview.innerHTML="";

  document.body.classList.remove("modal-open");
}

modalClose.addEventListener(
  "click",
  closeCertificate
);

modal.addEventListener("click",e=>{
  if(e.target.hasAttribute("data-close-modal")){
    closeCertificate();
  }
});

document.addEventListener("keydown",e=>{
  if(
    e.key==="Escape" &&
    modal.classList.contains("is-open")
  ){
    closeCertificate();
  }
});

const menuToggle=
  document.getElementById("menuToggle");

const navLinks=
  document.getElementById("navLinks");

menuToggle.addEventListener("click",()=>{
  const open=
    navLinks.classList.toggle("open");

  menuToggle.setAttribute(
    "aria-expanded",
    String(open)
  );

  navLinks.classList.toggle(
    "open",
    open
  );
});

navLinks.querySelectorAll("a").forEach(a=>{
  a.addEventListener("click",()=>{
    navLinks.classList.remove("open");

    menuToggle.setAttribute(
      "aria-expanded",
      "false"
    );
  });
});

const observer=
  new IntersectionObserver(
    entries=>{
      entries.forEach(entry=>{
        if(entry.isIntersecting){

          entry.target.classList.add(
            "visible"
          );

          observer.unobserve(
            entry.target
          );
        }
      });
    },
    {
      threshold:.08
    }
  );

document.getElementById("year").textContent=
  new Date().getFullYear();

renderCertificates();

document
  .querySelectorAll(".reveal")
  .forEach(el=>{
    observer.observe(el);
  });
