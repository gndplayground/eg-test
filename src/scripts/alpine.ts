import AlpineCore, { AlpineComponent } from "alpinejs";
import focus from "@alpinejs/focus";

export const AlpinePrefix = "by-";

AlpineCore.plugin(focus);
AlpineCore.prefix(AlpinePrefix);

export const defineComponent = <P, T>(fn: (params: P) => AlpineComponent<T>) =>
  fn;

export const Alpine = AlpineCore;
