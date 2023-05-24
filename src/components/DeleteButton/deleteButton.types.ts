import { PropsWithChildren } from "react";

export interface DeleteButtonProps extends PropsWithChildren {
    readonly action: string;
    readonly confirmText: string;
}