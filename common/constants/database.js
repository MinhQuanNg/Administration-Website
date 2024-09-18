// constants.js
export const STATUS = {
  NOT_STARTED: 'Chưa bắt đầu',
  PENDING: 'Đang thực hiện',
  COMPLETED: 'Đã hoàn thành',
  LATE: 'Trễ tiến độ'
};

export const ROLE = {
  ADMIN: { name: 'admin', level: 1 }, // highest level
  TRAINED: { name: 'trained', level: 2 },
  UNTRAINED: { name: 'untrained', level: 3 },
};

export const DATA_ENTRY_DURATION = 10; // allot 10 minutes for data entry