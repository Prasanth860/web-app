
import instance from "../Services";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export const notify = (status, msg) => {
    toast.configure();
    if (status == true) {
        toast.success(msg);
        return <ToastContainer />;
    } else {
        toast.error(msg);
        return <ToastContainer />;
    }
};

export const getfList = async (url) => {
    try {
        let res = await instance.get(url);
        if (res?.data?.status == true && res?.data?.data?.length != 0) {
            return res.data.data;
        } else {
            return [];
        }
    } catch (e) {
        console.log(e);
        return [];
    }
};

export const getList = async (url, data) => {
    try {
        let res = await instance.post(url, data);
        if (res?.data?.status == true && res?.data?.data?.length != 0) {
            return res.data.data;
        } else {
            return [];
        }
    } catch (e) {
        console.log(e);
        return [];
    }
};

export const getById = async (url) => {
    try {
        let res = await instance.get(url);
        if (res?.data?.status == true && res?.data?.data?.length != 0) {
            return res.data.data;
        } else {
            return {};
        }
    } catch (e) {
        console.log(e);
        return {};
    }
};

export const save = async (url, data) => {
    try {
        let res = await instance.post(url, data);
        notify(res?.data?.status,res?.data?.message)
        if (res?.data?.status == true && res?.data?.data?.length != 0) {
            return res;
        } else {
            return {};
        }
    } catch (e) {
        console.log(e);
        return {};
    }
}