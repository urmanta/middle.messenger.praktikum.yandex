import { JSDOM } from 'jsdom';
import { useFakeXMLHttpRequest } from 'sinon';

const jsdom = new JSDOM(`<body></body>`);

global.window = jsdom.window;
global.document = jsdom.window.document;
global.history = jsdom.window.history;
global.Node = jsdom.window.Node;
global.MouseEvent = jsdom.window.MouseEvent;
global.FormData = jsdom.window.FormData;
global.XMLHttpRequest = useFakeXMLHttpRequest();
