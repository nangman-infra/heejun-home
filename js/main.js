import { portfolioData } from "/js/portfolio-data.js";

const createElement = (tagName, className, textContent) => {
  const element = document.createElement(tagName);
  if (className) element.className = className;
  if (textContent) element.textContent = textContent;
  return element;
};

const renderNavigation = () => {
  const navigation = document.querySelector("#primary-navigation");
  const menuButton = document.querySelector(".menu-button");

  portfolioData.navigation.forEach(({ label, href }) => {
    const link = createElement("a", "", label);
    link.href = href;
    link.addEventListener("click", () => {
      navigation.classList.remove("is-open");
      menuButton.setAttribute("aria-expanded", "false");
    });
    navigation.append(link);
  });

  menuButton.addEventListener("click", () => {
    const isOpen = menuButton.getAttribute("aria-expanded") === "true";
    menuButton.setAttribute("aria-expanded", String(!isOpen));
    navigation.classList.toggle("is-open", !isOpen);
  });
};

const renderProfile = () => {
  const { profile, contact } = portfolioData;
  document.querySelector("#hero-role").textContent = profile.role;
  document.querySelector("#hero-title").textContent = profile.headline;
  document.querySelector("#about-title").textContent = profile.aboutTitle;

  const introduction = document.querySelector("#hero-introduction");
  profile.introduction.forEach((paragraph) => {
    introduction.append(createElement("p", "", paragraph));
  });

  const aboutContent = document.querySelector("#about-content");
  profile.about.forEach((paragraph) => {
    aboutContent.append(createElement("p", "", paragraph));
  });

  const github = contact.find(({ label }) => label === "GitHub");
  const githubLink = document.querySelector("#hero-github");
  githubLink.href = github.href;
  githubLink.target = "_blank";
  githubLink.rel = "noreferrer";
};

const createProjectCard = (project, index) => {
  const card = createElement("article", "project-card");
  card.append(createElement("span", "project-number", String(index + 1).padStart(2, "0")));
  card.append(createElement("h3", "", project.name));
  card.append(createElement("p", "project-description", project.description));

  const tags = createElement("div", "tag-list");
  tags.setAttribute("aria-label", "사용 기술");
  project.technologies.forEach((technology) => {
    tags.append(createElement("span", "tag", technology));
  });
  card.append(tags);
  card.append(createElement("p", "project-focus", project.focus));

  const links = createElement("div", "project-links");
  const githubLink = createElement("a", "text-link", "GitHub");
  githubLink.href = project.github;
  githubLink.target = "_blank";
  githubLink.rel = "noreferrer";
  githubLink.setAttribute("aria-label", `${project.name} GitHub 새 창에서 열기`);

  const detailsLink = createElement("a", "text-link", "Details →");
  detailsLink.href = `/projects/${project.slug}/`;
  detailsLink.setAttribute("aria-label", `${project.name} 상세 보기`);
  links.append(githubLink, detailsLink);
  card.append(links);
  return card;
};

const renderProjects = () => {
  const projectList = document.querySelector("#project-list");
  portfolioData.projects.forEach((project, index) => {
    projectList.append(createProjectCard(project, index));
  });
};

const renderExperience = () => {
  const experienceList = document.querySelector("#experience-list");
  portfolioData.experience.forEach(({ period, title, description }) => {
    const row = createElement("article", "experience-row");
    row.append(createElement("span", "experience-period", period));
    const content = createElement("div");
    content.append(createElement("strong", "", title));
    content.append(createElement("p", "", description));
    row.append(content);
    experienceList.append(row);
  });
};

const renderContact = () => {
  const contactList = document.querySelector("#contact-list");
  portfolioData.contact.forEach(({ label, value, href }) => {
    const item = createElement("div", "contact-item");
    const term = createElement("dt", "", label);
    const definition = createElement("dd");
    const link = createElement("a", "", value);
    link.href = href;
    if (!href.startsWith("mailto:")) {
      link.target = "_blank";
      link.rel = "noreferrer";
    }
    definition.append(link);
    item.append(term, definition);
    contactList.append(item);
  });
};

renderNavigation();
renderProfile();
renderProjects();
renderExperience();
renderContact();
document.querySelector("#current-year").textContent = String(new Date().getFullYear());
