import * as fibs from 'https://raw.githubusercontent.com/floooh/fibs/main/mod.ts'
//import * as fibs from '../fibs/mod.ts';

export const projectDesc: fibs.ProjectDesc = {
    name: 'fibs-test',

    // define a couple of remote imports
    imports: {
        sokol: {
            url: 'https://github.com/floooh/sokol',
            projectDesc: {
                targets: {
                    // header-only libs are declared as 'void' targets,
                    // such targets may define include directories, compile options
                    // etc... for other targets
                    sokol: { type: 'void', includeDirectories: [ '.', './util' ] }
                }
            }
        },
        imgui: {
            url: 'https://github.com/ocornut/imgui',
            ref: 'v1.88',
            // an import can either have a fibs.ts file in its root directory, or
            // we can just provide an 'inline' project description here,
            // or without both an import can also just provide a couple of files
            // from a remote source
            projectDesc: {
                targets: {
                    imgui: {
                        type: 'lib',
                        sources: [
                            'imgui_demo.cpp',
                            'imgui_draw.cpp',
                            'imgui_tables.cpp',
                            'imgui_widgets.cpp',
                            'imgui.cpp',
                            'imgui.h',
                        ],
                        includeDirectories: [ '.' ]
                    }
                }
            }
        },
    },

    targets: {
        hello: {
            type: 'plain-exe',
            dir: 'src',
            sources: ['hello.c'],
            libs: ['sokol', 'print', 'imgui'],
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