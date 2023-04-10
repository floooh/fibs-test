import * as fibs from 'https://raw.githubusercontent.com/floooh/fibs/main/mod.ts'
//import * as fibs from '../fibs/mod.ts';

export const project: fibs.ProjectDesc = {
    name: 'fibs-test',
    imports: {
        libs: {
            url: 'https://github.com/floooh/fibs-libs',
            import: [ 'cimgui.ts', 'sokol.ts' ],
        },
        utils: {
            url: 'https://github.com/floooh/fibs-utils',
            import: [ 'stdoptions.ts', 'copyfiles.ts', 'embedfiles.ts' ]
        }
    },
    targets: {
        hello: {
            type: 'windowed-exe',
            dir: 'src',
            sources: () => [ 'hello.c' ],
            libs: () => ['sokol-autoconfig', 'cimgui'],
            jobs: [
                {
                    job: 'copyfiles',
                    args: {
                        srcDir: '@targetsources:assets',
                        files: [ 'bla.png', 'blub.png' ],
                    }
                }
            ]
        },
    }
}
