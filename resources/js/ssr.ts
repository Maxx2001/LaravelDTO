import type { SharedData } from '@/types';
import { createInertiaApp } from '@inertiajs/vue3';
import createServer from '@inertiajs/vue3/server';
import { renderToString } from '@vue/server-renderer';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import type { DefineComponent } from 'vue';
import { createSSRApp, h } from 'vue';
import { route as ziggyRoute } from 'ziggy-js';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createServer((page) =>
    createInertiaApp({
        page,
        render: renderToString,
        title: (title) => `${title} - ${appName}`,
        resolve: (name) =>
            resolvePageComponent(`./pages/${name}.vue`, import.meta.glob<DefineComponent>('./pages/**/*.vue')),
        setup({ App, props, plugin }) {
            const app = createSSRApp({ render: () => h(App, props) });

            // Configure Ziggy for SSR...
            const pageProps = page.props as unknown as SharedData;
            const ziggyConfig = {
                ...pageProps.ziggy,
                location: new URL(pageProps.ziggy.location),
            };

            // Create route function for SSR...
            const routeFn = (name: string, params?: Record<string, unknown>, absolute?: boolean): string =>
                ziggyRoute(name, params, absolute, ziggyConfig);

            // Make route function available globally...
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            app.config.globalProperties.route = routeFn as any;

            // Make route function available globally for SSR...
            if (typeof window === 'undefined') {
                (globalThis as Record<string, unknown>).route = routeFn;
            }

            app.use(plugin);

            return app;
        },
    }),
);
