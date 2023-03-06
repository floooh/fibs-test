import * as fibs from 'https://raw.githubusercontent.com/floooh/fibs/main/mod.ts'
// import * as fibs from '../fibs/mod.ts';

export const projectDesc: fibs.ProjectDesc = {
    name: 'fibs-test',

    targets: {
        hello: {
            type: 'plain-exe',
            dir: 'src',
            sources: ['hello.c'],
            libs: ['print'],
        },
        // a simple local library
        print: {
            type: 'lib',
            dir: 'src/lib',
            sources: ['print.c', 'print.h'],
            includeDirectories: ['.'],
        },
    }
}