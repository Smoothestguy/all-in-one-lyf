import { Application, Frame } from '@nativescript/core';
import { categories } from './models/service.model';

// Make data globally available
global.categories = categories;

Application.run({ moduleName: 'app-root' });

// Set default animation after application starts
Frame.defaultAnimatedNavigation = true;