
import { Initializer } from './initializer/Initializer';


const tag_root    = document.querySelectorWithCheck('div#root', HTMLDivElement);
const initializer = new Initializer(tag_root);

initializer.initialize();

(window as any).kotonai_initializer = initializer;
