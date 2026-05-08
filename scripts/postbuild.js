const fs = require('fs-extra');
const path = require('path');

async function postBuild() {
  const rootDir = path.join(__dirname, '..');
  const distDir = path.join(rootDir, '.next');
  const standaloneDir = path.join(distDir, 'standalone');
  
  // Standalone mode in Next.js
  // expects assets in .next/standalone/.next
  const targetDist = path.join(standaloneDir, '.next');

  try {
    // 1. Copy static assets
    const staticSrc = path.join(distDir, 'static');
    const staticDest = path.join(targetDist, 'static');
    if (fs.existsSync(staticSrc)) {
      await fs.copy(staticSrc, staticDest);
      console.log('✅ Copied static assets to standalone');
    }

    // 2. Copy public folder
    const publicSrc = path.join(rootDir, 'public');
    const publicDest = path.join(standaloneDir, 'public');
    if (fs.existsSync(publicSrc)) {
      await fs.copy(publicSrc, publicDest);
      console.log('✅ Copied public assets to standalone');
    }

    console.log('🚀 Standalone build optimization complete!');
  } catch (err) {
    console.error('❌ Post-build failed:', err);
    process.exit(1);
  }
}

postBuild();
