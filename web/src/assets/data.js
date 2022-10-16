import getData from "@/utils/request";

let data = await getData({ url: "/api/users" });

export const length = data.length;

export const tableData = data;
