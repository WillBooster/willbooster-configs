interface DebugResult {
  readonly message: string;
}

export async function loadDebugResult(): Promise<DebugResult> {
  return {
    message: 'debug oxlint',
  };
}

export async function logDebugResult(): Promise<void> {
  const result = await loadDebugResult();

  console.log(result.message);
}
