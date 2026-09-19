import subprocess
import re

def run_cmd(cmd):
    result = subprocess.run(cmd, capture_output=True, text=True)
    return result.returncode, result.stdout, result.stderr

# Parse docs/ISSUES.md to extract all 52 issues
with open("docs/ISSUES.md", "r") as f:
    content = f.read()

# Pattern matching each issue block:
issue_blocks = re.findall(
    r"### Issue #(\d+):\s*(.*?)\n- \*\*Milestone:\*\*\s*(.*?)\n- \*\*Labels:\*\*\s*(.*?)\n- \*\*Blockers:\*\*\s*(.*?)\n- \*\*Acceptance Criteria:\*\*\n(.*?)(?=\n### Issue #|\Z)",
    content,
    re.DOTALL
)

print(f"Parsed {len(issue_blocks)} issues from docs/ISSUES.md")

for issue_num, title, milestone_str, labels_str, blockers_str, criteria_str in issue_blocks:
    milestone_title = milestone_str.strip()
    
    # Body formatting
    body = f"""### Objective & Context
{title} for Kumivyr ({milestone_title}).

### Blockers & Dependencies
{blockers_str.strip()}

### Acceptance Criteria
{criteria_str.strip()}

---
*Tracked under Kumivyr Roadmap: {milestone_title}*
"""
    cmd = [
        "gh", "issue", "create",
        "--repo", "Webghost01-NG/kumivyr",
        "--title", f"#{issue_num}: {title.strip()}",
        "--body", body,
        "--milestone", milestone_title
    ]
    
    code, out, err = run_cmd(cmd)
    if code == 0:
        print(f"Created Issue #{issue_num}: {out.strip()}")
    else:
        print(f"Failed Issue #{issue_num}: {err.strip()}")

print("Done syncing all issues!")
