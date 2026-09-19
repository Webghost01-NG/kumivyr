import subprocess
import json
import re

def run_cmd(cmd):
    result = subprocess.run(cmd, capture_output=True, text=True)
    return result.returncode, result.stdout, result.stderr

# 1. Create labels on Webghost01-NG/kumivyr
custom_labels = [
    {"name": "role: W3BGHOST-lead", "description": "W3BGHOST (Team Lead) tasks", "color": "0F382C"},
    {"name": "status: blocked", "description": "Issue is currently blocked by dependencies", "color": "B60205"},
    {"name": "status: ready", "description": "Issue is unblocked and ready for execution", "color": "0E8A16"},
    {"name": "status: in-progress", "description": "Issue is actively being worked on", "color": "FBCA04"},
    {"name": "sprint: 1", "description": "Sprint 1: Core Shell & Prompt Compiler", "color": "5319E7"},
    {"name": "sprint: 2", "description": "Sprint 2: Static Linter & Visual Debugger", "color": "5319E7"},
    {"name": "sprint: 3", "description": "Sprint 3: Shadow Sandbox & Evals CI", "color": "5319E7"},
    {"name": "sprint: 4", "description": "Sprint 4: SDK Exporter & Hackathon Polish", "color": "5319E7"},
]

for lbl in custom_labels:
    code, out, err = run_cmd([
        "gh", "label", "create", lbl["name"],
        "--repo", "Webghost01-NG/kumivyr",
        "--description", lbl["description"],
        "--color", lbl["color"],
        "--force"
    ])
    print(f"Label {lbl['name']}: {out.strip() or 'OK'}")

# 2. Parse docs/ISSUES.md to get issue data
with open("docs/ISSUES.md", "r") as f:
    content = f.read()

issue_blocks = re.findall(
    r"### Issue #(\d+):\s*(.*?)\n- \*\*Milestone:\*\*\s*(.*?)\n- \*\*Labels:\*\*\s*(.*?)\n- \*\*Blockers:\*\*\s*(.*?)\n- \*\*Acceptance Criteria:\*\*\n(.*?)(?=\n### Issue #|\Z)",
    content,
    re.DOTALL
)

print(f"Parsed {len(issue_blocks)} issues for update")

# Map Milestone to Sprint
def get_sprint(m_str):
    if "M1" in m_str or "M2" in m_str:
        return "sprint: 1"
    elif "M3" in m_str or "M4" in m_str:
        return "sprint: 2"
    elif "M5" in m_str or "M6" in m_str:
        return "sprint: 3"
    else:
        return "sprint: 4"

for issue_num_str, title, milestone_str, labels_str, blockers_str, criteria_str in issue_blocks:
    num = int(issue_num_str)
    has_blockers = "Blocked by" in blockers_str and "None" not in blockers_str
    status_label = "status: blocked" if has_blockers else "status: ready"
    sprint_label = get_sprint(milestone_str)
    
    # Format Title
    new_title = f"[W3BGHOST] {title.strip()}"
    
    # Format Body matching mssn-lasu-portal
    blocker_status_text = "Blocked" if has_blockers else "Ready"
    
    # Format criteria
    criteria_bullets = "\n".join([f"• {line.replace('- [ ]', '').strip()}" for line in criteria_str.strip().split("\n") if line.strip()])
    scope_checklist = criteria_str.strip()

    body = f"""### Assigned Developer: Developer X (Team Lead)
Assignee: @Webghost01-NG
Blockers Status: {blocker_status_text}
{blockers_str.strip()}

---

### Scope & Technical Objectives
{scope_checklist}

### Acceptance Criteria
{criteria_bullets}
"""
    
    # Update title and body
    cmd_edit = [
        "gh", "issue", "edit", str(num),
        "--repo", "Webghost01-NG/kumivyr",
        "--title", new_title,
        "--body", body,
        "--add-label", f"role: W3BGHOST-lead,{status_label},{sprint_label}",
        "--add-assignee", "Webghost01-NG"
    ]
    code, out, err = run_cmd(cmd_edit)
    if code == 0:
        print(f"Updated Issue #{num}: {new_title} ({status_label}, {sprint_label})")
    else:
        print(f"Error updating #{num}: {err.strip()}")

print("All issues formatted successfully!")
