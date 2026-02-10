#!/bin/bash

# Initialize Supabase database with schema, policies, and seed data
# Usage: ./data/init-db.sh

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"

# Load .env file
if [ -f "$PROJECT_ROOT/.env" ]; then
  export $(grep -v '^#' "$PROJECT_ROOT/.env" | xargs)
else
  echo "Error: .env file not found"
  echo "Copy .env.example to .env and fill in your Supabase credentials"
  exit 1
fi

# Check required variables
if [ -z "$SUPABASE_PROJECT_ID" ] || [ -z "$SUPABASE_DB_PASSWORD" ]; then
  echo "Error: Missing required environment variables"
  echo "Ensure .env contains:"
  echo "  SUPABASE_PROJECT_ID=your_project_id"
  echo "  SUPABASE_DB_PASSWORD=your_database_password"
  echo "  SUPABASE_DB_REGION=aws-0-eu-west-1 (check your Supabase dashboard)"
  exit 1
fi

# Use region from env or default
DB_REGION="${SUPABASE_DB_REGION:-aws-0-eu-west-1}"

# Build connection string (using session pooler)
DB_URL="postgresql://postgres.${SUPABASE_PROJECT_ID}:${SUPABASE_DB_PASSWORD}@${DB_REGION}.pooler.supabase.com:5432/postgres"

echo "Initializing database for project: $SUPABASE_PROJECT_ID"
echo ""

# Run schema
echo "1/3 Running schema.sql..."
psql "$DB_URL" -f "$SCRIPT_DIR/schema.sql" -q 2>&1 | grep -v "^NOTICE" || true

# Run policies
echo "2/3 Running policies.sql..."
psql "$DB_URL" -f "$SCRIPT_DIR/policies.sql" -q 2>&1 | grep -v "^NOTICE" || true

# Run seed
echo "3/3 Running seed.sql..."
psql "$DB_URL" -f "$SCRIPT_DIR/seed.sql" -q 2>&1 | grep -v "^NOTICE" || true

echo ""
echo "Database initialized successfully!"
echo ""
echo "Next steps:"
echo "  1. Create 'assets' storage bucket (public) in Supabase dashboard"
echo "  2. Configure auth providers if needed"
echo "  3. Run: pnpm dev"
