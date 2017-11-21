import path from 'path';

const project_dir = path.dirname(__dirname);

export const root = {
    src: path.join(project_dir, 'src'),
    dist: path.join(project_dir, 'dist'),
    tmp: path.join(project_dir, 'tmp')
}

export const paths = {
    src: {
        root: root.src,
        html: path.join(root.src, 'html'),
        js: path.join(root.src, 'js'),
        css: path.join(root.src, 'css'),
        static: path.join(root.src, 'static'),
        components: path.join(root.src, 'components')
    },
    dist: {
        root: root.dist,
        js: path.join(root.dist, 'js'),
        css: path.join(root.dist, 'css'),
        font: path.join(root.dist, 'fonts')
    },
    node: {
        modules: `${project_dir}/node_modules`
    }
}
export const resource = {
    src: {
        pug: path.join(paths.src.html, '/**/*.pug'),
        webpack: {
            babel: path.join(paths.src.js, '/entry/**/*.js')
        },
        sass: path.join(paths.src.root, '/**/*.s+(a|c)ss'),
        static: path.join(paths.src.static, '/**/*.*'),
        components: paths.src.components
    },
    vendor: {
        js: {
            jquery: `${paths.node.modules}/jquery/dist/jquery.js`,
            lodash: `${paths.node.modules}/lodash/lodash.js`,
            moment: `${paths.node.modules}/moment/moment.js`,
            flatpickr: `${paths.node.modules}/flatpickr/dist/flatpickr.js`,
            vue: `${paths.node.modules}/vue/dist/vue.js`,
            bootstrap: `${paths.node.modules}/bootstrap-sass/assets/javascripts/bootstrap.js`
        },
        css: [`${paths.node.modules}/flatpickr/dist/flatpickr.min.css`],
        fontawesome: `${paths.node.modules}/font-awesome/fonts/**/*`
    }
}
