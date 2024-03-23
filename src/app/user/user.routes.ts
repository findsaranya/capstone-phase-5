import { Route } from "@angular/router";
import { nonUserGuard, userGuard } from "../core";
import { Role, SharedService } from "../shared";
import { RegisterService } from "./register";
import { GenreService } from "../admin/genre";
import { MovieService } from "../admin/movie";
import { BookedSeatService } from "./book-seats/book-seats.service";

export default [
    {
        path: "",
        loadComponent: () => import("./user.component").then(c => c.UserComponent),
        children : [
            {
                path:"",
                providers:[GenreService,MovieService,SharedService],
                canActivate:[nonUserGuard],
                loadComponent : () => import("./home/home.component").then(c => c.HomeComponent),
                children:[
                    {
                     path:"",
                     loadComponent:() => import("./carousel/carousel.component").then(c => c.CarouselComponent)
                    },
                    {
                    path:"genre/:genreId",
                    loadComponent : () => import("./gere-movies/gere-movies.component").then(c => c.GereMoviesComponent)
                }]
            },
            {
                path:"login",
                canActivate:[nonUserGuard],
                loadComponent : () => import("./login/login.component").then(c => c.LoginComponent)
            },
            {
                path:"register",
                canActivate:[nonUserGuard],
                providers:[RegisterService],
                loadComponent : () => import("./register/register.component").then(c => c.RegisterComponent)
            },
            {
                path:"movies",
                canActivate:[userGuard],
                providers:[SharedService,GenreService],
                data:{role:Role.USER},
                loadComponent : () => import("./movies/movies.component").then(c=> c.MoviesComponent)
            },
            {
                path:"dashboard",
                canActivate:[userGuard],
                providers:[GenreService,MovieService],
                data:{role:Role.USER},
                loadComponent:() => import("./dashboard/dashboard.component").then(c=> c.DashboardComponent)
            },
            {
                path:"book-tickets",
                canActivate:[userGuard],
                providers:[GenreService,MovieService],
                data:{role:Role.USER},
                loadComponent:() => import("./book-tickets/book-tickets.component").then(c=> c.BookTicketsComponent)
            },
            {
                path:"book-seats",
                canActivate:[userGuard],
                providers:[GenreService,MovieService,BookedSeatService],
                data:{role:Role.USER},
                loadComponent:() => import("./book-seats/book-seats.component").then(c=> c.BookSeatsComponent)
            },
            {
                path:"payment",
                canActivate:[userGuard],
                providers:[BookedSeatService],
                data:{role:Role.USER},
                loadComponent:() => import("./payment/payment.component").then(c=> c.PaymentComponent)
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