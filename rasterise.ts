#!/usr/bin/env node
import fs from "node:fs/promises";
import path from "node:path";
import url from "node:url";
import assert from 'node:assert';
import crypto from "node:crypto";
import puppeteer from "puppeteer";
import webp from "napi-webp-animation";
import sharp from "sharp";

const options = Object.fromEntries(process.argv.slice(2).reduce((a, i) => {
	if (i.startsWith('-'))
		a.push([i]);
	else {
		const collection = a.at(-1);
		
		if (collection.length == 1)
			collection.push(i);
		else
			collection[1] = Array.isArray(collection[1]) ? [...collection[1], i] : [collection[1], i];
	};
	
	return a;
}, []));

if ('--help' in options || process.argv.length <= 2) {
	console.log(`
SVG Renderer:
	Converts a bunch of SVG files into individual frames in WebP format, and unifies them into animated WebPs.
	
Options:
	Option       Abbr Parameter Default    Description
	--framerame  -r   <int>     30         The framerate to render the images at
	--frames     -f   <int>     600        The amount of frames to render
	--sizes      -s   <int[]>   []         An array of resolutions to render each frame at. Images are always square, so only a single dimension is required (eg. --sizes 64 1024)
	--source          <path>    ./         The directory containing the SVGs
	--output          <path>    ./out      Where the final animated WebPs are dumped.
	--samples         <int>     64         The number of samples used to compare frames
	
	--help                                 Prints this help message and exits.
`);
	process.exit(0);
}

// Settings ----------------------------
const FRAMERATE = Number(options['--framerate'] || options['-r']) || 30;             // frames/sec
const FRAMES = Number(options['--frames'] || options['-f']) || 600;                  // frames
const SIZES = [options['--sizes'] || options['-s']].flat().map(i => Number(i));      // output resolutions
const SVG_DIR = await fs.realpath(options['--source'] ?? process.cwd())              // directory to scan
const OUTPUT = await fs.realpath(options['--output'] ?? path.join(SVG_DIR, 'out'));  // where the resulting files are dumped
const SAMPLES = Number(options['--samples']) || 64;
// -------------------------------------

async function renderSvgFrames(browser, file) {
	const basename = path.basename(file, ".svg");

	const page = await browser.newPage();

	// Transparent background
	await page._client().send(
		"Emulation.setDefaultBackgroundColorOverride",
		{ color: { r: 0, g: 0, b: 0, a: 0 } }
	);

	await page.goto(url.pathToFileURL(file));
	await page.evaluate(() => document.documentElement.pauseAnimations?.());

	console.log(`→ Rendering ${basename}`);

	await fs.mkdir(path.join(OUTPUT, basename), { recursive: true });

	for (const size of SIZES) {
		await page.setViewport({
			width: size,
			height: size,
			deviceScaleFactor: 1
		});
		
		const encoder = new webp.WebpEncoder(size, size);
		encoder.setFrameRate(FRAMERATE);
		
		await page.evaluate(t => document.documentElement.setCurrentTime(t), 0);
		
		const firstFrame = await page.screenshot({ type: "png", omitBackground: true })
			.then(img => sharp(img).raw().toBuffer({ resolveWithObject: true }))
			.then(img => crypto.hash('sha256', img.data));
		
		let f;
		for (f = 0; f < FRAMES; f++) {
			// render frame into buffer
			const buf = await page.screenshot({ type: "png", omitBackground:true });
			const img = await sharp(buf).raw().toBuffer({ resolveWithObject: true });
			
			encoder.addFrame(img.data);
			
			await page.evaluate(t => document.documentElement.setCurrentTime(t), f * (1 / FRAMERATE));
			
			if (f > 2 && firstFrame == crypto.hash('sha256', img.data)) break;
		}
		
		await encoder.writeToFile(`${OUTPUT}/${basename}/${size}.webp`, {
			lossless: true,
			quality: 100,
			loopCount: 0
		});
	
		console.log(`  size ${size} rendered (${f} frames = ${Math.ceil(f / FRAMERATE)}s).`);
	}

	await page.close();
}

const browser = await puppeteer.launch({
	headless: "new",
	executablePath: "/usr/bin/chromium",
	args: ["--disable-gpu", "--no-sandbox"]
});

const files = Array.from(await (fs.readdir(SVG_DIR)))
	.filter(f => f.endsWith(".svg"))
	.map(f => path.join(SVG_DIR, f));

if (files.length === 0) {
	console.error("No SVG files found.");
	process.exit(1);
}

await fs.mkdir(OUTPUT, { recursive: true });

for (const file of files)
	await renderSvgFrames(browser, file);

await browser.close();
