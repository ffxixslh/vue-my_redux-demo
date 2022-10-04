let nextId = 1;

export const tableData = Array.from({ length: 5 }).reduce((acc, data) => {
  let item = {
    name: `Tom${nextId}`,
    birthday: "2016-05-02",
    address: "No. 189, Grove St, Los Angeles",
    id: nextId++,
  };

  return [...acc, item];
}, []);
