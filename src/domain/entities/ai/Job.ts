export type AIJobInfo = {
  title: string | null;
  company: string | null;
  salary: string | null;
  description: string | null;
  requirements: string | null;
  location: string | null;
  type: "remote" | "on-site" | "hybrid" | "unknown";
};
