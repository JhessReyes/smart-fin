
export class AppState {
    title: string;
    icon: string;
    subtitle: string;
    module: string;
    theme: boolean;
    description: string;
    image: string;
    status: number;
    loading: boolean;
    collapsed: boolean;
    libraries: { google: boolean; };
    settings: { modules: {}; };

    constructor({
        title = 'Inicio',
        icon = 'home',
        subtitle = '',
        module = 'Home',
        theme = true,
        description = 'descripcion',
        image = '',
        status = 200,
        loading = false,
        collapsed = false,
        libraries = {
            google: false
        },
        settings = {
            modules: {}
        }
    } = {}) {
        this.title = title
        this.icon = icon
        this.subtitle = subtitle
        this.module = module
        this.theme = theme
        this.description = description
        this.image = image
        this.status = status
        this.loading = loading
        this.collapsed = collapsed
        this.libraries = libraries
        this.settings = settings
    }
}