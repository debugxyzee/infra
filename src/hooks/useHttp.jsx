import { createContext, useContext, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSnackbar } from "notistack";
import axios from "axios";
import { X } from "lucide-react";

const NotificationContext = createContext();
export const useNotification = () => useContext(NotificationContext);

export const useHttp = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { showNotification } = useNotification();
  const navigate = useNavigate();
  const location = useLocation();

//   const baseURL = "https://dev2025naacbackend.iemamerica.com";
  // const baseURL = "http://192.168.1.167:8000";
  const baseURL = "http://192.168.90.24:8000";
  // const baseURL = "http://192.168.90.101:8000";
  // const baseURL = "http://192.168.90.88:8000";

  const handleResponse = async (response) => {
    let message =
      response.data?.message ||
      (response.data?.success === true
        ? "Operation successful"
        : `Status ${response.status}: ${response.statusText}`);

    if ([401, 403].includes(response.status)) {
      showNotification(message, "error");
      localStorage.clear();
      sessionStorage.clear();

      const path = location.pathname;
      if (path.includes("superadmin")) {
        navigate("/login/superadmin");
      } else if (path.includes("admin")) {
        navigate("/login/admin");
      } else {
        navigate("/login/user");
      }

      return response;
    }

    let variant = "info";

    if (response.data?.success === true) {
      variant = "success";
    } else if (response.data?.success === false) {
      variant = "error";
    } else if (response.status >= 400) {
      variant = "error";
    } else if (response.status >= 200 && response.status < 300) {
      variant = "success";
    }

    showNotification(message, variant);

    return response.data;
  };

  const getReq = async (url, token = "") => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${baseURL}/${url}`, {
        headers: { Authorization: `Bearer ${token}` },
        validateStatus: () => true,
      });
      return await handleResponse(response);
    } catch (err) {
      showNotification(
        err.response?.data?.message ||
          err.message ||
          "An unexpected error occurred.",
        "error"
      );
      return null;
    } finally {
      setLoading(false);
    }
  };

  const postReq = async (url, token = "", data, isFormData = false) => {
    setLoading(true);
    setError(null);
    try {
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      if (!isFormData) {
        headers["Content-Type"] = "application/json";
      }

      const response = await axios.post(`${baseURL}/${url}`, data, {
        headers,
        validateStatus: () => true,
      });

      return await handleResponse(response);
    } catch (err) {
      showNotification(
        err.response?.data?.message ||
          err.message ||
          "An unexpected error occurred.",
        "error"
      );
      return null;
    } finally {
      setLoading(false);
    }
  };

  const putReq = async (url, token = "", data, isFormData = false) => {
    setLoading(true);
    setError(null);
    try {
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      if (!isFormData) {
        headers["Content-Type"] = "application/json";
      }

      const response = await axios.put(`${baseURL}/${url}`, data, {
        headers,
        validateStatus: () => true,
      });

      return await handleResponse(response);
    } catch (err) {
      showNotification(
        err.response?.data?.message ||
          err.message ||
          "An unexpected error occurred.",
        "error"
      );
      return null;
    } finally {
      setLoading(false);
    }
  };

  const patchReq = async (url, token = "", data, isFormData = false) => {
    setLoading(true);
    setError(null);
    try {
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      if (!isFormData) {
        headers["Content-Type"] = "application/json";
      }

      const response = await axios.patch(`${baseURL}/${url}`, data, {
        headers,
        validateStatus: () => true,
      });

      return await handleResponse(response);
    } catch (err) {
      showNotification(
        err.response?.data?.message ||
          err.message ||
          "An unexpected error occurred.",
        "error"
      );
      return null;
    } finally {
      setLoading(false);
    }
  };

  const deleteReq = async (url, token = "", data = {}) => {
    setLoading(true);
    setError(null);
    try {
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };

      const response = await axios.delete(`${baseURL}/${url}`, {
        headers,
        data,
        validateStatus: () => true,
      });

      return await handleResponse(response);
    } catch (err) {
      showNotification(
        err.response?.data?.message ||
          err.message ||
          "An unexpected error occurred.",
        "error"
      );
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    getReq,
    postReq,
    putReq,
    patchReq,
    deleteReq,
    loading,
    error,
    setError,
  };
};

export const NotificationProvider = ({ children }) => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const showNotification = (message, variant = "default") => {
    if (!message) return;

    // enqueueSnackbar(message, {
    //   variant,
    //   autoHideDuration: 5000,
    //   anchorOrigin: {
    //     vertical: "top",
    //     horizontal: "right",
    //   },
    //   action: (key) => (
    //     <button
    //       onClick={() => closeSnackbar(key)}
    //       style={{
    //         background: "transparent",
    //         border: "none",
    //         color: "inherit",
    //         cursor: "pointer",
    //         display: "flex",
    //         alignItems: "center",
    //         padding: "0.25rem",
    //       }}
    //       aria-label="close"
    //     >
    //       <X size={18} />
    //     </button>
    //   ),
    // });
  };

  return (
    <NotificationContext.Provider
      value={{
        showNotification,
        showSuccess: (msg) => showNotification(msg, "success"),
        showError: (msg) => showNotification(msg, "error"),
        showInfo: (msg) => showNotification(msg, "info"),
        showWarning: (msg) => showNotification(msg, "warning"),
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};
