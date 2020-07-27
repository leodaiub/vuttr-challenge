/* --- STATE --- */
export interface ToolsState {
  tools: Array<any>;
  loading: boolean;
  error: boolean;
}

export type ContainerState = ToolsState;
