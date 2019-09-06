import 'zone.js/dist/zone-node';
import 'reflect-metadata';
import { enableProdMode } from '@angular/core';
import * as express from 'express';
import * as compression from 'compression';
import * as cookieparser from 'cookie-parser';
import { ngExpressEngine } from '@nguniversal/express-engine';
import { REQUEST, RESPONSE } from '@nguniversal/express-engine/tokens';
import { provideModuleMap } from '@nguniversal/module-map-ngfactory-loader'; // lazy loader
import * as domino from 'domino'; // ssr DOM
import * as fs from 'fs';
import * as path from 'path';
import * as bodyParser from 'body-parser';
import * as sourceMap from 'source-map-support'; // for debug
// import * as request from 'request';
import { ROUTES } from './static.paths'; // static path from prerenders

sourceMap.install(); // for test
enableProdMode();

const template = fs.readFileSync(path.join(__dirname, '.', 'dist', 'index.html')).toString(), // index from browser build!
    win = domino.createWindow(template), // for mock global window by domino
    files = fs.readdirSync(`${process.cwd()}/dist-server`), // from server build
    mainFiles = files.filter((file) => file.startsWith('main')), // get server main
    hash = mainFiles[0].split('.')[1], // with hash
    { AppServerModuleNgFactory, LAZY_MODULE_MAP } = require(`./dist-server/main.${hash}`), // main from server impl.
    PORT = process.env.PORT || 4000; // port

// not implemented property and functions
Object.defineProperty(win.document.body.style, 'transform', {
    value: () => ({
        enumerable: true,
        configurable: true,
    }),
});
global['window'] = win; // mock
global['document'] = win.document; // mock documnet
global['CSS'] = null; // othres mock
global['Prism'] = null; // global['XMLHttpRequest'] = require('xmlhttprequest').XMLHttpRequest;

export function redirect(req, res, next) {
    if (req.url === '/index.html') {
        // for domain/index.html
        return res.redirect(301, 'https://' + req.hostname);
    }

    if (req.headers['x-forwarded-proto'] !== 'https' &&
        req.hostname !== 'localhost') {
        // check if it is a secure (https) request
        // if not redirect to the equivalent https url

        if (req.url === '/robots.txt') {
            // special for robots.txt
            next();
            return;
        }
        return res.redirect('https://' + req.hostname + req.url);
    }

    // if (redirectowww && !req.hostname.startsWith('www.')) {
    //     res.redirect('https://www.' + req.hostname + req.url);
    // }
    //
    // if (wwwredirecto && req.hostname.startsWith('www.')) {
    //     const host = req.hostname.slice(4, req.hostname.length);
    //     res.redirect('https://' + host + req.url);
    // }

    // // for test
    // if (test && req.url === '/test/exit') {
    //     res.send('exit');
    //     exit(0);
    //     return;
    // }

    next();
}

// dynamic render
export function render(req, res) {
    global['navigator'] = req['headers']['user-agent'];     // mock navigator from req.
    const http = req.headers['x-forwarded-proto'] === undefined ? 'http' : req.headers['x-forwarded-proto'],
        url = req.originalUrl;

    console.time(`GET: ${url}`); // tslint:disable-line
    res.render(
        '../dist/index',
        {
            req: req,
            res: res,
            // provers from server
            providers: [
                // for http and cookies
                {
                    provide: REQUEST,
                    useValue: req,
                },
                {
                    provide: RESPONSE,
                    useValue: res,
                },
                // for absolute path
                {
                    provide: 'ORIGIN_URL',
                    useValue: `${http}://${req.headers.host}`,
                },
            ],
        },
        (err, html) => {
            if (err)
                throw err;

            console.timeEnd(`GET: ${url}`); // tslint:disable-line
            res.send(html);
        },
    );
}

const app = express();

app.engine(
    'html',
    ngExpressEngine({
        bootstrap: AppServerModuleNgFactory,
        providers: [provideModuleMap(LAZY_MODULE_MAP)],
    }),
);

app.use(compression()); // gzip
app.use(cookieparser()); // cokies
app.use(bodyParser.json()); // create application/json parser
app.use(redirect);

app.set('view engine', 'html'); // must
app.set('views', 'src');

app.get('*.*', express.static(path.join(__dirname, '.', 'dist'))); // all search
app.get(ROUTES, express.static(path.join(__dirname, '.', 'static'))); // static
app.get('*', render);

app.listen(PORT, () => console.log(`listening on http://localhost:${PORT}!`));
