export interface Operator {
  id: string;
  name: string;
  enterprise: string;
  permission: string;
  lastActivity: string;
  status: 'active' | 'pending' | 'restricted';
}

export interface Block {
  number: string;
  validator: string;
  transactions: number;
  time: string;
}

export interface Transaction {
  hash: string;
  origin: string;
  destination: string;
  value: string;
  status: 'confirmed' | 'pending' | 'failed';
}

export interface LogEntry {
  id: string;
  type: string;
  time: string;
  message: string;
  severity: 'info' | 'warning' | 'error' | 'success';
}
