export const BROWSER_TOOLS = [
  { name: "tabs_context_mcp" },
  { name: "tabs_create_mcp" },
  { name: "navigate" },
  { name: "read_page" },
  { name: "get_page_text" },
  { name: "find" },
  { name: "computer" },
  { name: "form_input" },
  { name: "javascript_tool" },
  { name: "read_console_messages" },
  { name: "read_network_requests" },
  { name: "gif_creator" },
  { name: "resize_window" },
  { name: "upload_image" },
  { name: "update_plan" },
  { name: "shortcuts_list" },
  { name: "shortcuts_execute" },
  { name: "switch_browser" }
];

export function createClaudeForChromeMcpServer() {
  return {
    async connect() {},
    async close() {}
  };
}
