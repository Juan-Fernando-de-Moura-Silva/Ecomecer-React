class BankingSystem {
  constructor() {
    this.accounts = new Map();
  }

  createAccount(timestamp, accountId) {
    if (this.accounts.has(accountId)) {
      return "false";
    }

    const account = {
      id: accountId,
      balance: 0,
      transactions: [],
    };

    this.accounts.set(accountId, account);
    return "true";
  }

  deposit(timestamp, accountId, amount) {
    if (!this.accounts.has(accountId)) {
      return "";
    }

    const account = this.accounts.get(accountId);
    account.balance += amount;
    account.transactions.push(`DEPOSIT ${timestamp} ${amount}`);

    return account.balance.toString();
  }

  transfer(timestamp, sourceAccountId, targetAccountId, amount) {
    if (
      !this.accounts.has(sourceAccountId) ||
      !this.accounts.has(targetAccountId) ||
      sourceAccountId === targetAccountId
    ) {
      return "";
    }

    const sourceAccount = this.accounts.get(sourceAccountId);
    const targetAccount = this.accounts.get(targetAccountId);

    if (sourceAccount.balance < amount) {
      return "";
    }

    sourceAccount.balance -= amount;
    targetAccount.balance += amount;

    sourceAccount.transactions.push(`TRANSFER ${timestamp} TO ${targetAccountId} ${amount}`);
    targetAccount.transactions.push(`TRANSFER ${timestamp} FROM ${sourceAccountId} ${amount}`);

    return sourceAccount.balance.toString();
  }
}

const queries = [
  ["CREATE_ACCOUNT", "1", "account1"],
  ["CREATE_ACCOUNT", "2", "account1"],
  ["CREATE_ACCOUNT", "3", "account2"],
  ["DEPOSIT", "4", "non-existing", "2700"],
  ["DEPOSIT", "5", "account1", "2700"],
  ["TRANSFER", "6", "account1", "account2", "2701"],
  ["TRANSFER", "7", "account1", "account2", "200"]
];

const bankingSystem = new BankingSystem();
const results = [];

for (const query of queries) {
  const [operation, timestamp, ...params] = query;

  switch (operation) {
    case "CREATE_ACCOUNT":
      results.push(bankingSystem.createAccount(timestamp, ...params));
      break;
    case "DEPOSIT":
      results.push(bankingSystem.deposit(timestamp, ...params));
      break;
    case "TRANSFER":
      results.push(bankingSystem.transfer(timestamp, ...params));
      break;
  }
}

console.log(results);