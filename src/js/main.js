import '../styles/tokens.css';
import '../styles/base.css';
import '../styles/layout.css';
import '../styles/components.css';
import '../styles/motion.css';

import { initHeader } from './modules/nav.js';
import { initTabs } from './modules/tabs.js';
import { initCurrency } from './modules/pricing.js';
import { initFilters } from './modules/filter.js';
import { initToTop, initSubnav } from './modules/scroll.js';
import { initContactForm } from './modules/contact.js';
import { initTrialForm } from './modules/trial.js';
import { initMotion } from './motion/index.js';

// Each initialiser is a no-op when its markup isn't on the page. Function
// first, motion last: menus and forms must work even if GSAP fails to load.
initHeader();
initTabs();
initCurrency();
initFilters();
initToTop();
initSubnav();
initContactForm();
initTrialForm();
initMotion();
