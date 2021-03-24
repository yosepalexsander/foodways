import axios from "axios";

const instance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL
});

const CONFIG = {
  headers: {
    "Content-Type": "application/json",
  }
};

export const setAuthToken = (token) => {
  if (token) {
    instance.defaults.headers.common["Authorization"] = `Bearer ${token}`
  } else {
    delete instance.defaults.headers.common["Authorization"]
  }
};


export const checkAuth = async function () {
  const response = await instance.get("/check-auth")
  return response
};
export const userRegister = async function (body) {
  const response = await instance.post("/register", body, CONFIG)
  return response
};
export const userLogin = async function (body) {
  const response = await instance.post("/login", body, CONFIG)
  return response
};

// User endpoint
export const getUserDetail = async function (id) {
  const response = await instance.get(`/user/${id}`)
  return response
};
export const updateUser = async function (id, body) {
  const response = await instance.put(`/user/${id}`, body)
  return response
};
export const deleteUser = async function (id) {
  const response = await instance.delete(`/user/${id}`)
  return response
};

// Product endpoint
export const getPartnerProducts = async function (partnerId) {
  const response = await instance.get(`/products/${partnerId}`)
  return response
};
export const getProductDetail = async function (id) {
  const response = await instance.get(`/product/${id}`)
  return response
};
export const createProduct = async function (body) {
  const response = await instance.post("/product", body)
  return response
};
export const updateProduct = async function (id, body) {
  const response = await instance.put(`/product/${id}`, body)
  return response
};
export const deleteProduct = async function (id) {
  const response = await instance.delete(`/product/${id}`)
  return response
};

//Transactions endpoint
export const getPartnerTransactions = async function (partnerId) {
  const response = await instance.get(`/transactions/${partnerId}`)
  return response
};
export const getCustomerTransactions = async function () {
  const response = await instance.get("/my-transactions")
  return response
};
export const getTransactionDetail = async function (id) {
  const response = await instance.get(`/transaction/${id}`)
  return response
};
export const createTransaction = async function (body) {
  const response = await instance.post("/transaction", body, CONFIG)
  return response
};
export const updateTransaction = async function (id, body) {
  const response = await instance.put(`/transaction/${id}`, body, CONFIG)
  return response
};
export const deleteTransaction = async function (id) {
  const response = await instance.delete(`/transaction/${id}`)
  return response
}