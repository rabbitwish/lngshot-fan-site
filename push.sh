#!/bin/bash
# Quick deploy script for lngshot-fan-site
# Usage: ./push.sh "your commit message"
#   or just: ./push.sh (will use a default message)

cd "$(dirname "$0")"

# Check if there are changes
if git diff --quiet && git diff --cached --quiet && [ -z "$(git ls-files --others --exclude-standard)" ]; then
  echo "✨ Nothing to deploy — no changes found."
  exit 0
fi

# Stage all changes
git add -A

# Use provided message or default
MSG="${1:-Update site}"

# Commit
git commit -m "$MSG

Co-Authored-By: Claude <noreply@anthropic.com>"

# Push to main
git push origin main

if [ $? -eq 0 ]; then
  echo ""
  echo "🚀 Pushed! Vercel will auto-deploy in a few seconds."
  echo "   Check: https://lngshot-fan-site.vercel.app"
else
  echo ""
  echo "❌ Push failed. Check your SSH keys or internet connection."
  exit 1
fi
