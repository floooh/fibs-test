import * as fibs from 'https://deno.land/x/fibs@v1.0.0/mod.ts'
//import * as fibs from '../fibs/mod.ts';

if (import.meta.main) fibs.main();

export const project: fibs.ProjectDesc = {
    name: 'fibs-test',
    imports: [
        {
            name: 'platforms',
            url: 'https://github.com/floooh/fibs-platforms',
            import: [ 'emscripten.ts' ],
        },
        {
            name: 'libs',
            url: 'https://github.com/floooh/fibs-libs',
            import: [ 'cimgui.ts', 'sokol.ts' ],
        },
        {
            name: 'utils',
            url: 'https://github.com/floooh/fibs-utils',
            import: [ 'stdoptions.ts' ],
        }
    ],
    targets: [
        {
            name: 'hello',
            type: 'windowed-exe',
            sources: () => [ 'hello.c' ],
            libs: () => ['sokol-autoconfig', 'cimgui'],
        },
    ]
}
