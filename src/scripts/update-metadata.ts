import { Octokit } from '@octokit/rest';
import { readFileSync, writeFileSync } from 'fs';
import { readdirSync } from 'fs';
import { join } from 'path';
import type { Tool } from '../types/tool';

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN
});

async function updateToolMetadata(toolPath: string): Promise<void> {
  const tool: Tool = JSON.parse(readFileSync(toolPath, 'utf-8'));

  if (!tool.repo || !tool.repo.includes('github.com')) {
    console.log(`⏭️  Skipping ${tool.name}: no GitHub repo`);
    return;
  }

  const match = tool.repo.match(/github\.com\/([^\/]+)\/([^\/]+)/);
  if (!match) {
    console.log(`⏭️  Skipping ${tool.name}: invalid GitHub URL`);
    return;
  }

  const [, owner, repo] = match;
  const cleanRepo = repo.replace(/\.git$/, '');

  try {
    const { data: repoData } = await octokit.repos.get({
      owner,
      repo: cleanRepo
    });

    let latestRelease: string | null = null;
    try {
      const { data: releaseData } = await octokit.repos.getLatestRelease({
        owner,
        repo: cleanRepo
      });
      latestRelease = releaseData.tag_name;
    } catch (e) {
      // No releases available
    }

    const { data: commits } = await octokit.repos.listCommits({
      owner,
      repo: cleanRepo,
      per_page: 1
    });

    const lastCommitDate = commits[0]?.commit.committer?.date
      ? new Date(commits[0].commit.committer.date).toISOString().split('T')[0]
      : undefined;

    tool.metadata = {
      github_stars: repoData.stargazers_count,
      last_commit_date: lastCommitDate,
      latest_release: latestRelease || undefined
    };

    writeFileSync(toolPath, JSON.stringify(tool, null, 2) + '\n');
    console.log(`✅ Updated ${tool.name}: ${repoData.stargazers_count} stars, last commit ${lastCommitDate}`);

  } catch (error: any) {
    console.error(`❌ Error updating ${tool.name}: ${error.message}`);
  }
}

async function main() {
  const toolsDir = join(process.cwd(), 'src/data/tools');
  const files = readdirSync(toolsDir).filter((f) => f.endsWith('.json'));

  console.log(`\n🔄 Updating metadata for ${files.length} tools...\n`);

  for (const file of files) {
    const filePath = join(toolsDir, file);
    await updateToolMetadata(filePath);
    await new Promise(resolve => setTimeout(resolve, 1000));
  }

  console.log('\n✅ Metadata update complete!\n');
}

main().catch((error) => {
  console.error('Fatal error:', error);
  process.exit(1);
});
