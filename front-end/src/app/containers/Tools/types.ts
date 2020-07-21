/* --- STATE --- */
export interface ToolsState {
  tools: Array<any>;
  loading: boolean;
  error: string;
}

export type ContainerState = ToolsState;
