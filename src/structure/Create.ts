type ModuleConfig = {
    slash_commands?: boolean;
};

let config: ModuleConfig = {};

export function create(module: ModuleConfig) {
    config = { ...module };
}

export function getConfig() {
    return config;
}