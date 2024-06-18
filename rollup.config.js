export default {
    input: "index.js",
    output: [
        {
            file: "dist/index.cjs.js",
            format: "cjs",
            sourcemap: true,
            exports: "named",
        },
        {
            file: "dist/index.esm.js",
            format: "es",
            sourcemap: true,
        },
    ],
};
