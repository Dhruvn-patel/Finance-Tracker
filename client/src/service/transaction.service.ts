import {
  axioDataById,
  axioDeleteById,
  axiosAddTranasaction,
  axioupdateTransaction,
} from "../plugins/axios.plugin";

const AddTranasaction = (data: object) => {
  return axiosAddTranasaction("addTransaction", data);
};
const TranasactionByuserId = (id: number) => {
  return axioDataById("getData/" + id);
};

const TranasactionDataDelete = (id: number) => {
  return axioDeleteById("deleteTransaction/" + id);
};

const TranasactionDataUpdate = (data: object, id: number) => {
  return axioupdateTransaction("updateTransaction/" + id, data);
};

export {
  AddTranasaction,
  TranasactionByuserId,
  TranasactionDataDelete,
  TranasactionDataUpdate,
};
