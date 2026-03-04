# SESD_CLI_WORKSHOP 

A high-performance, object-oriented CLI toolkit built with Node.js and TypeScript.

## 🛠 Setup & Installation

### 1. Prerequisites
Ensure you have [Node.js](https://nodejs.org/) installed.

### 2. Install Dependencies
```bash
npm install
```

### 3. Build & Run
```bash
# Compile TypeScript
npm run build

# Run via ts-node
npm run dev -- <command>

# Or link globally
npm link
sesd-cli --help
```

## Available Commands

| Category | Command | Description |
|----------|---------|-------------|
| **API** | `github <user>` | Detailed GitHub profile fetching |
| **API** | `weather <city>` | Live weather data via wttr.in |
| **API** | `crypto <coin>` | Live market data from CoinGecko |
| **API** | `ipinfo` | Public IP and Geolocation data |
| **System** | `system` | Hardware and OS specifications |
| **Utility** | `todo <action>`| Local task manager (add, ls, done, clear) |
| **Utility** | `calc <op> <a> <b>` | Arithmetic calculator |
| **Utility** | `fileinfo <path>`| File/Folder metadata extraction |
| **Utility** | `passgen` | Secure random password generator |
| **Utility** | `unit <type> <v>`| Temperature and distance converter |

## Examples

**Fetch GitHub Info:**
```bash
sesd-cli github BOXER78
```

**Check Crypto Price:**
```bash
sesd-cli crypto ethereum
```

**Generate a Password (with symbols):**
```bash
sesd-cli passgen -l 16 -s
```

**Convert Miles to KM:**
```bash
sesd-cli unit mi-km 10
```

---
Built for the **SESD Workshop**.
