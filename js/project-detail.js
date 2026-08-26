import { portfolioData } from "/js/portfolio-data.js";

const DETAIL_SECTIONS = [
  ["overview", "Overview"],
  ["problem", "Problem"],
  ["role", "My Role"],
  ["implementation", "Implementation"],
  ["problemSolving", "Problem Solving"],
  ["result", "Result"],
  ["learned", "What I Learned"],
];

const createElement = (tagName, className, textContent) => {
  const element = document.createElement(tagName);
  if (className) element.className = className;
  if (textContent) element.textContent = textContent;
  return element;
};

const pathSegments = window.location.pathname.split("/").filter(Boolean);
const projectSlug = pathSegments.at(-1) === "index.html" ? pathSegments.at(-2) : pathSegments.at(-1);
const project = portfolioData.projects.find(({ slug }) => slug === projectSlug);
const detailRoot = document.querySelector("#project-detail");

if (!project) {
  document.title = "프로젝트를 찾을 수 없습니다 | 전희준";
  const title = createElement("h1", "", "프로젝트를 찾을 수 없습니다.");
  const description = createElement("p", "detail-summary", "주소를 확인하거나 프로젝트 목록으로 돌아가 주세요.");
  detailRoot.append(title, description);
} else {
  document.title = `${project.name} | 전희준`;
  document.querySelector('meta[name="description"]').content = project.description;
  document.querySelector('meta[property="og:title"]').content = `${project.name} | 전희준`;
  document.querySelector('meta[property="og:description"]').content = project.description;

  const header = createElement("header", "detail-header");
  header.append(createElement("p", "eyebrow", "Project detail"));
  header.append(createElement("h1", "", project.name));
  header.append(createElement("p", "detail-summary", project.description));

  const tags = createElement("div", "tag-list");
  tags.setAttribute("aria-label", "사용 기술");
  project.technologies.forEach((technology) => tags.append(createElement("span", "tag", technology)));
  header.append(tags);

  const links = createElement("div", "detail-links");
  const githubLink = createElement("a", "button button-secondary", "GitHub");
  githubLink.href = project.github;
  githubLink.target = "_blank";
  githubLink.rel = "noreferrer";
  links.append(githubLink);
  header.append(links);

  const content = createElement("div", "detail-content");
  DETAIL_SECTIONS.forEach(([key, title]) => {
    const section = createElement("section", "detail-section");
    section.append(createElement("h2", "", title));
    const value = project.details[key];
    const isPlaceholder = value.includes("입력해 주세요");
    section.append(createElement("p", isPlaceholder ? "detail-placeholder" : "", value));
    content.append(section);
  });

  detailRoot.append(header, content);
}

document.querySelector("#current-year").textContent = String(new Date().getFullYear());
