export interface User {
    id: number
    email: string
    institution_picture: string
    profile_picture: string
    active: boolean
}

export interface Auth {
    email: string
    password: string
}
