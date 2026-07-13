import type { SkillGroup } from "@/types/skill";

// NOTE: Örnek yetkinlik listesi — gerçek beceri seti ile güncellenecektir.
export const skillGroups: SkillGroup[] = [
  {
    key: "frontend",
    label: "Frontend",
    items: [
      { name: "Next.js" },
      { name: "React" },
      { name: "TypeScript" },
      { name: "Tailwind CSS" },
      { name: "Framer Motion" },
    ],
  },
  {
    key: "backend",
    label: "Backend",
    items: [
      { name: "Node.js" },
      { name: "Python" },
      { name: "Django" },
      { name: "REST APIs" },
      { name: "GraphQL" },
    ],
  },
  {
    key: "databases",
    label: "Databases",
    items: [
      { name: "PostgreSQL" },
      { name: "MongoDB" },
      { name: "Redis" },
      { name: "Prisma" },
    ],
  },
  {
    key: "ai",
    label: "Artificial Intelligence",
    items: [
      { name: "LLM Entegrasyonu" },
      { name: "Prompt Engineering" },
      { name: "Vector Databases" },
      { name: "PyTorch" },
    ],
  },
  {
    key: "devops",
    label: "DevOps",
    items: [
      { name: "Docker" },
      { name: "GitHub Actions" },
      { name: "Vercel" },
      { name: "CI/CD" },
    ],
  },
  {
    key: "product",
    label: "Product Development",
    items: [
      { name: "Ürün Stratejisi" },
      { name: "Kullanıcı Araştırması" },
      { name: "Sistem Tasarımı" },
      { name: "Roadmapping" },
    ],
  },
];
