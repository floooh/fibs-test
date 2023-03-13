import * as fibs from 'https://raw.githubusercontent.com/floooh/fibs/main/mod.ts'
//import * as fibs from '../fibs/mod.ts';

// a fibs project is defined by an export called 'projectDesc' of type 'fibs.ProjectDesc':
export const projectDesc: fibs.ProjectDesc = {
    name: 'fibs-test',

    // override some defaults (fibs sets the C standard to C99, but cimgui needs C11)
    variables: {
        CMAKE_C_STANDARD: '11',
    },

    // increase warning levels
    compileOptions: (context) => {
        if (context.compiler === 'msvc') {
            return [ '/W4' ];
        } else {
            return [ '-Wall', '-Wextra' ];
        }
    },

    // on Emscripten, use our custom shell.html for all exe targets
    linkOptions: (context) => {
        if (context.config.platform === 'emscripten') {
            return [ '--shell-file', '@root/src/shell.html' ];
        } else {
            return [];
        }
    },

    // external dependencies can be pulled via git, but their project description
    // can be provided 'inline' (alternatively they can reside in a 'fibs.ts' file
    // in the pulled git repo)
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
    },

    // the only target in the project is an executable 'hello' which depends on sokol and cimgui:
    targets: {
        hello: {
            type: 'windowed-exe',
            dir: 'src',
            sources: ['hello.c'],
            libs: ['sokol', 'cimgui'],
        },
    },
}

// these are helper functions to provide inline project definitions for
// cimgui and sokol, these could also be directly be declared in
// the root project description above, but that way the root description
// isn't so cluttered
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
                includeDirectories: {
                    public: [ '.' ]
                },
                compileOptions: {
                    private: (context) => {
                        if (context.compiler === 'gcc') {
                            return ['-Wno-stringop-overflow'];
                        } else {
                            return [];
                        }
                    }
                }
            }
        }
    }
}

function sokolDesc(): fibs.ProjectDesc {
    return {
        targets: {
            // header-only libs can be declared as 'interface' targets,
            // such targets may define include directories, compile options
            // etc... for other targets but don't produce a build artefact
            sokol: {
                type: 'interface',
                includeDirectories: {
                    interface: [ '.', './util' ]
                },
                compileDefinitions: {
                    interface: (context) => {
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
                    }
                },
                compileOptions: {
                    interface: (context) => {
                        switch (context.config.platform) {
                            case 'macos':
                            case 'ios':
                                return ['-ObjC'];
                            case 'linux':
                                return ['-pthread'];
                            default:
                                return [];
                        }
                    }
                },
                linkOptions: {
                    interface: (context) => {
                        switch (context.config.platform) {
                            case 'emscripten':
                                return [ '-sUSE_WEBGL2=1', "-sMALLOC='emmalloc'" ];
                            case 'linux':
                                return [ '-pthread', '-lpthread' ];
                            default:
                                return [];
                        }
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
                        case 'linux':
                            return [ 'X11', 'Xi', 'Xcursor', 'GL', 'asound' ];
                        default:
                            return [];
                    }
                }
            }
        }
    };
}