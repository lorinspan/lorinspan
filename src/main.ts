import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { AppComponent } from "./app/app.component";
import { routes } from "./app/app.routes";

// ✅ Importuri Firebase corecte
import { firebaseConfig } from "./app/model/environment";
import {provideFirebaseApp} from "@angular/fire/app";
import {initializeApp} from "firebase/app";
import {getFirestore, provideFirestore} from "@angular/fire/firestore";

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),

    // 🔥 Import Firebase folosind importProvidersFrom() pentru a evita erorile de injectare
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideFirestore(() => getFirestore()),
  ]
}).catch(err => console.error(err));
