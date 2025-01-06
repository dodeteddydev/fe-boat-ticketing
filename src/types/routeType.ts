export type RouteType = {
  path: string;
  element: React.ReactNode;
  type: "protected" | "public";
  title: string;
};
