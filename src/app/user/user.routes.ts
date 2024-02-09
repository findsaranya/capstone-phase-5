import { Route } from "@angular/router";
import { nonUserGuard, userGuard } from "../core";
import { Role } from "../shared";

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
                canActivate:[nonUserGuard],
                loadComponent : () => import("./login/login.component").then(c => c.LoginComponent)
            },
            {
                path:"register",
                canActivate:[nonUserGuard],
                loadComponent : () => import("./register/register.component").then(c => c.RegisterComponent)
            },
            {
                path:"movies",
                canActivate:[userGuard],
                data:{role:Role.USER},
                loadComponent : () => import("./movies/movies.component").then(c=> c.MoviesComponent)
            },
            {
                path:"logout",
                canActivate:[userGuard],
                data:{role:Role.USER},
                loadComponent : () => import("./logout/logout.component").then(c=> c.LogoutComponent)
            }
        ]
    },
  
] satisfies Route[]