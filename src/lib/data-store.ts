import fs from 'fs';
import path from 'path';

/**
 * Sole-owner portfolio data store.
 * Local / self-hosted Node: read + write JSON under src/data.
 * Vercel / serverless: read committed files only — writes are rejected.
 */

export function canPersistData(): boolean {
  if (process.env.DISABLE_DATA_WRITES === 'true') return false;
  // Vercel serverless filesystem is not durable for src/data writes
  if (process.env.VERCEL === '1') return false;
  return true;
}

export function dataFilePath(...segments: string[]): string {
  return path.join(process.cwd(), 'src', 'data', ...segments);
}

export function readJsonFile<T>(...segments: string[]): T {
  const filePath = dataFilePath(...segments);
  const raw = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(raw) as T;
}

export function writeJsonFile(data: unknown, ...segments: string[]): void {
  if (!canPersistData()) {
    throw new DataPersistError(
      'Data writes are disabled in this environment. Edit locally, commit src/data/*.json, then redeploy.'
    );
  }

  const filePath = dataFilePath(...segments);
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

export function ensureJsonFile(
  defaultData: unknown,
  ...segments: string[]
): void {
  const filePath = dataFilePath(...segments);
  if (fs.existsSync(filePath)) return;

  if (!canPersistData()) {
    throw new DataPersistError(
      `Missing data file ${segments.join('/')} and cannot create it in this environment.`
    );
  }

  writeJsonFile(defaultData, ...segments);
}

export class DataPersistError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'DataPersistError';
  }
}

export function persistErrorResponse(error: unknown) {
  if (error instanceof DataPersistError) {
    return {
      body: { error: error.message, code: 'DATA_WRITES_DISABLED' as const },
      status: 503,
    };
  }
  return {
    body: { error: 'Internal server error' },
    status: 500,
  };
}
