interface Operation {
  type: "add" | "remove" | "update";

  path: string[];

  value?: string;
}

interface TemplateComponents {
  add(path: string[], value: any): Promise<void>;
  update(path: string[], value: any): Promise<void>;

  remove(path: string[]): Promise<void>;

  notify(value: Operation): void;
}

export default _ as TemplateComponents;
