export interface RouteHandle {
    readonly crumb?: (data: unknown) => string;
    readonly title?: string;
}