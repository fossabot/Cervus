import "bootstrap";
import "reflect-metadata";
import "./css/site.css";
import { ReactAppStarter } from "./ReactAppStarter";

// Setup the context for the current app.
const starter = new ReactAppStarter("storeFront-app",
    "./ioc/StoreFrontModule", "StoreFrontModule");

// Start the app!
starter.start();
