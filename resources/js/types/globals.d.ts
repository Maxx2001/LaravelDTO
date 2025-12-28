/// <reference types="vite/client" />

import type { route as routeFn } from 'ziggy-js';

declare global {
    const route: typeof routeFn;
}

interface ImportMetaEnv {
    readonly VITE_APP_NAME: string;
    [key: string]: string | boolean | undefined;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
