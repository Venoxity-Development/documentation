import env from '@next/env';

env.loadEnvConfig(process.cwd());

async function main() {
  // todo: add content
  // await Promise.all([updateSearchIndexes(), updateOramaAi()]);
}

await main().catch((e) => {
  console.error('Failed to run post build script', e);
});
