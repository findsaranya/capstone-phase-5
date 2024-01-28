import { Route } from "@angular/router";

export default [
    {
        path: "",
        loadComponent: () => import("./user.component").then(c => c.UserComponent),
        children : [
            {
                path:"",
                loadComponent : () => import("./home/home.component").then(c => c.HomeComponent)
            },
            {
                path:"login",
                loadComponent : () => import("./login/login.component").then(c => c.LoginComponent)
            },
            {
                path:"register",
                loadComponent : () => import("./register/register.component").then(c => c.RegisterComponent)
            }
        ]
    },
  
] satisfies Route[]