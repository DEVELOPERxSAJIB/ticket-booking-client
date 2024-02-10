import { message } from "antd";

const MessageAlert = ({
  type = "error",
  content = "Invalide",
  duration = "3",
}) => {
  const showMessage = () => {
    switch (type) {
      case "success":
        message.success(content, duration);
        break;
      case "info":
        message.info(content, duration);
        break;
      case "warning":
        message.warning(content, duration);
        break;
      case "error":
        message.error(content, duration);
        break;
      default:
        break;
    }
  };

  showMessage();

  return null;
};

export default MessageAlert;
