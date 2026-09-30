import { defineHost, CROSS_MODEL_RESOLVERS, GBRAIN_RESOLVERS } from './define-host';

const primeAgent = defineHost({
  name: 'prime-agent',
  displayName: 'Prime Agent',

  // Prime Agent follows the same nesting pattern as Pi: skills live in
  // ~/.prime/agent/skills, not ~/.prime/skills. The derived trio would point
  // at the wrong directory, so the rewrites are spelled out explicitly.
  globalRoot: '.prime/agent/skills/gstack',
  localSkillRoot: '.prime/agent/skills/gstack',
  pathRewrites: [
    { from: '~/.claude/skills/gstack', to: '~/.prime/agent/skills/gstack' },
    { from: '.claude/skills/gstack', to: '.prime/agent/skills/gstack' },
    { from: '.claude/skills', to: '.prime/agent/skills' },
    { from: 'CLAUDE.md', to: 'AGENTS.md' },
  ],

  // Prime Agent (from Prime Intellect) shares tool naming conventions with Pi.
  // Core tools: bash, read, write, edit (lowercase). Built-in Python REPL.
  // Subagent support via rlm.spawn(), not a separate tool.
  toolRewrites: {
    'use the Bash tool': 'use bash',
    'use the Write tool': 'use write',
    'use the Read tool': 'use read',
    'use the Edit tool': 'use edit',
    'use the Agent tool': 'spawn a subagent with rlm.spawn()',
    'use the Grep tool': 'search for',
    'use the Glob tool': 'find files matching',
    'the Bash tool': 'bash',
    'the Read tool': 'read',
    'the Write tool': 'write',
    'the Edit tool': 'edit',
  },

  suppressedResolvers: [...CROSS_MODEL_RESOLVERS, ...GBRAIN_RESOLVERS],

  coAuthorTrailer: 'Co-Authored-By: Prime Agent <noreply@primeintellect.ai>',
});

export default primeAgent;

