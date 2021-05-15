module.exports = {
    webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
        // Fixes npm packages that depend on `fs` module
        if (!isServer) {
            config.node = {
                fs: 'empty',
                module : 'empty',
                child_process: 'empty',
                net: 'empty'
            }
        }

        return config
    }
}