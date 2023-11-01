# fibs-test

A simple fibs test project building a Dear ImGui application.

## How to build and run

First, install Deno: https://docs.deno.com/runtime/manual/getting_started/installation

Next, clone, build and run like this:

```
git clone https://github.com/floooh/fibs-test
cd fibs-test
./fibs build
./fibs list target --exe
./fibs run hello
```

If anything goes wrong run `./fibs diag tools` and follow the instructions.

To build for Emscripten, first install the Emscripten SDK:

```
./fibs emsdk install
```

...then configure and build for Emscripten:

```
./fibs config emsc-make-release
./fibs build
./fibs list targets --exe
./fibs run hello
```