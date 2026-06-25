// CSS imported with Vite's `?inline` query resolves to the stylesheet text as a string.
declare module '*.css?inline' {
  const css: string;
  export default css;
}
