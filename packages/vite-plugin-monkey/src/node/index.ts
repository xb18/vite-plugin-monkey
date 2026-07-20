import type { Plugin } from 'vite';
import factorys from './plugins/index.ts';
import { resolvedOption } from './utils/option.ts';
import type { MonkeyOption, ResolvedMonkeyOption } from './utils/types.ts';
import { dataUrl } from './utils/others.ts';
import type { InlinePreset } from 'unimport';
import { gmIdentifiers } from './utils/gmApi.ts';

export type * from './types.ts';
export * as cdn from './cdn.ts';

export default (pluginOption: MonkeyOption): Plugin[] => {
  let option: Promise<ResolvedMonkeyOption>;
  const getOption = () => {
    return (option ??= resolvedOption(pluginOption));
  };
  return factorys
    .map((f) => f(getOption, pluginOption))
    .filter(Boolean) as Plugin[];
};

/**
 * GM api preset when you use unimport or unplugin-auto-import
 *
 * Note, there is not comment in automatically generated unimport.d.ts/auto-imports.d.ts file
 */
const unimportPreset = {
  from: 'vite-plugin-monkey/dist/client',
  imports: ['GM', ...gmIdentifiers, 'unsafeWindow', 'monkeyWindow'],
} satisfies InlinePreset;

export const util = {
  dataUrl,
  unimportPreset,
};
