import { RouterLink, RouterOutlet } from '@angular/router';
import { Component, effect, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import Keycloak, { KeycloakProfile } from 'keycloak-js';
import {
  HasRolesDirective,
  KEYCLOAK_EVENT_SIGNAL,
  KeycloakEventType,
  typeEventArgs,
  ReadyArgs
} from 'keycloak-angular';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, HasRolesDirective],
  templateUrl: './app.component.html'
})
export class AppComponent {
  public profile?: KeycloakProfile;
  authenticated = false;
  keycloakStatus: string | undefined;
  private readonly keycloak = inject(Keycloak);
  private readonly keycloakSignal = inject(KEYCLOAK_EVENT_SIGNAL);
  constructor() {
    effect(() => {
      const keycloakEvent = this.keycloakSignal();
      this.keycloakStatus = keycloakEvent.type;
      if (keycloakEvent.type === KeycloakEventType.Ready) {
        this.authenticated = typeEventArgs<ReadyArgs>(keycloakEvent.args);
      }
      if (keycloakEvent.type === KeycloakEventType.AuthLogout) {
        this.authenticated = false;
      }
    });
  }
  login() {
    this.keycloak.login();
  }
  logout() {
    this.keycloak.logout();
  }
}