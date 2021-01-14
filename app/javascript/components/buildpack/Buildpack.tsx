export interface Buildpack {
    addr: string;
    description: string;
    name: string;
    namespace: string;
    version: string;
    yanked: boolean;
}
