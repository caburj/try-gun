- user
  - acccounts
    - partitions
      - transactions

- journal (ledger, record book)
  * Journals can be shared or private.
  * It has reference to the partitions that can record transactions to it.
  - partitions
    - transactions

- user
  - accounts
    - partitions (all)
      - transactions
  - journals
    - shared_with
    - partitions (only shared)
      - transactions
- categories
  - transactions

- users
- journals
- categories
- accounts
- partitions
  - transactions

# Coupling between mobx and gun objects

- Whenever a gun object is accessed, it should create a mobx object that is
  synced with the gun object.
  - Each path corresponds to cached gun object and mobx object?
