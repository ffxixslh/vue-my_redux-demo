import getData from "@/utils/request";

let data = await getData("/api/list");
export const length = data.data.length;

export const tableData = data.data;
