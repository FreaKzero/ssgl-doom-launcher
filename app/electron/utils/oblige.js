import { spawn } from 'child_process';
import { existsSync, readdirSync, statSync } from 'fs';
import { platform } from 'os';
import { dirname } from 'path';

import { getJSON } from './json';

const oblige = async () => {
  try {
    const settings = await getJSON('settings');
    const params = ['--install', dirname(settings.obligepath)];
    console.log(dirname(settings.obligepath));
  } catch (e) {
    return {
      data: null,
      error: e.message
    };
  }
};

export default oblige;
