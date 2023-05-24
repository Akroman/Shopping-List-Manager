import { createBrowserRouter, RouterProvider, LoaderFunction, ActionFunction } from "react-router-dom";
import { Layout } from "./routes/Layout";
import { Overview, overviewLoader } from "./routes/List/Overview";
import { Create, createAction } from "./routes/List/Create";
import { Manage, manageAction, listLoader, ManageLoaderData } from "./routes/List/Manage";
import { Edit, editAction } from "./routes/List/Edit";
import { deleteListAction } from "./routes/List/Delete";
import { deleteListItemAction } from "./routes/ListItem/Delete";
import { editListItemAction } from "./routes/ListItem/Edit";

export default function App() {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <Layout />,
            handle: {
                crumb: () => "Nákupní seznamy"
            },
            children: [
                {
                    index: true,
                    element: <Overview />,
                    loader: overviewLoader
                },
                {
                    path: "/list",
                    children: [
                        {
                            path: "/list/create",
                            element: <Create />,
                            action: createAction,
                            handle: {
                                crumb: () => "Vytvoření nového seznamu",
                                title: "Vytvoření nového seznamu"
                            }
                        },
                        {
                            path: "/list/manage/:listId",
                            element: <Manage />,
                            loader: (listLoader as unknown) as LoaderFunction,
                            action: (manageAction as unknown) as ActionFunction,
                            handle: {
                                crumb: ({ list }: ManageLoaderData) => `Položky seznamu "${list.name}"`,
                                title: "Položky seznamu"
                            }
                        },
                        {
                            path: "/list/edit/:listId",
                            element: <Edit />,
                            loader: (listLoader as unknown) as LoaderFunction,
                            action: (editAction as unknown) as ActionFunction,
                            handle: {
                                crumb: ({ list }: ManageLoaderData) => `Úprava "${list.name}"`,
                                title: "Úprava seznamu"
                            }
                        },
                        {
                            path: "/list/delete/:listId",
                            action: (deleteListAction as unknown) as ActionFunction
                        }
                    ]
                },
                {
                    path: "/listItem",
                    children: [
                        {
                            path: "/listItem/delete/:itemId/:listId",
                            action: (deleteListItemAction as unknown) as ActionFunction
                        },
                        {
                            path: "/listItem/edit/:itemId/:listId",
                            action: (editListItemAction as unknown) as ActionFunction
                        }
                    ]
                }
            ]
        }
    ]);

    return <RouterProvider router={router} />;
}