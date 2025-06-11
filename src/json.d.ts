// This file tells TypeScript how to handle JSON imports
declare module '*.json' {
  const value: any;
  export default value;
} 