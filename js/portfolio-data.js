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
      github: "https://github.com/username",
      details: {
        overview: "지역화폐 가맹점 사업자가 안전하게 가입하고 서비스를 이용할 수 있도록 인증 흐름을 설계한 프로젝트입니다.",
        problem: "사업자 번호는 외부에 노출될 수 있어 번호 확인만으로는 실제 사업자 여부를 신뢰하기 어려웠습니다.",
        role: "담당 범위와 기여 내용을 입력해 주세요.",
        implementation: "인증 절차, API 구조, 데이터 모델 등 실제 구현 내용을 입력해 주세요.",
        problemSolving: "본인 인증 과정에서 검토한 대안과 최종 방식의 선택 근거를 입력해 주세요.",
        result: "검증 결과나 개선된 지표가 있다면 입력해 주세요.",
        learned: "프로젝트를 통해 배운 점을 입력해 주세요.",
      },
    },
    {
      slug: "anti-spoofing",
      name: "Face Anti-Spoofing",
      description: "실제 얼굴과 위조 얼굴을 판별하는 컴퓨터 비전 모델",
      technologies: ["Python", "PyTorch", "OpenCV", "EfficientNet"],
      focus: "약 20,000개의 이미지 데이터를 활용해 Real / Fake 얼굴을 분류하는 모델을 학습",
      github: "https://github.com/username",
      details: {
        overview: "얼굴 이미지가 실제 촬영본인지 위조된 입력인지 분류하는 컴퓨터 비전 프로젝트입니다.",
        problem: "다양한 촬영 환경과 위조 방식에서도 실제 얼굴과 위조 얼굴을 안정적으로 구분해야 했습니다.",
        role: "담당 범위와 기여 내용을 입력해 주세요.",
        implementation: "데이터 전처리, 모델 학습, 평가 방식 등 실제 구현 내용을 입력해 주세요.",
        problemSolving: "성능 개선 과정에서 세운 가설과 실험 내용을 입력해 주세요.",
        result: "정확도, F1 Score 등 검증된 결과를 입력해 주세요.",
        learned: "프로젝트를 통해 배운 점을 입력해 주세요.",
      },
    },
    {
      slug: "fpga-alarm-clock",
      name: "FPGA Alarm Clock",
      description: "Verilog 기반 디지털 알람 시계",
      technologies: ["Verilog", "Quartus", "FPGA"],
      focus: "24시간 시계, 시간 설정, 알람 설정, FND 및 LED 출력을 구현",
      github: "https://github.com/username",
      details: {
        overview: "Verilog로 디지털 시계와 알람 기능을 설계하고 FPGA 보드에서 동작하도록 구현한 프로젝트입니다.",
        problem: "시계 동작과 사용자 설정, 알람 출력이 서로 충돌하지 않도록 상태와 신호를 설계해야 했습니다.",
        role: "담당 범위와 기여 내용을 입력해 주세요.",
        implementation: "모듈 구성, 클럭 분주, 입력 처리 등 실제 구현 내용을 입력해 주세요.",
        problemSolving: "타이밍 또는 상태 전환 문제를 해결한 과정을 입력해 주세요.",
        result: "보드 검증 결과와 구현 범위를 입력해 주세요.",
        learned: "프로젝트를 통해 배운 점을 입력해 주세요.",
      },
    },
  ],
  experience: [
    {
      period: "2025.06 — 2025.08",
      title: "AI 모델 성능 개선 프로젝트",
      description: "구체적인 역할과 성과를 입력해 주세요.",
    },
    {
      period: "2024.09 — 2024.12",
      title: "교내 캡스톤 프로젝트",
      description: "구체적인 역할과 성과를 입력해 주세요.",
    },
    {
      period: "기간 입력",
      title: "Computer Engineering",
      description: "학교명과 재학 기간 등 공개할 정보를 입력해 주세요.",
    },
  ],
  contact: [
    {
      label: "Email",
      value: "hello@example.com",
      href: "mailto:hello@example.com",
    },
    {
      label: "GitHub",
      value: "github.com/username",
      href: "https://github.com/username",
    },
    {
      label: "LinkedIn",
      value: "linkedin.com/in/username",
      href: "https://linkedin.com/in/username",
    },
  ],
};
