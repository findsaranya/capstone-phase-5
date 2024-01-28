import { Route } from "@angular/router";
import { AdminComponent } from "./admin.component";

export default [{
    path: "",
    component: AdminComponent,
    children : [
        {
            path:"",
            loadComponent : () => import("./login/login.component").then(c => c.LoginComponent)
        }
    ]
}] satisfies Route[];