import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { add, ellipse, home, person, playCircle, search, square, triangle } from 'ionicons/icons';
import Home from './pages/Home';
import Search from './pages/Search';
import Myspace from './pages/Signin';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import React from 'react';
import AddPro from './pages/AddPro';
import { AuthGate } from './components/AuthGate';
import CardExamples from './pages/Sandbox';

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          <Route exact path="/home">
            <Home />
          </Route>
          <Route exact path="/search">
            <Search />
          </Route>
          <Route exact path="/add">
            <AddPro />
          </Route>
          <Route path="/myspace">
            <AuthGate />
          </Route>
          <Route exact path="/">
            <Redirect to="/home" />
          </Route>
          <Route exact path="/sandbox">
           <CardExamples />
          </Route>

        </IonRouterOutlet>
        <IonTabBar slot="bottom">
          <IonTabButton tab="home" href="/home">
            <IonIcon icon={home} />
            <IonLabel>Accueil</IonLabel>
          </IonTabButton>
          <IonTabButton tab="search" href="/search">
            <IonIcon icon={search} />
            <IonLabel>Rechercher</IonLabel>
          </IonTabButton>
          <IonTabButton tab="add" href="/add">
            <IonIcon icon={add} />
            <IonLabel>Ajouter</IonLabel>
          </IonTabButton>
          <IonTabButton tab="myspace" href="/myspace">
            <IonIcon icon={person} />
            <IonLabel>Mon espace</IonLabel>
          </IonTabButton>
          <IonTabButton tab="sandbox" href="/sandbox">
            <IonIcon icon={playCircle} />
            <IonLabel>Sandbox</IonLabel>
          </IonTabButton>

        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  </IonApp>
);

export default App;
