import json
import subprocess
import os
import webbrowser
import sys

FIREBASE_DIR = os.path.expandvars(r"%LOCALAPPDATA%\Microsoft\WinGet\Packages\Google.FirebaseCLI_Microsoft.Winget.Source_8wekyb3d8bbwe")
os.environ["PATH"] = FIREBASE_DIR + ";" + os.environ.get("PATH", "")

def get_projects():
    try:
        res = subprocess.run(
            ["firebase", "projects:list", "--json"],
            capture_output=True,
            text=True,
            shell=True
        )
        # Find JSON in stdout
        output = res.stdout
        start_idx = output.find("{")
        if start_idx != -1:
            data = json.loads(output[start_idx:])
            return data.get("result", [])
    except Exception as e:
        print(f"Error checking Firebase projects: {e}")
    return None

def main():
    print("Checking Firebase projects in your account...")
    projects = get_projects()

    if projects is None:
        print("[!] Could not connect to Firebase. Make sure you ran login.bat first.")
        return 1

    if len(projects) == 0:
        print("\n" + "="*60)
        print(" [ACTION REQUIRED] No Firebase project found in your account!")
        print("="*60)
        print("Google requires you to accept the Terms of Service once and")
        print("create your project in the Firebase Console.")
        print("\nOpening https://console.firebase.google.com/ in your browser now...")
        webbrowser.open("https://console.firebase.google.com/")
        print("\nSteps on the web page (takes 30 seconds):")
        print("  1. Click 'Create a project' (or 'Add project')")
        print("  2. Accept Terms of Service (if asked)")
        print("  3. Name it: girieditszone")
        print("  4. Click Continue -> Create Project")
        print("="*60 + "\n")
        return 2

    # Find matching project or pick first
    selected_id = None
    for p in projects:
        pid = p.get("projectId", "").lower()
        dname = p.get("displayName", "").lower()
        if "giriedits" in pid or "giriedits" in dname:
            selected_id = p.get("projectId")
            break

    if not selected_id:
        selected_id = projects[0].get("projectId")

    print(f"\n[OK] Found Firebase Project: {selected_id}")

    # Update .firebaserc
    rc_path = ".firebaserc"
    rc_data = {"projects": {"default": selected_id}}
    with open(rc_path, "w") as f:
        json.dump(rc_data, f, indent=2)

    print(f"[OK] Updated .firebaserc with project ID: {selected_id}\n")
    return 0

if __name__ == "__main__":
    sys.exit(main())
