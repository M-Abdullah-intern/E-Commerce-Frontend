import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";

import "./index.css";

import Providers from "./app/providers";
import { router } from "./app/router";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <Providers>
        <RouterProvider router={router} />
    </Providers>
);