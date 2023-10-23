import type { ICategory, IUser } from "$lib/interfaces";

export class AppState {
    token: string;
    user: IUser | object | any;
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
        token = '',
        user = {},
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
        this.token = token
        this.user = user
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

export class AccessToken {
    token: string;

    constructor({
        token = ''
    } = {}) {
        this.token = token
    }
}

export class Category {
    name: string;
    id: any;

    constructor({
        name = ''
    } = {}) {
        this.name = name
    }
}

export class Budget {
    id: any
    name: string
    status: boolean
    start: Date
    end: Date
    categories: [{
        amount: GLfloat,
        category: ICategory
    }] | any[]

    constructor({ id = undefined, name = '', start = new Date(), end = new Date(), categories = [] } = {}) {
        this.id = id
        this.name = name
        this.start = start
        this.end = end
        this.categories = categories
    }
}