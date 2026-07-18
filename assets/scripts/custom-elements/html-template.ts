/** Raw template to introduce HTML syntax highlighting */
export const html = (strings: TemplateStringsArray, ...values: unknown[]) =>
    String.raw({ raw: strings }, ...values);
