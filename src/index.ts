import './styles/style.scss';

import { AppMessage, ComponentMessage } from './lib/appMessages';
import { AppState } from './lib/appState';
import { render } from './views/renderState';
import { ClientInfo } from '@kosy/kosy-app-api/types';
import { KosyApi } from '@kosy/kosy-app-api';

module Kosy.Integration.Witeboard {
    export class App {
        private state: AppState = {};
        private initializer: ClientInfo;
        private currentClient: ClientInfo;

        private kosyApi = new KosyApi<AppState, AppMessage, AppMessage>({
            onReceiveMessageAsClient: (message) => this.processMessage(message),
            onReceiveMessageAsHost: (message) => message,
            onRequestState: () => this.getState(),
            onProvideState: (newState: AppState) => this.setState(newState)
        })

        public async start() {
            let initialInfo = await this.kosyApi.startApp();
            this.initializer = initialInfo.clients[initialInfo.initializerClientUuid];
            this.currentClient = initialInfo.clients[initialInfo.currentClientUuid];
            this.state = initialInfo.currentAppState ?? this.state;
            this.renderComponent();

            window.addEventListener("message", (event: MessageEvent<ComponentMessage>) => {
                this.processComponentMessage(event.data)
            });
        }

        public setState(newState: AppState) {
            this.state = newState;
            this.renderComponent();
        }

        public getState() {
            return this.state;
        }

        public processMessage(message: AppMessage) {
            switch (message.type) {
                default:
                    break;
            }
        }

        private processComponentMessage(message: ComponentMessage) {
            switch (message.type) {
                default:
                    break;
            }
        }

        //Poor man's react, so we don't need to fetch the entire react library for this tiny app...
        private renderComponent() {
            render({
                currentClient: this.currentClient,
                initializer: this.initializer,
            });
        }

        private log(...message: any) {
            console.log(`${this.currentClient?.clientName ?? "New user"} logged: `, ...message);
        }
    }

    new App().start();
}