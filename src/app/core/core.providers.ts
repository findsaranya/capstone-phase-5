import { APP_INITIALIZER, Provider } from "@angular/core";
import { AuthService } from "./auth.service";
import { AppInitService } from "./app.init.service";

 function initializeApp(appInitService: AppInitService) :(() =>Promise<void>){
    return (): Promise<void> => { 
        return appInitService.init();
      }
  }

export const coreProviders :Provider[] = [
    AuthService,
    AppInitService,
    {
        provide : APP_INITIALIZER,
        useFactory:initializeApp,
        multi:true,
        deps:[AppInitService]
    }
]