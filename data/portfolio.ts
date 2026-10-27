export type ProjectDetailKey =
  | "overview"
  | "problem"
  | "role"
  | "implementation"
  | "problemSolving"
  | "result"
  | "learned";

export interface Project {
  slug: string;
  name: string;
  description: string;
  technologies: string[];
  focus: string;
  github?: string;
  details: Partial<Record<ProjectDetailKey, string>>;
}

export const portfolioData = {
  profile: {
    name: "전희준",
    role: "Backend & Cloud Developer",
    headline: "안녕하세요.\n전희준입니다.",
    introduction: [
      "안정적인 시스템을 설계하고\n문제를 해결하는 과정에 관심이 있습니다.",
      "백엔드와 클라우드 기술을 중심으로\n사용자에게 가치 있는 서비스를 만드는 개발자를 지향합니다.",
    ],
    aboutTitle: "문제를 해결하고\n가치를 만드는 개발자",
    about: [
      "백엔드와 서버를 중심으로, 기능이 안정적으로 동작하는 구조와 유지보수하기 좋은 시스템 설계에 관심이 있습니다.",
      "클라우드 환경에서 서비스를 운영하는 과정과 AI를 개발 과정에 실용적으로 활용하는 방법을 공부하고 있습니다. 새로운 기술 자체보다 해결해야 할 문제와 사용자에게 전달되는 가치를 먼저 생각합니다.",
    ],
  },
  navigation: [
    { label: "About", href: "#about" },
    { label: "Projects", href: "#projects" },
    { label: "Experience", href: "#experience" },
    { label: "Blog", href: "blog" },
    { label: "Contact", href: "#contact" },
  ],
  projects: [
    {
      slug: "local-currency",
      name: "지역화폐 가맹점 사업자 플랫폼",
      description: "지역화폐 가맹점 사업자를 위한 인증 및 서비스 플랫폼",
      technologies: ["Spring Boot", "MySQL", "AWS", "Docker"],
      focus:
        "사업자 번호만 알고 있는 비사업자의 가입을 방지하기 위해 사업자 본인 인증 구조를 설계한 프로젝트",
      github: "https://github.com/Komsco-Masil",
      details: {
        overview: "지역화폐 가맹점 사업자가 안전하게 가입하고 서비스를 이용할 수 있도록 인증 흐름을 설계한 프로젝트입니다.",
        problem: "사업자 번호는 외부에 노출될 수 있어 번호 확인만으로는 실제 사업자 여부를 신뢰하기 어려웠습니다.",
      },
    },
    {
      slug: "cloudsaver",
      name: "CloudSaver",
      description: "AWS 비용 절감 검토 후보와 판단 근거를 보여주는 셀프 호스팅 CLI",
      technologies: ["Python", "boto3", "Cloud Custodian", "Docker"],
      focus: "읽기 전용 리소스 분석과 데모 모드로 비용 최적화 후보의 근거·위험·불확실성을 설명",
      github: "https://github.com/Zenjun/CloudSaver",
      details: {
        overview: "AWS 리소스에서 비용 절감 검토 후보를 찾고 근거, 운영 위험, 비용 정보의 불확실성을 함께 보여주는 CLI 프로젝트입니다.",
        problem: "유휴 리소스로 보이는 항목도 운영 의존성이나 사용량 자료가 부족할 수 있어, 단순 탐지만으로 중지·삭제 여부를 결정하기 어렵습니다.",
        implementation: "EC2·EBS·Elastic IP의 읽기 전용 수집, AWS 없이 실행하는 데모 모드, 정책 기반 후보 탐지, 저장 보고서 분석과 HTML 대시보드를 구현했습니다. Cloud Custodian 정책 검증도 지원합니다.",
        result: "후보별 근거와 위험을 확인할 수 있으며, 실제 AWS 계정에서의 수집 및 정책 평가는 아직 검증되지 않았습니다. 기본 스캔의 절감액은 UNKNOWN으로 표시합니다.",
      },
    },
  ] satisfies Project[],
  experience: [
    {
      period: "2025.06 — 2025.08",
      title: "AI 모델 성능 개선 프로젝트",
    },
    {
      period: "2024.09 — 2024.12",
      title: "교내 캡스톤 프로젝트",
    },
  ],
  contact: [
    { label: "Email", value: "heejun911@naver.com", href: "mailto:heejun911@naver.com" },
    { label: "GitHub", value: "https://github.com/Zenjun", href: "https://github.com/Zenjun" },
    { label: "Blog", value: "velog.io/@heejun0911", href: "https://velog.io/@heejun0911/posts" },
    {
      label: "LinkedIn",
      value: "linkedin.com/in/희준-전-768616431",
      href: "https://www.linkedin.com/in/%ED%9D%AC%EC%A4%80-%EC%A0%84-768616431/",
    },
  ],
} as const;

export const getProjectBySlug = (slug: string): Project | undefined =>
  portfolioData.projects.find((project) => project.slug === slug);
