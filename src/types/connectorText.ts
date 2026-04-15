export type ConnectorTextBlock = {
  type: "connector_text";
  text?: string;
  metadata?: Record<string, unknown>;
};

export type ConnectorTextDelta = {
  type: "connector_text_delta";
  text?: string;
};

export function isConnectorTextBlock(value: unknown): value is ConnectorTextBlock {
  return Boolean(
    value &&
      typeof value === "object" &&
      "type" in value &&
      (value as { type?: string }).type === "connector_text"
  );
}

export function isConnectorTextDelta(value: unknown): value is ConnectorTextDelta {
  return Boolean(
    value &&
      typeof value === "object" &&
      "type" in value &&
      (value as { type?: string }).type === "connector_text_delta"
  );
}
