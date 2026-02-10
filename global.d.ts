import React from 'react';

// Global type declarations for React components
declare global {
  // Just empty object
  type EmptyObj = Record<string, unknown>;
  // Any object
  type AnyObj = Record<string, any>;
  // Any function
  export type AnyFn<RT = any> = (...args: any[]) => RT;
  // Form action
  export type AnyFormAction<RT = any> = (formData: FormData) => romise<[RT, null]>;
  // React fn component with children
  type FC<T = object> = React.FunctionComponent<React.PropsWithChildren<T>>;
  // React fn component without children
  type RC<T = object> = React.FunctionComponent<T>;
  // Get available props from element (e.g. button, input, div, etc.)
  type ComponentProps<T> = React.ComponentProps<T>;
  // Note: PageProps is now globally provided by Next.js 16 in .next/types/routes.d.ts
  // Usage: PageProps<'/blog/[slug]'> - pass the route path as type parameter
}
