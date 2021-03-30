import axios from "axios";

export const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL
});

const JSONCONFIG = {
  headers: {
    "Content-Type": "application/json",
  }
};

const MULTIPARTCONFIG = {
  headers: {
    "Content-Type": "multipart/form-data",
  }
};

export const setAuthToken = (token) => {
  if (token) {
    API.defaults.headers.common["Authorization"] = `Bearer ${token}`
  } else {
    delete API.defaults.headers.common["Authorization"]
  }
};


export const checkAuth = async function () {
  const response = await API.get("/check-auth")
  return response
};
export const userRegister = async function (body) {
  const response = await API.post("/register", body, JSONCONFIG)
  return response
};
export const userLogin = async function (body) {
  const response = await API.post("/login", body, JSONCONFIG)
  return response
};

// User endpoint
export const getPartnerUsers = async function () {
  const response = await API.get(`/users`)
  return response
};
export const getUserDetail = async function (id) {
  const response = await API.get(`/user/${id}`)
  return response
};
export const updateUser = async function (id, body) {
  if (typeof body === "object") {
    const response = await API.put(`/user/${id}`, body, MULTIPARTCONFIG)
    return response
  }
  const response = await API.put(`/user/${id}`, body, JSONCONFIG)
  return response
};
export const deleteUser = async function (id) {
  const response = await API.delete(`/user/${id}`)
  return response
};

// Product endpoint

export const getProducts = async function () {
  const response = await API.get(`/products`)
  return response
};
export const getPartnerProducts = async function (partnerId) {
  const response = await API.get(`/products/${partnerId}`)
  return response
};
export const getProductDetail = async function (id) {
  const response = await API.get(`/product/${id}`)
  return response
};
export const createProduct = async function (body) {
  const response = await API.post("/product", body)
  return response
};
export const updateProduct = async function (id, body) {
  if (typeof body === "object") {
    const response = await API.put(`/product/${id}`, body, MULTIPARTCONFIG)
    return response
  }
  const response = await API.put(`/product/${id}`, body, JSONCONFIG)
  return response
};
export const deleteProduct = async function (id) {
  const response = await API.delete(`/product/${id}`)
  return response
};

//Transactions endpoint
export const getPartnerTransactions = async function (partnerId) {
  const response = await API.get(`/transactions/${partnerId}`)
  return response
};
export const getCustomerTransactions = async function () {
  const response = await API.get("/my-transactions")
  return response
};
export const getTransactionDetail = async function (id) {
  const response = await API.get(`/transaction/${id}`)
  return response
};
export const createTransaction = async function (body) {
  const response = await API.post("/transaction", body, JSONCONFIG)
  return response
};
export const updateTransaction = async function (id, body) {
  const response = await API.put(`/transaction/${id}`, body, JSONCONFIG)
  return response
};
export const deleteTransaction = async function (id) {
  const response = await API.delete(`/transaction/${id}`)
  return response
}