/*
 * Guidelines used: https://github.com/Microsoft/TypeScript/wiki/Coding-guidelines
 */
import './css/site.css';
import 'bootstrap';
import 'reflect-metadata';
import { AppContext } from "./AppContext";

// Setup the context for the current app.
const context = new AppContext();

import { StoreFrontModule } from './utils/StoreFrontModule';
import { StoreFront } from "./components/StoreFront";

// Bind the modules for this app and...
// Start the app!
const container = context
    .runModules(new StoreFrontModule())
    .start(StoreFront);