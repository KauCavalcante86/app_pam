import { registerRootComponent } from 'expo';

import backCadastro from './assets/background.png'
import backSplash from './assets/backSplash.png'
import backLogin from './assets/backLogin.png'
import a from './assets/adaptive-icon.png'
import b from './assets/favicon.png'
import c from './assets/icon.png'
import d from './assets/splash-icon.png'
import e from './assets/userImage.png'

import App from './App';

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App);
