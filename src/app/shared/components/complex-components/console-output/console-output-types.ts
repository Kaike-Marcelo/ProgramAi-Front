export interface ConsoleMessage {
    type: 'stdout' | 'stderr' | 'error' | 'info' | 'command';
    content: string;
    timestamp: Date;
}