import { Block, LogEntry, Operator, Transaction } from "./types";

export const MOCK_OPERATORS: Operator[] = [
  {
    id: "0x71...4A2D",
    name: "OP_BRAVO_9",
    enterprise: "AERO_LOGIC CORP",
    permission: "LEVEL_04_ROOT",
    lastActivity: "2023-10-24 14:22:01",
    status: 'active'
  },
  {
    id: "0x24...99B1",
    name: "OP_DELTA_X",
    enterprise: "GLOBAL_RELAY_INC",
    permission: "LEVEL_02_READ",
    lastActivity: "2023-10-24 14:18:55",
    status: 'active'
  },
  {
    id: "0xCC...E30F",
    name: "OP_ZULU_4",
    enterprise: "KINETIC_SUBSIDIARY",
    permission: "SYS_ARCHITECT",
    lastActivity: "2023-10-24 13:55:12",
    status: 'restricted'
  }
];

export const MOCK_BLOCKS: Block[] = [
  {
    number: "#8492103",
    validator: "0x921a...f2e1",
    transactions: 34,
    time: "12s atrás"
  },
  {
    number: "#8492102",
    validator: "0xb442...a910",
    transactions: 12,
    time: "24s atrás"
  },
  {
    number: "#8492101",
    validator: "0x112c...d5b4",
    transactions: 56,
    time: "36s atrás"
  }
];

export const MOCK_TRANSACTIONS: Transaction[] = [
  {
    hash: "0x84d2...92f1",
    origin: "REF: NODE_ALPHA",
    destination: "LOGIST_004",
    value: "1.402 BTC",
    status: 'confirmed'
  },
  {
    hash: "0x11c4...a0e3",
    origin: "REF: STORAGE_09",
    destination: "PORT_H3",
    value: "0.880 BTC",
    status: 'confirmed'
  },
  {
    hash: "0x992b...c914",
    origin: "REF: NODE_BETA",
    destination: "REFINERY_X",
    value: "12.00 BTC",
    status: 'confirmed'
  }
];

export const MOCK_LOGS: LogEntry[] = [
  {
    id: "TRANS_092",
    type: "TRANS_092",
    time: "14:22:10",
    message: "Pressure surge detected in SE-Sector Pipeline-4. Automating bypass protocols.",
    severity: 'error'
  },
  {
    id: "NOD_AUTH_X",
    type: "NOD_AUTH_X",
    time: "14:18:45",
    message: "Contract DEPLOY_772 verified by Validator Node 0x9A...F12.",
    severity: 'success'
  },
  {
    id: "SYS_UPDT",
    type: "SYS_UPDT",
    time: "14:05:01",
    message: "Weekly maintenance window scheduled for T-minus 24h.",
    severity: 'info'
  },
  {
    id: "ALERT_H3",
    type: "ALERT_H3",
    time: "13:59:22",
    message: "Temperature variance exceeding threshold in Tank A-09. Cooling initiated.",
    severity: 'error'
  }
];
