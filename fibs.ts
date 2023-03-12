import * as fibs from 'https://raw.githubusercontent.com/floooh/fibs/main/mod.ts'
//import * as fibs from '../fibs/mod.ts';

// a fibs project is defined by an export called 'projectDesc' of type 'fibs.ProjectDesc':
export const projectDesc: fibs.ProjectDesc = {
    name: 'fibs-test',

    // the only target in the project is an executable 'hello' which depends  on sokol and cimgui:
    targets: {
        hello: {
            type: 'windowed-exe',
            dir: 'src',
            sources: ['hello.c'],
            libs: ['sokol', 'cimgui'],
        },
    },

    // external dependencies can be pulled via git, but their project description
    // can be provided 'inline':
    imports: {
        sokol: {
            url: 'https://github.com/floooh/sokol',
            projectDesc: sokolDesc(),
        },
        cimgui: {
            url: 'https://github.com/cimgui/cimgui',
            ref: 'v1.89.3',
            projectDesc: cimguiDesc(),
        },
    }
}

function cimguiDesc(): fibs.ProjectDesc {
    return {
        targets: {
            cimgui: {
                type: 'lib',
                sources: [
                    'cimgui.cpp',
                    'cimgui.h',
                    'imgui/imgui_demo.cpp',
                    'imgui/imgui_draw.cpp',
                    'imgui/imgui_tables.cpp',
                    'imgui/imgui_widgets.cpp',
                    'imgui/imgui.cpp',
                    'imgui/imgui.h',
                ],
                includeDirectories: [ '.' ]
            }
        }
    }
}

function sokolDesc(): fibs.ProjectDesc {
    return {
        targets: {
            // header-only libs are declared as 'void' targets,
            // such targets may define include directories, compile options
            // etc... for other targets
            sokol: {
                type: 'void',
                includeDirectories: [ '.', './util' ],
                compileDefinitions: (context) => {
                    switch (context.config.platform) {
                        case 'windows':
                            return [ 'SOKOL_D3D11' ];
                        case 'macos':
                        case 'ios':
                            return [ 'SOKOL_METAL' ];
                        case 'emscripten':
                        case 'android':
                            return [ 'SOKOL_GLES3' ];
                        default:
                            return [ 'SOKOL_GLCORE33' ];
                    }
                },
                compileOptions: (context) => {
                    switch (context.config.platform) {
                        case 'macos':
                        case 'ios':
                            return ['-ObjC'];
                        default:
                            return [];
                    }
                },
                linkOptions: (context) => {
                    switch (context.config.platform) {
                        case 'emscripten':
                            return [ '-s', 'USE_WEBGL2=1'];
                        default:
                            return [];
                    }
                },
                libs: (context) => {
                    switch (context.config.platform) {
                        case 'macos':
                            return [
                                '-framework Foundation',
                                '-framework Cocoa',
                                '-framework QuartzCore',
                                '-framework Metal',
                                '-framework MetalKit',
                                '-framework AudioToolbox',
                            ];
                        default:
                            return [];
                    }
                }
            }
        }
    };
}