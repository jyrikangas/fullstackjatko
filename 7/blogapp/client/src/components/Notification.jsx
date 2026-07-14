import { Alert } from "@mui/material";
import { useNotificationStore } from "../notificationStore";
const Notification = () => {
  const { message, isError } = useNotificationStore();

  if (!message) {
    return null;
  }

  return (
    <Alert severity={isError ? "error" : "success"} sx={{ my: 2 }}>
      {message}
    </Alert>
  );
};

export default Notification;
