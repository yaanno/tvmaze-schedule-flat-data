# Fun with TVMaze & Octo/Flat & Deno

A very simple data fetching and processing example to harvest a daily (global) TV/Stream schedule from TVMaze.

## Why

Exercise :) But I'm actually using the processed file by fetching `tvmaze-schedule-processed.json` locally. And `flat` basically can grab anything ...

## How

- Set up a flat action on GitHub via `Flat.yml`
- I used a daily cron tab
- In the `process.ts` I simply go thru the ~10Mb json file distilling it down to the bare essentials
- An other example in `process.ts` is a Genre->ItemId catalog processing

## Used

- [Octo Flat](https://github.com/githubocto/flat)
- [Deno](https://github.com/denoland/deno)
- [Json2Ts](http://www.json2ts.com/)
