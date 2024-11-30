
import { Lobby } from './lobby/Lobby';


const tag_root = document.querySelectorWithCheck('div#root', HTMLDivElement);
const lobby    = new Lobby(tag_root);

lobby.initialize();

(window as any).kotonai_lobby = lobby;
